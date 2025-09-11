/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { BiSolidZoomIn, BiSolidZoomOut } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { MdFullscreen, MdOutlineShare } from 'react-icons/md';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

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
  const transformRef = useRef<any>(null);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!modalRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else modalRef.current.requestFullscreen();
  };

  // Toggle zoom from top-right button
  const toggleZoom = () => {
    if (!transformRef.current) return;
    if (zoom) {
      transformRef.current.resetTransform();
      setZoom(false);
    } else {
      transformRef.current.zoomIn(2); // zoom to 2x
      setZoom(true);
    }
  };

  // Handle image click (Google Photos / Instagram style)
  const handleImageClick = () => {
    if (!transformRef.current) return;
    if (zoom) {
      transformRef.current.resetTransform();
      setZoom(false);
    } else {
      transformRef.current.zoomIn(2);
      setZoom(true);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-40" />
        <Dialog.Content
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          {/* Top-right controls */}
          <div className="absolute top-4 right-6 flex gap-4 text-white text-2xl z-[1000]">
            <Dialog.Close asChild>
              <button className="cursor-pointer hover:text-gray-300">
                <IoClose />
              </button>
            </Dialog.Close>
            <button className="cursor-pointer hover:text-gray-300">
              <MdOutlineShare />
            </button>
            <button
              onClick={toggleZoom}
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

          {/* Top-left counter */}
          {!zoom && (
            <div className="absolute top-4 left-6 text-white text-lg font-semibold z-50">
              {currentIndex + 1}/{images.length}
            </div>
          )}

          {/* Zoomable Image */}
          <TransformWrapper
            ref={transformRef}
            minScale={1}
            maxScale={4}
            centerOnInit
            limitToBounds
            wheel={{ step: 0.1 }}
            doubleClick={{ disabled: true }}
            pinch={{ disabled: false }}
            panning={{ disabled: false }}
          >
            <TransformComponent>
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  src={images[currentIndex]}
                  alt={`zoomed-${currentIndex}`}
                  width={1200}
                  height={800}
                  // 👇 Dynamic height depending on zoom state
                  className={`object-contain max-w-full select-none cursor-zoom-in transition-all duration-300 ${
                    zoom ? 'max-h-screen' : 'max-h-[70vh]'
                  }`}
                  priority
                  onClick={handleImageClick}
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
