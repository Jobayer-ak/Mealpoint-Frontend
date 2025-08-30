'use client';

import Image from 'next/image';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const FooterSlider = () => {
  const items = [
    { srcImage: '/assets/footer/gallery-1.jpg' },
    { srcImage: '/assets/footer/gallery-2.jpg' },
    { srcImage: '/assets/footer/gallery-3.jpg' },
    { srcImage: '/assets/footer/gallery-4.jpg' },
    { srcImage: '/assets/footer/gallery-5.jpg' },
    { srcImage: '/assets/footer/gallery-6.jpg' },
  ];

  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView={4}
        spaceBetween={14}
        loop
        observer
        observeParents
        navigation={{
          prevEl: '.footer-prev',
          nextEl: '.footer-next',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        className="overflow-visible"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="relative w-full h-[85px]">
              <Image
                src={item.srcImage}
                alt="gallery"
                fill
                className="object-cover rounded-sm"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="absolute -bottom-19 right-0 flex gap-3">
        <button className="footer-prev w-9 h-9 flex items-center justify-center rounded-full bg-[#19302d] text-white hover:bg-[#f29e38] hover:text-[#19302d] transition-colors cursor-pointer">
          <IoArrowBackOutline size={18} />
        </button>
        <button className="footer-next w-9 h-9 flex items-center justify-center rounded-full bg-[#19302d] text-white hover:bg-[#f29e38] hover:text-[#19302d] transition-colors cursor-pointer">
          <IoArrowForwardOutline size={18} />
        </button>
      </div>
    </div>
  );
};

export default FooterSlider;
