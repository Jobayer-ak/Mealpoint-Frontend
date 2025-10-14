'use client';
import Image from 'next/image';
import Link from 'next/link';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { LuEuro } from 'react-icons/lu';
import { IVariation } from '../../redux/features/menu/MenuTypes';

interface ICard {
  id: string;
  shortId: string;
  name: string;
  slug: string;
  srcImage: string;
  description: string;
  basePrice?: number | undefined;
  hasVariants: boolean;
  variations?: IVariation[];
}

const TabCard = ({
  name,
  slug,
  srcImage,
  description,
  basePrice,
  hasVariants,
  variations,
}: ICard) => {
  return (
    <div className="flex justify-between items-center gap-2 md:gap-0  lg:gap-4 shadow-lg group">
      {/*image part  */}
      <div className="w-[100px] md:w-[140px] h-30 md:h-[100px] aspect-4/3 flex-shrink-0 overflow-hidden rounded-s-md relative">
        <Image
          // src={srcImage}
          src={srcImage}
          alt={name}
          fill
          className="object-cover rounded-s-md cursor-pointer transform transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/*content part  */}

      <div className="flex justify-between items-center flex-grow gap-2">
        {/* left side */}
        <div className="">
          <Link
            href={`/product/${slug}`}
            className="text-[#183136] mb-4 font-bold md:font-extrabold text-xl md:text-2xl"
          >
            {name}
          </Link>
          <p className="text-[#183136] w-full text-left font-light tracking-wider">
            {description}
          </p>
        </div>

        {/* Right side  */}

        <div className="flex flex-col items-end pb-2 px-0 md:px-2 gap-4">
          <div className="inline-flex items-baseline text-[#183136] font-normal text-xl leading-none">
            {!hasVariants || !variations?.length ? (
              // Single price
              <>
                <LuEuro
                  className="text-[#adb6b7] flex-shrink-0 translate-y-[3px]"
                  aria-hidden="true"
                  size={19}
                  strokeWidth={3}
                />
                <span>{basePrice}</span>
              </>
            ) : (
              // Price range: first and last price only
              <>
                <LuEuro
                  className="text-[#adb6b7] flex-shrink-0 translate-y-[2px]"
                  aria-hidden="true"
                  size={19}
                  strokeWidth={3}
                />
                <span>
                  {variations[0].price}
                  {variations.length > 1 && (
                    <div className="inline-flex items-center">
                      <span className="mx-1">–</span>
                      <LuEuro
                        className="text-[#adb6b7] flex-shrink-0 translate-y-[-2px]"
                        aria-hidden="true"
                        size={19}
                        strokeWidth={3}
                      />
                      <span className="">
                        {variations[variations.length - 1].price}
                      </span>
                    </div>
                  )}
                </span>
              </>
            )}
          </div>

          <Link href={`/product/${slug}`}>
            <LiaShoppingBagSolid
              size={40}
              className="bg-[#f59d39] text-[#183136] rounded-[50%] p-2 transition-all duration-300 hover:bg-[#f0b437] cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TabCard;
