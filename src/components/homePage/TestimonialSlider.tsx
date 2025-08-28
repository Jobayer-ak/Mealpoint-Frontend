// components/ui/Carousel.tsx
'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import React from 'react';

type CarouselProps = {
  items: React.ReactNode[]; // can be strings, JSX, cards, etc.
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
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      pagination={pagination ? { clickable: true } : false}
      navigation={navigation}
      autoplay={
        autoplay ? { delay: 3000, disableOnInteraction: false } : undefined
      }
      modules={[Pagination, Navigation, Autoplay]}
      className={className}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
