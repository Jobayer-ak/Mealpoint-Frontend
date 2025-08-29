/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import ButtonComp from '../Shared/Button';
import SecHeader from '../Shared/SecHeader';

interface Slide {
  id: number;
  imageUrl: string;
  title?: string;
  subtitle?: string;
}

interface SliderProps {
  slides: Slide[];
}

const Slider = ({ slides }: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(1);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, isTransitioning]);

  const goToNext = () => {
    if (isTransitioning) return;
    setDirection(1);
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % slides.length);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setDirection(-1);
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setIsTransitioning(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // Ultra smooth easing functions
  const easeCustom = cubicBezier(0.25, 0.1, 0.25, 1);
  const easeSilky = cubicBezier(0.19, 1, 0.22, 1);
  const easeGentle = cubicBezier(0.33, 1, 0.68, 1);

  // Ultra smooth stack sliding animation variants
  const slideVariants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 40,
      filter: 'blur(2px)',
      zIndex: 1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      zIndex: 10,
    },
    exit: {
      opacity: 0,
      scale: 1.08,
      y: -40,
      filter: 'blur(2px)',
      zIndex: 5,
    },
  };

  // Content animation variants (follows image motion)
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.05,
    },
  };

  // Pagination animation
  const paginationVariants = {
    inactive: {
      scale: 1,
      backgroundColor: 'transparent',
    },
    active: {
      scale: 1.2,
      backgroundColor: '#f29e38',
    },
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[550px] lg:h-[600px] xl:h-[650px] slider-container overflow-hidden">
      {/* Stack Animation Container with Background Cover */}
      <div className="relative w-full h-full bg-black">
        {/* Static Background (Prevents gap visibility) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={slides[activeIndex]?.imageUrl || slides[0]?.imageUrl}
            alt="Background"
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={100}
          />
          {/* Choose one of these overlay styles */}
          {/* Option 1: Restaurant warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2025]/80 via-[#0f2025]/50 to-[#0f2025]/10"></div>
        </div>

        {/* Animated Image Layer */}
        <AnimatePresence initial={false} mode="sync">
          {slides.map((slide, index) => {
            if (index === activeIndex) {
              return (
                <motion.div
                  key={`slide-${slide.id}-${activeIndex}`}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{
                    duration: 0.9,
                    ease: easeSilky,
                    scale: {
                      duration: 1.0,
                      ease: easeGentle,
                    },
                    y: {
                      duration: 0.9,
                      ease: easeSilky,
                    },
                    opacity: {
                      duration: 0.7,
                      ease: easeCustom,
                    },
                    filter: {
                      duration: 0.6,
                      ease: easeCustom,
                    },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Animated Background Image */}
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title || 'Slide image'}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    quality={100}
                    priority={index === 0}
                  />

                  {/* Animated Gradient Overlay - Match with static background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f2025]/80 via-[#0f2025]/50 to-[#0f2025]/10"></div>
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>

        {/* Animated Content Layer (Follows Images) */}
        <AnimatePresence initial={false} mode="sync">
          {slides.map((slide, index) => {
            if (index === activeIndex) {
              return (
                <motion.div
                  key={`content-${slide.id}-${activeIndex}`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{
                    duration: 0.9,
                    ease: easeSilky,
                    delay: 0.1,
                    scale: {
                      duration: 1.0,
                      ease: easeGentle,
                    },
                    y: {
                      duration: 0.9,
                      ease: easeSilky,
                    },
                    opacity: {
                      duration: 0.7,
                      ease: easeCustom,
                    },
                  }}
                  className="absolute inset-0 top-35 flex flex-col items-start text-white ml-22 z-20"
                >
                  <motion.div
                    className="mb-8 w-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: easeSilky }}
                  >
                    <SecHeader
                      header={'Hello, New Friend!'}
                      className={'flex gap-3 items-center'}
                    />
                  </motion.div>
                  {slide.title && (
                    <motion.h1
                      className="text-6xl w-1/2 sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 tracking-tight"
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.9,
                        ease: easeSilky,
                      }}
                    >
                      {slide.title}
                    </motion.h1>
                  )}
                  {slide.subtitle && (
                    <motion.p
                      className="mt-2 text-[#9eacb0] font-bold w-1/3 drop-shadow-lg max-w-4xl leading-relaxed"
                      initial={{ opacity: 0, y: 25, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.8,
                        ease: easeSilky,
                      }}
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: easeGentle }}
                    className="relative"
                  >
                    {/* 3D Bottom Shadow Effect */}
                    <div className="relative inline-block">
                      {/* Main Button */}
                      <div className="relative z-10">
                        <ButtonComp
                          content={'RESERVATION'}
                          className="text-[#112029] tracking-[3px] bg-[#f29e38] py-8 px-10 mt-8 cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
                        />
                      </div>

                      {/* Single bottom shadow layer - 4px height, narrower width, white transparent */}
                      <div
                        className="absolute bottom-1 left-[9px] bg-white/10 rounded-sm z-0"
                        style={{
                          width: 'calc(100% - 20px)',
                          height: '12px',
                          transform: 'translateY(12px)',
                        }}
                      ></div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </div>

      {/* Custom Pagination + Navigation */}
      <div className="absolute bottom-8 left-28 flex items-center gap-12 z-50">
        {/* Custom Pagination */}
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              variants={paginationVariants}
              initial="inactive"
              animate={activeIndex === index ? 'active' : 'inactive'}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full border-2 border-yellow-400 transition-all duration-300 cursor-pointer ${
                isTransitioning ? 'pointer-events-none' : ''
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={goToPrev}
            className={`font-bold text-white cursor-pointer ${
              isTransitioning ? 'pointer-events-none opacity-50' : ''
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <FaArrowLeftLong size={22} />
          </motion.button>
          <motion.button
            onClick={goToNext}
            className={`font-bold text-white cursor-pointer ${
              isTransitioning ? 'pointer-events-none opacity-50' : ''
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <FaArrowRightLong size={22} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
