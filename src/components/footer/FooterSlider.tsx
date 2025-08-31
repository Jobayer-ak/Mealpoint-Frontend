'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { BiSolidZoomIn, BiSolidZoomOut } from 'react-icons/bi';
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoClose,
} from 'react-icons/io5';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

import { useEffect, useRef, useState } from 'react';
import { MdFullscreen, MdOutlineShare } from 'react-icons/md';

const FooterSlider = () => {
  const items = [
    { srcImage: '/assets/footer/gallery-1.jpg' },
    { srcImage: '/assets/footer/gallery-2.jpg' },
    { srcImage: '/assets/footer/gallery-3.jpg' },
    { srcImage: '/assets/footer/gallery-4.jpg' },
    { srcImage: '/assets/footer/gallery-5.jpg' },
    { srcImage: '/assets/footer/gallery-6.jpg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync carousel index
  useEffect(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!modalRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      modalRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full">
      {/* Swiper thumbnails */}
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
            <div className="relative w-full h-[85px] group rounded-sm overflow-hidden">
              <Image
                src={item.srcImage}
                alt={`gallery-${index}`}
                fill
                className="object-cover rounded-sm transition-transform duration-300 ease-in-out group-hover:scale-110"
                priority
              />

              {/* Modal */}
              <Dialog.Root
                open={open}
                onOpenChange={(isOpen) => {
                  setOpen(isOpen);
                  setZoom(false);
                  if (isOpen) {
                    setCurrentIndex(index); // set current index to clicked image
                    // Sync carousel to this index when modal opens
                    setTimeout(() => {
                      if (api) api.scrollTo(index, true); // scrollTo clicked slide instantly
                    }, 0);
                  }
                }}
              >
                <Dialog.Trigger asChild>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-sm">
                    <BiSolidZoomIn size={28} color="white" />
                  </div>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50" />
                  <Dialog.Content
                    ref={modalRef}
                    className="fixed inset-0 flex items-center justify-center z-50"
                  >
                    {/* Counter */}
                    <div className="absolute top-4 left-6 text-white text-lg font-semibold">
                      {currentIndex + 1}/{items.length}
                    </div>

                    {/* Controls */}
                    <div className="absolute top-4 right-6 flex gap-4 text-white text-2xl">
                      <Dialog.Close asChild>
                        <button className="hover:text-gray-300">
                          <IoClose />
                        </button>
                      </Dialog.Close>
                      <button className="hover:text-gray-300">
                        <MdOutlineShare />
                      </button>
                      <button
                        onClick={() => setZoom((z) => !z)}
                        className="hover:text-gray-300"
                      >
                        {zoom ? <BiSolidZoomOut /> : <BiSolidZoomIn />}
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="hover:text-gray-300"
                      >
                        <MdFullscreen />
                      </button>
                    </div>

                    {/* Carousel */}
                    <div className="w-[90vw] max-w-5xl flex justify-center items-center">
                      <Carousel
                        setApi={setApi}
                        opts={{
                          align: 'center',
                          loop: true,
                        }}
                      >
                        <CarouselContent>
                          {items.map((item, idx) => (
                            <CarouselItem
                              key={`carousel-item-${idx}`}
                              className="flex justify-center items-center"
                            >
                              <Image
                                src={item.srcImage}
                                alt={`gallery-full-${idx}`}
                                width={600}
                                height={600}
                                className={`rounded-lg transition-transform duration-500 ease-in-out ${
                                  zoom
                                    ? 'scale-125 cursor-zoom-out'
                                    : 'scale-100 cursor-zoom-in'
                                } object-contain`}
                                priority
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="text-white bg-black/30 hover:bg-black absolute left-4 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="text-white bg-black/30 hover:bg-black absolute right-4 top-1/2 -translate-y-1/2" />
                      </Carousel>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Nav */}
      <div className="absolute -bottom-16 right-0 flex gap-3 z-50">
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
