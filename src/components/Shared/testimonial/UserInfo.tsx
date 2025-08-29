import Image from 'next/image';

interface UserInfoProps {
  imageSrc: string;
  name: string;
  date: string;
  active?: boolean;
  className?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  imageSrc,
  name,
  date,
  active = false,
  className,
}) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 transition-shadow duration-300 ${
        active ? 'shadow-xl rounded-2xl' : ''
      } ${className}`}
    >
      <div className="w-12 h-12 relative rounded-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-gray-500 text-sm bg-[#e5e7e8] rounded-4xl px-3 pt-1 ">
        {date}
      </p>
    </div>
  );
};

export default UserInfo;
