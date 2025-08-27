'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'tiktok'
  | 'pinterest';

interface SocialMediaIconProps {
  platform: SocialPlatform;
  icon: ReactNode;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'minimal';
  className?: string;
  onClick?: () => void;
}

const platformConfig: Record<
  SocialPlatform,
  {
    hoverColor: string;
    hoverGradient?: string;
    ariaLabel: string;
  }
> = {
  facebook: {
    hoverColor: '#1877f2',
    ariaLabel: 'Visit our Facebook page',
  },
  instagram: {
    hoverColor: '#e4405f',
    hoverGradient:
      'linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)',
    ariaLabel: 'Visit our Instagram profile',
  },
  linkedin: {
    hoverColor: '#0077b5',
    ariaLabel: 'Visit our LinkedIn profile',
  },
  twitter: {
    hoverColor: '#000000',
    ariaLabel: 'Visit our Twitter/X profile',
  },
  youtube: {
    hoverColor: '#ff0000',
    ariaLabel: 'Visit our YouTube channel',
  },
  tiktok: {
    hoverColor: '#000000',
    ariaLabel: 'Visit our TikTok profile',
  },
  pinterest: {
    hoverColor: '#bd081c',
    ariaLabel: 'Visit our Pinterest profile',
  },
};

const sizeConfig = {
  sm: {
    container: 'w-8 h-8',
    icon: 'w-3 h-3',
  },
  md: {
    container: 'w-10 h-10',
    icon: 'w-4 h-4',
  },
  lg: {
    container: 'w-12 h-12',
    icon: 'w-5 h-5',
  },
};

const variantConfig = {
  default: {
    base: 'bg-gray-100 border border-gray-200',
    hover: 'shadow-lg',
  },
  outlined: {
    base: 'bg-transparent border-2 border-gray-300',
    hover: 'shadow-md border-opacity-0',
  },
  minimal: {
    base: 'bg-transparent',
    hover: 'bg-opacity-10',
  },
};

const animationConfig = {
  initial: { scale: 1 },
  whileHover: {
    scale: 1.1,
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  },
  whileTap: {
    scale: 0.95,
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  },
};

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({
  platform,
  icon,
  href,
  size = 'md',
  variant = 'default',
  className = '',
  onClick,
}) => {
  const config = platformConfig[platform];
  const sizeClasses = sizeConfig[size];
  const variantClasses = variantConfig[variant];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className={`
        ${sizeClasses.container}
        ${variantClasses.base}
        rounded-full
        flex items-center justify-center
        cursor-pointer
        transition-all duration-300 ease-out
        group
        relative
        overflow-hidden
        ${className}
      `.trim()}
      onClick={handleClick}
      aria-label={config.ariaLabel}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={
        {
          '--hover-color': config.hoverGradient || config.hoverColor,
        } as React.CSSProperties
      }
      {...animationConfig}
    >
      {/* Simple icon - no extra containers */}
      <div
        className={`${sizeClasses.icon} text-gray-600 group-hover:text-white transition-colors duration-300 ease-out flex items-center justify-center`}
      >
        {icon}
      </div>

      {/* Hover background overlay */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out -z-10"
        style={{
          background: 'var(--hover-color)' as string,
        }}
      />
    </motion.div>
  );
};

export default SocialMediaIcon;
