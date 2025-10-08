'use client';
import HashLoader from 'react-spinners/HashLoader';

const AuthLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-none z-50">
      <HashLoader color="#facc15" size={70} />
    </div>
  );
};

export default AuthLoader;
