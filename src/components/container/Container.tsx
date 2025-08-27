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
    return <div className={`w-full ${className}`}>{children}</div>;
  }

  return (
    <div className={`mx-auto w-full px-2 sm:px-2 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
