'use client';

import { RootState } from '@/redux/store';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import Loader from '../Shared/Loader';

export default function GlobalLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loader />
      ) : (
        // <motion.div
        //   key="loader"
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   exit={{ opacity: 0 }}
        //   transition={{ duration: 0.7 }}
        //   className="fixed inset-0 z-[9999] flex items-center justify-center bg-none"
        // >
        //   <Loader />
        // </motion.div>
        <div>{children}</div>
        // <motion.div
        //   key="content"
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   exit={{ opacity: 0 }}
        //   transition={{ duration: 0.4 }}
        // >
        //   {children}
        // </motion.div>
      )}
    </AnimatePresence>
  );
}
