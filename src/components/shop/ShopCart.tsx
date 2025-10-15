/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { LuEuro } from 'react-icons/lu';

interface Variation {
  size: string;
  price: number;
}

interface IShopCart {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  basePrice?: number;
  hasVariants: boolean;
  variations?: Variation[];
}

const ShopCart: React.FC<IShopCart> = ({
  id,
  name,
  slug,
  image,
  description,
  basePrice,
  hasVariants,
  variations = [],
}) => {
  // Determine price display
  const priceDisplay =
    hasVariants && variations.length > 0
      ? `${Math.min(...variations.map((v) => v.price))} - ${Math.max(
          ...variations.map((v) => v.price)
        )}`
      : basePrice ?? 0;

  return (
    <div className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <Link href={`/product/${slug}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="w-full h-[260px] overflow-hidden relative rounded-t-sm">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover cursor-pointer transform transition-transform duration-500 ease-out hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 px-8 py-4">
          {/* Top content */}
          <div>
            <h3 className="text-[#183136] mb-2 font-extrabold text-xl md:text-2xl">
              {name}
            </h3>
          </div>

          {/* Horizontal line */}
          <div className="my-4 border-b-2 border-dotted border-gray-300" />

          {/* Bottom content */}
          <div className="flex justify-between items-center py-3">
            <div className="inline-flex items-baseline">
              <LuEuro
                className="text-[#adb6b7] flex-shrink-0 translate-y-[2px]"
                aria-hidden="true"
                size={19}
                strokeWidth={3}
              />
              <p className="text-[#183136] font-bold text-xl leading-none ml-1">
                {priceDisplay}
              </p>
            </div>

            <HiOutlineShoppingBag
              size={40}
              className="bg-[#f59d39] rounded-sm p-2 transition-all duration-300 hover:bg-[#f0b437] cursor-pointer"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShopCart;
