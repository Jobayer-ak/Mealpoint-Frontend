'use client';

import Image from 'next/image';
import React from 'react';

interface UserInfoProps {
  imageSrc: string;
  name: string;
  date: string;
  className?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  imageSrc,
  name,
  date,
  className,
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Circular Image */}
      <div className="w-12 h-12 relative rounded-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Name */}
      <h4 className="font-semibold">{name}</h4>

      {/* Date */}
      <p className="text-gray-500 text-sm bg-[#e5e7e8] rounded-4xl px-3 pt-1 ms-9">
        {date}
      </p>
    </div>
  );
};

export default UserInfo;
