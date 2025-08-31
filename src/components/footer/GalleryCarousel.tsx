/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface GalleryCarouselProps {
  images: string[];
  initialIndex?: number;
  zoom?: boolean;
  setApi?: (api: CarouselApi) => void;
  onSelect?: (index: number) => void;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  images,
  initialIndex = 0,
  zoom,
  setApi,
  onSelect,
}) => {
  const [apiInstance, setApiInstance] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const total = images.length;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // const res = zoom ? 1 : 0;
  const [zoomLevel, setZoomLevel] = useState(1);

  // Wrap-around navigation
  const handleNext = () => {
    if (!apiInstance) return;
    if (currentIndex === total - 1) {
      apiInstance.scrollTo(0, true); // go to first slide
      setCurrentIndex(0);
      onSelect && onSelect(0);
    } else {
      apiInstance.scrollNext();
    }
  };

  const handlePrev = () => {
    if (!apiInstance) return;
    if (currentIndex === 0) {
      apiInstance.scrollTo(total - 1, true); // go to last slide
      setCurrentIndex(total - 1);
      onSelect && onSelect(total - 1);
    } else {
      apiInstance.scrollPrev();
    }
  };

  // ✅ Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!carouselRef.current) return;
    if (!document.fullscreenElement) {
      carouselRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // ✅ Toggle Zoom
  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.5 : 1)); // switch between normal and zoomed
  };

  useEffect(() => {
    if (!apiInstance) return;

    // scroll to initialIndex
    apiInstance.scrollTo(initialIndex, true);

    // sync index on select
    apiInstance.on('select', () => {
      const index = apiInstance.selectedScrollSnap();
      setCurrentIndex(index);
      onSelect && onSelect(index);
      setZoomLevel(1); // reset zoom when changing slide
    });

    setApi && setApi(apiInstance);

    // Listen for fullscreen change
    const handleFullScreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [apiInstance, initialIndex, onSelect, setApi]);

  return (
    <div
      ref={carouselRef}
      className="w-full max-w-5xl flex justify-center items-center relative"
    >
      <Carousel setApi={setApiInstance} opts={{ align: 'center', loop: false }}>
        <CarouselContent>
          {images.map((src, idx) => (
            <CarouselItem
              key={`carousel-item-${idx}`}
              className="flex justify-center items-center w-full h-[70vh]"
            >
              <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
                <Image
                  src={src}
                  alt={`gallery-${idx}`}
                  width={1000}
                  height={800}
                  className={`h-[80vh] w-auto object-contain transition-transform duration-500 ease-in-out`}
                  style={{
                    transform: zoom ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/Next buttons */}
        {/* <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 transition-all duration-300 text-white hover:bg-[#f29e38] px-3 py-2 rounded"
        >
          <IoArrowBackOutline />
        </button>
        <button
          onClick={handleNext}
          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-white transition-all duration-300 hover:bg-[#f29e38] px-3 py-2 rounded"
        >
          <IoArrowForwardOutline />
        </button> */}
      </Carousel>
    </div>
  );
};

export default GalleryCarousel;
