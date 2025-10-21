'use client';

import Image from 'next/image';
import Dashboard_Edit_button from '../../../../../components/Shared/Dashboard_Edit_button';
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
    <div className="w-full dashboard-border bg-white rounded-2xl px-6 py-6">
      <h2 className=" text-2xl font-semibold tracking-wider mb-4">Profile</h2>

      {/* user info */}
      <div className="dashboard-border  rounded-2xl px-7 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end">
          <div className="flex flex-col justify-center lg:flex-row items-center gap-6">
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

            {/* User name and role*/}
            <div className="space-y-4 d-text-color ">
              <h3 className="text-xl text-center lg:text-start font-bold tracking-wider">
                {profile?.name || 'Unknown User'}
              </h3>

              <div className="flex flex-col justify-center item-start gap-4 lg:flex-row  lg:justify-between tracking-widest items-center lg:gap-4 text-sm text-[#9598a2] font-medium capitalize">
                <h4 className="">{profile?.role || 'No role assigned'}</h4>
                <span className="font-extralight hidden lg:block"> | </span>
                <h4 className="">Dhaka, Bangladesh</h4>
              </div>
            </div>
          </div>

          {/* edit button */}
          <Dashboard_Edit_button />
        </div>
      </div>

      {/* Personal information */}
      <div className="dashboard-border d-text-color rounded-2xl bg-white px-7 py-6 my-7 tracking-wider">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center ">
          <h2 className="text-md font-semibold  mb-4">Personal Information</h2>

          <Dashboard_Edit_button />
        </div>

        {/* user info */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <p>Name</p>
            <p>{profile?.name}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{profile?.email}</p>
          </div>
          <div>
            <p>Phone</p>
            <p>{profile?.phone}</p>
          </div>
          <div>
            <p>Address</p>
            <p>{profile?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
