/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import ButtonComp from '../Shared/ButtonComp';
import SecHeader from '../Shared/SecHeader';

interface Slide {
  id: number;
  imageUrl: string;
  title?: ReactNode;
  subtitle?: string;
}

interface SliderProps {
  slides: Slide[];
}

const Slider = ({ slides }: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative w-full h-[100vh] slider-container overflow-hidden">
      {/* Background Cover */}
      <div className="relative w-full h-full bg-black">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={slides[activeIndex]?.imageUrl || slides[0]?.imageUrl}
            alt="Background"
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2025]/80 via-[#0f2025]/50 to-[#0f2025]/10"></div>
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 md:top-35 flex flex-col justify-center items-center md:items-start md:justify-start text-white md:ml-26 z-20 sm:text-left">
          <div className="mb-4 w-full md:w-1/2">
            <SecHeader
              header={'Hello, New Friend!'}
              className="flex flex-col items-center md:flex-row md:items-center gap-6 md:gap-3"
            />
          </div>

          {slides[activeIndex]?.title && (
            <div className="w-full lg:w-1/2 flex justify-center sm:justify-start">
              <h1
                className="
                  text-5xl
                  md:text-6xl
                  lg:text-[85px]
                  font-extrabold
                  mb-4
                  tracking-wide md:tracking-tight
                  leading-tight
                  lg:leading-[90px]
                  
                "
              >
                {slides[activeIndex].title}
              </h1>
            </div>
          )}

          {slides[activeIndex]?.subtitle && (
            <p className="mt-4 sm:mt-2 text-[#9eacb0] font-semibold w-full sm:w-1/3 px-8 sm:px-0 drop-shadow-lg max-w-4xl leading-relaxed text-center sm:text-left">
              {slides[activeIndex].subtitle}
            </p>
          )}

          <div className="relative">
            <div className="relative inline-block">
              <div className="relative z-10">
                <ButtonComp
                  content={'RESERVATION'}
                  className="text-[#112029] tracking-[3px] bg-[#f29e38] py-8 px-10 mt-8 cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
                />
              </div>
              <div
                className="absolute bottom-1 left-[9px] bg-white/10 rounded-sm z-0"
                style={{
                  width: 'calc(100% - 20px)',
                  height: '12px',
                  transform: 'translateY(12px)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination + Navigation */}
      <div className="absolute bottom-8 z-50 w-full px-20 sm:px-26">
        {/* Pagination */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full border-2 border-yellow-400 transition-all duration-300 cursor-pointer ${
                  activeIndex === index ? 'bg-[#f29e38] scale-110' : ''
                }`}
              />
            ))}
          </div>
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrev}
              className="font-bold text-white cursor-pointer"
            >
              <FaArrowLeftLong size={22} />
            </button>
            <button
              onClick={goToNext}
              className="font-bold text-white cursor-pointer"
            >
              <FaArrowRightLong size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
