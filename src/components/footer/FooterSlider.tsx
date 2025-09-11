'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BiSolidZoomIn } from 'react-icons/bi';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import 'swiper/css';
import 'swiper/css/navigation';
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile screen
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={14}
        loop
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          prevEl: '.footer-prev',
          nextEl: '.footer-next',
        }}
        modules={[Navigation, Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          0: { slidesPerView: 3 },
          640: { slidesPerView: 3, centeredSlides: true },
          768: { slidesPerView: 3, centeredSlides: true },
          1024: { slidesPerView: 4, centeredSlides: true },
        }}
        className="overflow-visible"
      >
        {items.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[100px] group rounded-sm overflow-hidden">
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
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center 
                      bg-black/70 rounded-sm cursor-pointer transition-opacity
                      ${
                        isMobile
                          ? index === activeIndex
                            ? 'opacity-100'
                            : 'opacity-0'
                          : 'opacity-0 group-hover:opacity-100'
                      }
                    `}
                  >
                    <BiSolidZoomIn
                      size={isMobile ? 22 : 28}
                      className="text-white"
                    />
                  </div>
                }
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className="absolute -bottom-14 right-0 flex gap-3 z-25">
        <button className="footer-prev w-9 h-9 flex items-center justify-center rounded-full bg-[#19302d] text-white hover:bg-[#f29e38] hover:text-[#19302d] transition">
          <IoArrowBackOutline size={18} />
        </button>
        <button className="footer-next w-9 h-9 flex items-center justify-center rounded-full bg-[#19302d] text-white hover:bg-[#f29e38] hover:text-[#19302d] transition">
          <IoArrowForwardOutline size={18} />
        </button>
      </div>
    </div>
  );
};

export default FooterSlider;
