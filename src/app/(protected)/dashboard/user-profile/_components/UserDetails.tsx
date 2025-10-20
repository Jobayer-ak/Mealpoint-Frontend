'use client';

import Image from 'next/image';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useAppSelector } from '../../../../../redux/hook/hook';

const UserDetails = () => {
  const { profile } = useAppSelector((state) => state.user);

  // Fallback avatar (first letter of name)
  const fallbackAvatar = (
    <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-white text-3xl font-semibold">
      {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
    </div>
  );

  // Determine if profileImage is valid
  const validImage =
    profile?.profileImage &&
    profile.profileImage.trim() !== '' &&
    (profile.profileImage.startsWith('http') ||
      profile.profileImage.startsWith('/'));

  return (
    <div className="dashboard-border rounded-2xl px-6 py-6 dashboard-surface">
      <h2 className=" text-2xl font-semibold tracking-wider mb-4">Profile</h2>

      {/* user info */}
      <div className="dashboard-border rounded-2xl px-7 py-6">
        <div className="flex items-center gap-6">
          {/* image */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            {validImage ? (
              <Image
                src={profile!.profileImage}
                alt={profile?.name || 'User avatar'}
                fill
                className="object-cover"
                priority
              />
            ) : (
              fallbackAvatar
            )}
          </div>

          {/* Image with role*/}
          <div className="space-y-4 d-text-color ">
            <h3 className="text-xl font-bold tracking-wider">
              {profile?.name || 'Unknown User'}
            </h3>

            <div className="flex justify-between tracking-widest items-center gap-4 text-sm text-[#9598a2] font-medium capitalize">
              <h4 className="">{profile?.role || 'No role assigned'}</h4>
              <span className="font-extralight"> | </span>
              <h4 className="">Dhaka, Bangladesh</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Personal information */}
      <div className="dashboard-border d-text-color rounded-2xl dashboard-surface px-7 py-6 my-7 tracking-wider">
        <div className="flex justify-between items-center ">
          <h2 className="text-md font-semibold  mb-4">Personal Information</h2>

          <h2 className="text-sm text-[#9598a2]  font-semibold mb-4 flex justify-between items-center gap-1 dashboard-border rounded-full px-4 py-3 d-edit-btn cursor-pointer">
            <MdOutlineModeEdit size={25} className="py-1" />
            Edit
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
