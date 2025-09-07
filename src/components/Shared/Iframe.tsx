'use client';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FiMaximize } from 'react-icons/fi';
import VideoModal from './VideoModal';

const Iframe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videoConfig = {
    videoId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/assets/Iframe-imae.jpg',
    title: 'Restaurant Introduction Video',
  };

  const openVideoModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="mb-12">
      <div className="w-full relative group">
        <div className="relative h-[550px] bg-gray-900 rounded-md overflow-hidden shadow-2xl mt-12">
          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${videoConfig.thumbnailUrl}')`,
            }}
          />

          {/* Center Play Button */}
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
            <motion.div
              className="relative flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute w-28 h-28 rounded-full blur-md"
                style={{
                  background:
                    'radial-gradient(rgba(242,158,56,0.35), rgba(242,158,56,0) 60%)',
                }}
              />

              <div className="relative">
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-102 z-10"
                  style={{
                    backgroundColor: '#f29e38',
                    boxShadow:
                      '0 0 0 3px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.4)',
                  }}
                >
                  <FaPlay
                    className="w-6 h-6 text-black ml-0.5 transition-colors duration-300"
                    fill="currentColor"
                  />
                </div>

                {/* Pulsing Rings */}
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

          {/* Maximize Button */}
          <motion.button
            onClick={openVideoModal}
            className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 group/expand opacity-0 group-hover:opacity-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open video in fullscreen"
          >
            <FiMaximize className="w-4 h-4 text-white group-hover/expand:text-amber-400 transition-colors duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={videoConfig.videoId}
        title={videoConfig.title}
      />
    </div>
  );
};

export default Iframe;
