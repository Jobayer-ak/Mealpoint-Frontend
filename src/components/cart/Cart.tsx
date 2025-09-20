import Image from 'next/image';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import SecDescription from '../Shared/SecDescription';
import SecMainHeader from '../Shared/SecMainHeader';

const description = 'Consectetur adipisicing elit. Soluta impedit, saepe';
const Cart = () => {
  return (
    <div className="bg-white ">
      <div className="flex justify-between gap-4 mb-2">
        {/* image */}
        <div className="relative w-40 h-30 ">
          <Image
            src={'/assets/menu/juices.webp'}
            alt="image"
            fill
            className="object-cover rounded-sm"
          />
        </div>

        {/* details with quantity */}
        <div className="flex flex-col gap-4">
          <SecMainHeader
            className="text-[#183136] text-2xl  text-left tracking-wider font-extrabold"
            content={'Juice'}
          />

          <div className="flex justify-start gap-3">
            <div className="flex items-baseline font-bold">
              <del className="inline-flex items-baseline text-[#adb6b7]">
                <span className="text-xl">$</span>
                <span className=" text-xl">10.00</span>
              </del>
            </div>

            <p className="text-[#183136] text-xl  text-left font-bold">
              $10.00
            </p>
          </div>

          <button className="border-1 border-[#f99d3a] rounded-sm text-xs font-semibold text-[#f99d3a] w-[80px] py-0.5">
            Save $ 5.00
          </button>

          <SecDescription
            className="text-[#183136] text-sm tracking-wider"
            content={description}
          />

          {/* increment and decrement buttons */}
          <div className="border-1 border-gray-200 rounded-sm flex justify-between items-center gap-2 w-2/6 px-2 py-3">
            <button className="cursor-pointer">
              <AiOutlineMinus />
            </button>
            <h5 className="text-[#183136] text-md tracking-wider font-semibold leading-0">
              12
            </h5>
            <button className="cursor-pointer">
              <AiOutlinePlus />
            </button>
          </div>

          {/* Remvoe item */}
          <div className="flex justify-start items-center gap-2">
            <button className="bg-red-600 rounded-full p-1 cursor-pointer">
              <AiOutlineDelete size={8} className="fill-white w-5 h-5" />
            </button>
            <p className="text-[#183136] text-xs tracking-wider underline transition-all duration-300 ease-in-out hover:no-underline">
              Remove Item
            </p>
          </div>
        </div>

        {/* price */}
        <div className="text-right">
          <h5 className="text-[#183136] text-xl  text-right font-extrabold pt-2">
            $10.00
          </h5>
          <button className="border-1 border-[#f99d3a] rounded-sm text-xs font-semibold text-[#f99d3a] w-[80px] py-1 mt-3">
            Save $ 5.00
          </button>
        </div>
      </div>

      {/* horizontal line */}
    </div>
  );
};

export default Cart;
