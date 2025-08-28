'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize, Play, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import ButtonComp from '../Shared/Button';
import Counters from '../Shared/counters/Counters';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import WorkingHours from '../Shared/workingHours/WorkingHours';
import SocialMediaGroup from '../ui/SocialMediaGroup';
import Features from './Features';

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Professional video configuration
  const videoConfig = {
    // Replace with your actual video URL
    videoId: 'dQw4w9WgXcQ', // YouTube video ID
    thumbnailUrl: '/assets/Iframe-imae.jpg',
    title: 'Restaurant Introduction Video',
    description: 'Experience our culinary journey and restaurant atmosphere',
  };

  const content =
    'Assumenda possimus eaque illo iste, autem. Porro eveniet, autem ipsam vitae amet repellat repudiandae tenetur, quod corrupti consectetur cum? Repudiandae dignissimos fugiat sit nam. Tempore aspernatur quae repudiandae dolorem, beatae dolorum, praesentium itaque et quam quaerat. Cumque, consequatur!';

  // Professional iframe URL generation for different contexts
  const getIframeSrc = (isModal = false) => {
    const baseUrl = `https://www.youtube.com/embed/${videoConfig.videoId}`;
    const params = new URLSearchParams({
      autoplay: isModal ? '1' : '0', // Autoplay only in modal
      rel: '0',
      modestbranding: '1',
      showinfo: '0',
      controls: '1',
      fs: '1',
      playsinline: '1',
      enablejsapi: '1',
      origin: window?.location?.origin || '',
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Professional modal controls with keyboard support
  const openVideoModal = useCallback(() => {
    setIsModalOpen(true);
    setIsVideoLoaded(true);
    // Allow body scroll when modal is open (so user can interact with page)
    // document.body.style.overflow = 'hidden'; // Commented out to allow scrolling
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  }, []);

  // Enterprise-level keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeVideoModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus management for accessibility
      const modalElement = document.getElementById('video-modal');
      modalElement?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeVideoModal]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Modal backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeVideoModal();
    }
  };

  return (
    <div className="relative bg-white w-full px-22 py-4 rounded-md">
      <div className="flex gap-10 justify-between">
        {/* box shadow of component */}
        <div
          className="absolute top-[-25px]  w-full left-[9px] bg-white/15 rounded-sm z-21"
          style={{
            width: 'calc(100% - 20px)',
            height: '15px',
            transform: 'translateY(15px)',
          }}
        ></div>
        {/* Shadow for next section */}
        <div className="absolute bg-white w-[80px] h-[90px] rounded-full z-22 top-[-42px] left-1/2 transform -translate-x-1/2">
          <div className="w-[20px] h-[35px] bg-white/10 rounded-xl border-2 border-[#54575a] flex m-auto mt-[14px] relative overflow-hidden">
            {/* Animated dot */}
            <motion.button
              className="absolute w-[4px] h-[4px] bg-[#54575a] rounded-full left-1/2 transform -translate-x-1/2 cursor-pionter"
              initial={{ y: 3 }}
              animate={{ y: [3, 15, 3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0,
              }}
            />
          </div>
        </div>
        {/* Shadow for the circular div - positioned to show only top half */}
        <div
          className="absolute bg-white/15 rounded-full z-30 left-1/2 transform -translate-x-1/2"
          style={{
            width: '106px',
            height: '106px',
            top: '-53px',
          }}
        ></div>
        <div className="w-1/2 relative group">
          {/* Video Container with Screen Height */}
          <div className="relative w-full h-[550px] bg-gray-900 rounded-lg overflow-hidden shadow-2xl mt-12">
            {/* Video Thumbnail Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${videoConfig.thumbnailUrl}')`,
              }}
            />

            {/* Professional Play Button Overlay - Center */}
            <motion.button
              onClick={openVideoModal}
              className="absolute inset-0 flex items-center justify-center z-30 cursor-pointer group/play"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              aria-label="Play video in fullscreen"
            >
              {/* Animated Background Circle */}
              <motion.div
                className="relative flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stronger Outer Glow */}
                <div
                  className="absolute w-28 h-28 rounded-full blur-md"
                  style={{
                    background:
                      'radial-gradient(rgba(242,158,56,0.35), rgba(242,158,56,0) 60%)',
                  }}
                />

                {/* Main Play Button with pulsing rings */}
                <div className="relative">
                  {/* Play Button */}
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-102 z-10"
                    style={{
                      backgroundColor: '#f29e38',
                      boxShadow:
                        '0 0 0 3px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.4)',
                    }}
                  >
                    <Play
                      className="w-6 h-6 text-black ml-0.5 transition-colors duration-300"
                      fill="currentColor"
                    />
                  </div>

                  {/* First Pulsing Ring */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/60"
                    initial={{ scale: 0.9, opacity: 0.6 }}
                    animate={{
                      scale: [0.9, 1.0, 1.3, 1.4],
                      opacity: [0.6, 0.5, 0.2, 0],
                    }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      repeatDelay: 1.5,
                      times: [0, 0.2, 0.7, 1],
                    }}
                  />

                  {/* Second Pulsing Ring */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-22 h-22 rounded-full border-2 border-white/40"
                    initial={{ scale: 0.8, opacity: 0.4 }}
                    animate={{
                      scale: [0.8, 0.9, 1.4, 1.6],
                      opacity: [0.4, 0.35, 0.15, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      repeatDelay: 1.5,
                      delay: 0.4,
                      times: [0, 0.25, 0.75, 1],
                    }}
                  />
                </div>
              </motion.div>
            </motion.button>

            {/* Small Maximize Button in Corner */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                openVideoModal();
              }}
              className="absolute top-4 right-4 z-40 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 group/expand opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open video in fullscreen"
            >
              <Maximize className="w-4 h-4 text-white group-hover/expand:text-amber-400 transition-colors duration-300" />
            </motion.button>
          </div>
        </div>

        <div className="w-1/2 p-8 mt-18">
          <SecHeader
            header={'ABOUT US'}
            className={'flex gap-3 font-bold items-center text-[#19302d]'}
          />
          <SecMainHeader
            className={
              'className="text-5xl sm:text-5xl text-[#19302d] font-extrabold tracking-wildest mt-8 mb-6'
            }
            content={'We invite you to visit our restaurant'}
          />
          <SecDescription content={content} className={'mb-6 text-[#19302d]'} />

          {/* Buttons */}
          <div className="flex gap-8 items-center">
            <ButtonComp
              content={'READ MORE'}
              className={
                'text-[#112029] tracking-[3px] bg-[#f29e38] py-8 px-5 mt-4 cursor-pointer'
              }
            />

            <div className="pt-3">
              <SocialMediaGroup
                links={[
                  {
                    platform: 'facebook',
                    href: 'https://facebook.com/yourpage',
                  },
                  {
                    platform: 'instagram',
                    href: 'https://instagram.com/yourpage',
                  },
                  {
                    platform: 'linkedin',
                    href: 'https://linkedin.com/company/yourcompany',
                  },
                  { platform: 'twitter', href: 'https://x.com/yourpage' },
                ]}
                size="md"
                variant="default"
                gap="md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Fullscreen Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            id="video-modal"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
            tabIndex={-1}
            role="dialog"
            aria-modal="false"
            aria-labelledby="video-modal-title"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Modal Content Container */}
            <motion.div
              className="relative w-full max-w-3xl mx-4 aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
                duration: 0.4,
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: 'auto' }}
            >
              {/* Modal Video Iframe */}
              <iframe
                src={isVideoLoaded ? getIframeSrc(true) : undefined}
                title={videoConfig.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />

              {/* Professional Close Button */}
              <motion.button
                onClick={closeVideoModal}
                className="absolute -top-12 -right-12 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group/close"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close video modal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                style={{ pointerEvents: 'auto' }}
              >
                <X className="w-6 h-6 text-white group-hover/close:text-red-400 transition-colors duration-300" />
              </motion.button>
            </motion.div>

            {/* Modal Instructions */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-800 bg-white/90 px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ pointerEvents: 'auto' }}
            >
              Press{' '}
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">ESC</kbd>{' '}
              or click outside to close
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features  Section*/}

      <div className="my-20">
        <Features />
      </div>

      {/* Working Hours Section */}
      <WorkingHours />

      {/* Coutners */}
      <Counters />
    </div>
  );
};

export default AboutSection;
