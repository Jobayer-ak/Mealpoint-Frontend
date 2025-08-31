'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { SetStateAction, useRef, useState } from 'react';
import { BiSolidZoomIn, BiSolidZoomOut } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { MdFullscreen, MdOutlineShare } from 'react-icons/md';
import GalleryCarousel from '../footer/GalleryCarousel';

interface GalleryModalProps {
  images: string[];
  triggerElement: React.ReactNode;
  initialIndex?: number;
}

const Modal: React.FC<GalleryModalProps> = ({
  images,
  triggerElement,
  initialIndex = 0,
}) => {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!modalRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else modalRef.current.requestFullscreen();
  };

  return (
    <div className="w-full min-h-screen">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 z-40" />
          <Dialog.Content
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {/* Top-right controls - always visible */}
            <div className="absolute top-4 right-6 flex gap-4 text-white text-2xl z-[1000]">
              <Dialog.Close asChild>
                <button className="cursor-pointer hover:text-gray-300 ">
                  <IoClose />
                </button>
              </Dialog.Close>
              <button className="cursor-pointer hover:text-gray-300">
                <MdOutlineShare />
              </button>
              <button
                onClick={() => setZoom((z) => !z)}
                className="cursor-pointer hover:text-gray-300"
              >
                {zoom ? <BiSolidZoomOut /> : <BiSolidZoomIn />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="cursor-pointer hover:text-gray-300"
              >
                <MdFullscreen />
              </button>
            </div>

            {/* Top-left counter - only when not zoomed */}
            {!zoom && (
              <div className="absolute top-4 left-6 text-white text-lg font-semibold z-50">
                {currentIndex + 1}/{images.length}
              </div>
            )}

            {/* Fullscreen Zoom Overlay with Next.js Image */}
            {zoom && (
              <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={images[currentIndex]}
                    alt={`zoomed-${currentIndex}`}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Normal Carousel */}
            {!zoom && (
              <GalleryCarousel
                images={images}
                initialIndex={currentIndex}
                zoom={false} // no zoom inside carousel
                onSelect={(idx: SetStateAction<number>) => setCurrentIndex(idx)}
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Modal;
