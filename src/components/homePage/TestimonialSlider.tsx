'use client';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonComp from '../Shared/Button';

type CarouselProps = {
  items: React.ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean;
  pagination?: boolean;
  navigation?: boolean;
  className?: string;
};

const TestimonialSlider: React.FC<CarouselProps> = ({
  items,
  slidesPerView = 3,
  spaceBetween = 30,
  loop = false,
  autoplay = false,
  pagination = true,
  navigation = false,
  className = '',
}) => {
  return (
    <div className="relative pb-3">
      {' '}
      {/* ✅ Add padding-bottom to container */}
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        centeredSlides={true}
        pagination={pagination ? { clickable: true } : false}
        navigation={navigation}
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : undefined
        }
        modules={[Pagination, Navigation, Autoplay]}
        className={`${className} relative`}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`transition-transform duration-300 min-h-[460px] b-10 flex flex-col justify-between
                  ${
                    isActive
                      ? 'shadow-xl rounded-2xl border-0'
                      : 'opacity-70 border-0'
                  }
                `}
              >
                {item}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Pagination wrapper - absolutely inside container */}
      <div className="absolute top-7 w-full flex justify-center z-50 pointer-events-none">
        <style jsx global>{`
          .swiper-pagination {
            pointer-events: auto;
          }
          .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #19302d;
            opacity: 0.5;
          }
          .swiper-pagination-bullet-active {
            opacity: 1;
            background: #f29e38;
          }
        `}</style>
      </div>
      {/* Button */}
      <ButtonComp
        content={'MORE ABOUT US'}
        className="absolute z-30 bottom-[5px] text-[#112029] font-semibold tracking-[2px] bg-[#f29e38] py-8 px-6 cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
      />
    </div>
  );
};

export default TestimonialSlider;
