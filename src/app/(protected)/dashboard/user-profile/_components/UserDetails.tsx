'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Dashboard_Edit_button from '../../../../../components/Shared/Dashboard_Edit_button';
import ProfileImageUploader from '../../../../../components/Shared/ProfileImageUploader';
import { useAppSelector } from '../../../../../redux/hook/hook';

const UserDetails = () => {
  const { profile } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  // Radix Dialog scroll fix
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        document.body.style.marginRight = '0px';
      }, 5);
      return () => clearTimeout(timer);
    } else {
      document.body.style.marginRight = '0px';
    }
  }, [open]);

  const fallbackAvatar = (
    <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-white text-3xl font-semibold">
      {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
    </div>
  );

  const validImage =
    profile?.profileImage &&
    profile.profileImage.trim() !== '' &&
    (profile.profileImage.startsWith('http') ||
      profile.profileImage.startsWith('/'));

  return (
    <>
      <div className="w-full dashboard-border dashboard-surface rounded-2xl px-6 py-6">
        <h2 className="text-2xl d-text-color font-semibold tracking-wider mb-4">
          Profile
        </h2>

        {/* User Info Section */}
        <div className="dashboard-border rounded-2xl px-7 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end">
            {/* Avatar & Info */}
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="relative group w-20 h-20 rounded-full overflow-hidden cursor-pointer">
                {validImage ? (
                  <Image
                    src={profile!.profileImage!}
                    alt={profile?.name || 'User avatar'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                ) : (
                  fallbackAvatar
                )}

                {/* Hover Edit Icon */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-full"
                    onClick={() => setOpen(true)}
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Name & Role */}
              <div className="space-y-2 d-text-color text-center lg:text-left">
                <h3 className="text-xl font-bold tracking-wider">
                  {profile?.name || 'Unknown User'}
                </h3>
                <div className="flex flex-col lg:flex-row items-center text-sm text-[#687185] gap-2 font-medium capitalize">
                  <p>{profile?.role || 'No role assigned'}</p>
                  <span className="hidden lg:block">|</span>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Dashboard_Edit_button />
          </div>
        </div>

        {/* Personal Information */}
        <div className="dashboard-border d-text-color rounded-2xl px-7 py-4 my-7 tracking-wider">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center">
            <h3 className="text-md font-semibold">Personal Information</h3>
            <Dashboard_Edit_button />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2">
            <div>
              <p className="text-sm text-[#687185]">Name</p>
              <p>{profile?.name}</p>
            </div>
            <div>
              <p className="text-sm text-[#687185]">Email</p>
              <p>{profile?.email}</p>
            </div>
            <div>
              <p className="text-sm text-[#687185]">Phone</p>
              <p>{profile?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-[#687185]">Address</p>
              <p>{profile?.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Image Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-xl dark:bg-[#0f0f0f] dark:text-gray-100 text-gray-900 transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              Update Profile Picture
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 mt-4">
            {profile ? (
              <ProfileImageUploader userId={profile.id} />
            ) : (
              <div className="text-gray-500">Loading...</div>
            )}

            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                className="font-medium"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserDetails;
