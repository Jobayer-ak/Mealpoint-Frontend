'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RiFullscreenExitLine, RiFullscreenLine } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
}

const ImageZoomModal = ({
  isOpen,
  onClose,
  src,
  alt = 'Zoomed image',
}: ImageZoomModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, isFullscreen]);

  // Handle fullscreen change (detect if exited via ESC)
  useEffect(() => {
    const handleFsChange = () => {
      const fsElement = document.fullscreenElement;
      setIsFullscreen(!!fsElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } catch (err) {
      console.error('Fullscreen request failed:', err);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    } catch (err) {
      console.error('Exit fullscreen failed:', err);
    }
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="image-modal"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm "
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative w-[100vw] h-[80vh] md:w-[100vw] ${
              isFullscreen ? 'w-screen h-[90vh]' : ''
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()} // prevent close on image click
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="object-contain rounded-md select-none"
            />

            {/* Controls */}
            <div
              className={`absolute ${
                isFullscreen ? 'top-1 right-4' : 'top-0 right-8'
              }  flex gap-6 text-gray-300 text-3xl z-5`}
            >
              <button
                aria-label="Toggle fullscreen"
                onClick={() =>
                  isFullscreen ? exitFullscreen() : enterFullscreen()
                }
                className="hover:text-white transition cursor-pointer"
              >
                {isFullscreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
              </button>

              <button
                aria-label="Close image"
                onClick={() => {
                  if (isFullscreen) exitFullscreen();
                  onClose();
                }}
                className=" hover:text-white transition cursor-pointer"
              >
                <RxCross2 />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ImageZoomModal;
