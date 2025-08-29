'use client';

import { RiTwitterXLine } from 'react-icons/ri';
import { RxInstagramLogo } from 'react-icons/rx';
import { SlSocialLinkedin } from 'react-icons/sl';
import { TbBrandFacebook } from 'react-icons/tb';

import SocialMediaIcon, { SocialPlatform } from './SocialMediaIcon';

export interface SocialLink {
  platform: SocialPlatform;
  href?: string;
  onClick?: () => void;
}

interface SocialMediaGroupProps {
  links: SocialLink[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'minimal';
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

const gapConfig = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
};

const iconMap = {
  facebook: <TbBrandFacebook />,
  instagram: <RxInstagramLogo />,
  linkedin: <SlSocialLinkedin />,
  twitter: <RiTwitterXLine />,
  youtube: null, // You can add YouTube icon here
  tiktok: null, // You can add TikTok icon here
  pinterest: null, // You can add Pinterest icon here
};

const SocialMediaGroup: React.FC<SocialMediaGroupProps> = ({
  links,
  size = 'md',
  variant = 'default',
  className = '',
  gap = 'md',
}) => {
  const gapClass = gapConfig[gap];

  return (
    <div className={`flex items-center ${gapClass} ${className}`}>
      {links.map(({ platform, href, onClick }) => {
        const icon = iconMap[platform];

        if (!icon) {
          console.warn(`Icon for platform "${platform}" is not available`);
          return null;
        }

        return (
          <SocialMediaIcon
            key={platform}
            platform={platform}
            icon={icon}
            href={href}
            onClick={onClick}
            size={size}
            variant={variant}
          />
        );
      })}
    </div>
  );
};

export default SocialMediaGroup;
