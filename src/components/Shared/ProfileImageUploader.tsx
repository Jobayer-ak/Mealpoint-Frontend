'use client';

import { Button } from '@/components/ui/button';
import type { OurFileRouter } from '@/lib/uploadthing/core';
import { setUserProfile } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook/hook';
import { UploadButton } from '@uploadthing/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ProfileImageUploaderProps {
  userId: string;
}

export default function ProfileImageUploader({
  userId,
}: ProfileImageUploaderProps) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user?.profile);
  const [preview, setPreview] = useState<string | null>(
    profile?.profileImage || null
  );
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPreview(profile?.profileImage || null);
  }, [profile?.profileImage]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  const handleRemove = async () => {
    if (!profile || isUploading) return;

    try {
      setIsUploading(true);
      const token = session?.user?.accessToken || '';

      const res = await fetch(`${backendUrl}/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // no Bearer
        },
        body: JSON.stringify({ profileImage: '' }),
      });

      if (!res.ok) throw new Error('Failed to remove image');

      setPreview(null);
      dispatch(setUserProfile({ ...profile, profileImage: '' }));
      toast.success('Profile image removed successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove profile image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Image Preview */}
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300">
        {preview ? (
          <Image
            src={preview}
            alt={profile?.name || 'User profile'}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white font-bold text-2xl">
            U
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">
            Uploading...
          </div>
        )}
      </div>

      {/* Upload Button */}
      <UploadButton<OurFileRouter>
        endpoint="profileImage"
        metadata={{ userId }}
        multiple={false}
        headers={{
          authorization: session?.user?.accessToken || '',
        }}
        onUploadStart={() => {
          setIsUploading(true);
          toast.loading('Uploading image...');
        }}
        onClientUploadComplete={async (res) => {
          toast.dismiss();
          const newFile = (res?.[0] as any)?.fileUrl; // safe type cast
          if (!newFile) {
            toast.error('No file uploaded');
            setIsUploading(false);
            return;
          }

          try {
            const token = session?.user?.accessToken || '';

            const backendRes = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/profile`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
                body: JSON.stringify({ profileImage: newFile }),
              }
            );

            if (!backendRes.ok) throw new Error('Failed to update profile');

            setPreview(newFile);
            if (profile)
              dispatch(setUserProfile({ ...profile, profileImage: newFile }));
            toast.success('Profile image updated successfully');
          } catch (err) {
            console.error(err);
            toast.error('Failed to update profile image');
          } finally {
            setIsUploading(false);
          }
        }}
        onUploadError={(err) => {
          toast.dismiss();
          console.error(err);
          toast.error('Upload failed. Please try again.');
          setIsUploading(false);
        }}
        disabled={isUploading}
      >
        <Button className="w-full font-medium rounded-lg">
          {isUploading
            ? 'Uploading...'
            : preview
            ? 'Change Photo'
            : 'Upload Photo'}
        </Button>
      </UploadButton>

      {/* Remove Button */}
      {preview && (
        <Button
          className="w-full font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white"
          onClick={handleRemove}
          disabled={isUploading}
        >
          Remove Photo
        </Button>
      )}
    </div>
  );
}
