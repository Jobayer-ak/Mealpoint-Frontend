'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface SizeSelectorProps {
  /** Current selected size */
  currentSize?: string | null;
  /** Available sizes */
  availableSizes: string[];
  /** Callback when size is selected */
  onSelect: (size: string) => void;
  /** Optional custom width */
  widthClass?: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  currentSize,
  availableSizes,
  onSelect,
  widthClass = 'w-[210px]',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${widthClass}`}>
      {/* Selected box */}
      <div
        className="cursor-pointer text-[#183136] text-md pl-3 pr-2 py-4 shadow-md rounded-sm border border-gray-100 flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>
          {currentSize
            ? currentSize.charAt(0).toUpperCase() + currentSize.slice(1)
            : 'Select size'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full bg-white rounded-sm shadow-md"
          >
            {availableSizes.map((size) => (
              <div
                key={size}
                className={`px-4 py-3 text-[#183136] transition-all duration-100 cursor-pointer ${
                  size === currentSize
                    ? 'bg-amber-400 text-white font-medium'
                    : 'hover:bg-amber-400 hover:text-white'
                }`}
                onClick={() => {
                  onSelect(size);
                  setIsOpen(false);
                }}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SizeSelector;
