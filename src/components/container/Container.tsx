import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export default function Container({
  children,
  className = '',
  fullWidth = false,
}: ContainerProps) {
  if (fullWidth) {
    return (
      <div className={`w-screen mx-[-0px] lg:mx-[-70px] ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`w-full px-1 md:px-4 lg:px-6  ${className}`}>
      {children}
    </div>
  );
}
