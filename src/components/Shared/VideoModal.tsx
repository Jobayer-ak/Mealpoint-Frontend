'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
  showInstructions?: boolean;
}

const VideoModal = ({
  isOpen,
  onClose,
  videoId,
  title = 'Video',
  showInstructions = true,
}: VideoModalProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Load video when modal opens
  useEffect(() => {
    if (isOpen) setIsVideoLoaded(true);
  }, [isOpen]);

  const getIframeSrc = (autoplay = false) => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      rel: '0',
      modestbranding: '1',
      controls: '1',
      fs: '1',
      playsinline: '1',
      enablejsapi: '1',
      origin: window?.location?.origin || '',
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay */}
          <motion.div
            className="fixed inset-0 z-[9990] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Video Modal */}
          <motion.div
            className="fixed inset-0 z-[9995] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {isVideoLoaded && (
                <iframe
                  src={getIframeSrc(true)}
                  title={title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              )}
            </div>
          </motion.div>

          {/* Cross button fixed above everything */}
          <motion.button
            onClick={onClose}
            className="fixed top-8 right-72 z-[9999] text-white bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full p-3 shadow-sm cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            aria-label="Close video modal"
          >
            <RxCross1 className="w-6 h-6 text-white transition-colors duration-300" />
          </motion.button>

          {/* ESC instructions */}
          {showInstructions && (
            <motion.div
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] text-gray-800 bg-white/90 px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Press{' '}
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">ESC</kbd>{' '}
              or click outside to close
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
