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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [zoomLevel, setZoomLevel] = useState(1);

  // Smooth next/prev navigation
  const handleNext = () => {
    if (!apiInstance) return;
    if (currentIndex === images.length - 1) {
      apiInstance.scrollTo(0, true);
      setCurrentIndex(0);
      onSelect && onSelect(0);
    } else {
      apiInstance.scrollNext();
    }
  };

  const handlePrev = () => {
    if (!apiInstance) return;
    if (currentIndex === 0) {
      apiInstance.scrollTo(images.length - 1, true);
      setCurrentIndex(images.length - 1);
      onSelect && onSelect(images.length - 1);
    } else {
      apiInstance.scrollPrev();
    }
  };

  // Reset zoom when slide changes
  useEffect(() => {
    if (!apiInstance) return;

    apiInstance.scrollTo(initialIndex, true);

    apiInstance.on('select', () => {
      const index = apiInstance.selectedScrollSnap();
      setCurrentIndex(index);
      onSelect && onSelect(index);
      setZoomLevel(1);
    });

    setApi && setApi(apiInstance);
  }, [apiInstance, initialIndex, onSelect, setApi]);

  return (
    <div
      ref={carouselRef}
      className="w-full max-w-5xl flex justify-center items-center relative overflow-hidden"
      style={
        {
          // scrollBehavior: 'smooth', // makes programmatic scrolling smooth
        }
      }
    >
      <Carousel
        setApi={setApiInstance}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((src, idx) => (
            <CarouselItem
              key={`carousel-item-${idx}`}
              className={`flex justify-center items-center w-full h-[70vh] transition-transform duration-300 ease-in-out`}
            >
              <div
                className={`relative w-full h-full flex justify-center items-center overflow-hidden ${
                  zoom
                    ? 'fixed top-0 left-0 z-[9999] w-screen h-screen bg-black'
                    : ''
                }`}
              >
                <Image
                  src={src}
                  alt={`gallery-${idx}`}
                  fill
                  className={`object-contain`}
                  style={{
                    transform:
                      zoom && idx === currentIndex ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/Next buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-[#f29e38] px-3 py-2 rounded transition-all duration-300"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-[#f29e38] px-3 py-2 rounded transition-all duration-300"
        >
          &#8594;
        </button>
      </Carousel>
    </div>
  );
};

export default GalleryCarousel;
