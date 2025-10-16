import Image from 'next/image';
import { LuEuro } from 'react-icons/lu';
import { PiShoppingCartDuotone } from 'react-icons/pi';
import { Button } from '../ui/button';

interface ICard {
  name: string;
  srcImage: string;
  description?: string;
  price: number;
}

const RelatedProductCard = ({ name, srcImage, description, price }: ICard) => {
  return (
    <div className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* image part */}
      <div className="w-full md:w-[360px] h-[280px] overflow-hidden relative rounded-t-sm">
        <Image
          src={srcImage}
          alt={name}
          fill
          className="object-cover cursor-pointer transform transition-transform duration-500 ease-out hover:scale-110"
        />

        <Button
          className="absolute bg-[#f99d3a] uppercase top-4 left-4 tracking-widest rounded-sm text-xs font-semibold"
          size="sm"
        >
          Sale!
        </Button>
      </div>

      {/* content part */}
      <div className="flex flex-col justify-between flex-1 px-4 py-4">
        {/* top content */}
        <div>
          <h3 className="text-[#183136] mb-2 font-extrabold text-xl md:text-2xl">
            {name}
          </h3>
          <p className="text-[#183136] w-full text-left font-light tracking-wider leading-6">
            {description}
          </p>
        </div>

        {/* horizontal line */}
        <div className="my-4 border-b-2 border-dotted border-gray-300" />

        {/* bottom content */}
        <div className="flex justify-between items-center py-3">
          <div>
            {/* previous price */}
            <div>
              <div className="flex items-baseline">
                <del className="inline-flex items-baseline text-[#adb6b7]">
                  <span className="text-xl">$</span>
                  <span className=" text-xl">{price}.00</span>
                </del>
              </div>
            </div>

            {/* current price */}
            <div className="inline-flex items-baseline">
              <LuEuro
                className="text-[#adb6b7] flex-shrink-0 translate-y-[2px]"
                aria-hidden="true"
                size={19}
                strokeWidth={3}
              />
              <p className="text-[#183136] font-bold text-xl leading-none ml-1">
                {price}
              </p>
            </div>
          </div>

          <PiShoppingCartDuotone
            size={40}
            className="bg-[#f59d39] w-12 h-12 rounded-sm fill-black p-2 transition-all duration-300 hover:bg-[#f0b437] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default RelatedProductCard;
