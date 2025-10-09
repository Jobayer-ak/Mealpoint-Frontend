'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  ...props
}) => {
  return (
    <Button
      disabled={isLoading || disabled}
      className={`flex justify-center items-center gap-2 ${
        props.className || ''
      }`}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner className="size-5" /> {/* your Spinner */}
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
