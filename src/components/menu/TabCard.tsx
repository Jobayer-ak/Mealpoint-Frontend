'use client';
import Image from 'next/image';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { LuEuro } from 'react-icons/lu';

interface ICard {
  name: string;
  srcImage: string;
  description: string;
  price: number;
}

const TabCard = ({ name, srcImage, description, price }: ICard) => {
  console.log(name, srcImage, description, price);
  return (
    <div className="flex justify-between items-center gap-2 md:gap-0  lg:gap-4 shadow-lg group">
      {/*image part  */}
      <div className="w-[100px] md:w-[140px] h-30 md:h-[100px] aspect-4/3 flex-shrink-0 overflow-hidden rounded-s-md relative">
        <Image
          // src={srcImage}
          src="https://tastyc.bslthemes.com/wp-content/uploads/2021/04/gallery-i-2-950x634.jpg"
          alt={name}
          fill
          className="object-cover rounded-s-md cursor-pointer transform transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/*content part  */}

      <div className="flex justify-between items-center flex-grow gap-2">
        {/* left side */}
        <div className="">
          <h3 className="text-[#183136] mb-4 font-bold md:font-extrabold text-xl md:text-2xl">
            {name}
          </h3>
          <p className="text-[#183136] w-full text-left font-light tracking-wider">
            {description}
          </p>
        </div>

        {/* Right side  */}

        <div className="flex flex-col items-center pb-2 px-0 md:px-2 gap-4">
          <div className="inline-flex items-baseline">
            <LuEuro
              className="text-[#adb6b7] flex-shrink-0 translate-y-[3px] "
              aria-hidden="true"
              size={19}
              strokeWidth={3}
            />
            <p className="text-[#183136] font-bold text-xl leading-none">
              {price}
            </p>
          </div>

          <HiOutlineShoppingBag
            size={40}
            className="bg-[#f59d39] rounded-[50%] p-2 transition-all duration-300 hover:bg-[#f0b437] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TabCard;
