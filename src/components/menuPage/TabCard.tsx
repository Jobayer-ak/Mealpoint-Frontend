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
  return (
    <div className="flex justify-between items-center  gap-8 shadow-lg group">
      <div className=" w-[160px] h-[140px] overflow-hidden rounded-s-md relative">
        <Image
          src={srcImage}
          alt={name}
          fill // <---- THIS makes the image fill the parent box
          className="object-cover rounded-s-md cursor-pointer transform transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex justify-between items-center gap-4 ">
        <div>
          <h3 className="text-[#183136] mb-4 font-extrabold text-2xl">
            {name}
          </h3>
          <p className="text-[#183136] w-full text-left font-light tracking-wider leading-6">
            {description}
          </p>
        </div>

        <div className="flex flex-col pb-2 justify-items-center gap-4 items-center w-1/3">
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
