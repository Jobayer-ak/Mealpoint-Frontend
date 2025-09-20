'use client';

import { cn } from '@/lib/utils'; // shadcn utility for class merging
import { Star } from 'lucide-react';
import { useState } from 'react';

export function StarRating({
  max = 5,
  onChange,
}: {
  max?: number;
  onChange?: (value: number) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: max }, (_, i) => {
        const value = i + 1;
        return (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <Star
              className={cn(
                'w-5 h-5 transition-colors',
                value <= (hover || rating)
                  ? 'fill-[#f99d3a] text-[#f99d3a]'
                  : 'text-[#f99d3a]'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
