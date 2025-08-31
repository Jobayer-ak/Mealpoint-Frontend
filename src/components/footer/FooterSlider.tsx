'use client';
import Image from 'next/image';
import { BiSolidZoomIn } from 'react-icons/bi';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from '../Shared/Modal';

const FooterSlider = () => {
  const items = [
    '/assets/footer/gallery-1.jpg',
    '/assets/footer/gallery-2.jpg',
    '/assets/footer/gallery-3.jpg',
    '/assets/footer/gallery-4.jpg',
    '/assets/footer/gallery-5.jpg',
    '/assets/footer/gallery-6.jpg',
  ];

  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView={4}
        spaceBetween={14}
        loop
        navigation={{
          prevEl: '.footer-prev',
          nextEl: '.footer-next',
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="overflow-visible"
      >
        {items.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="relative w-full h-[85px] group rounded-sm overflow-hidden">
              <Image
                src={src}
                alt={`gallery-${index}`}
                fill
                className="object-cover rounded-sm transition-transform duration-300 ease-in-out group-hover:scale-110"
                priority
              />
              <Modal
                images={items}
                initialIndex={index}
                triggerElement={
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-sm">
                    <BiSolidZoomIn size={28} color="white" />
                  </div>
                }
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute -bottom-19 right-0 flex gap-3 z-25">
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
