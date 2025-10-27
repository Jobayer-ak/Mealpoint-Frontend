/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import SecMainHeader from '../Shared/SecMainHeader';

interface IItem {
  id: string;
  _id?: string;
  name: string;
  image: string;
  quantity: number;
  description: string;
  hasVariants: boolean;
  size?: string | null;
  price: number;
  totalPrice: number;
}

// const description = 'Consectetur adipisicing elit. Soluta impedit, saepe';
const SummaryItem = ({
  id,
  _id,
  name,
  image,
  quantity,
  description,
  hasVariants,
  size,
  price,
  totalPrice,
}: IItem) => {
  return (
    <div className="bg-white mb-6 ">
      <div className="flex justify-between gap-4 mb-2 px-2">
        <div className="flex justify-start items-center gap-6">
          {/* image */}

          <div className="relative w-20 h-15 ">
            <Image
              src={image}
              alt="image"
              fill
              className="object-cover rounded-sm"
            />

            <div className="w-6 h-6 text-[#183136] text-center bg-white rounded-full border-1 border-gray-400 absolute right-[-4] top-[-6]">
              {quantity}
            </div>
          </div>

          {/* details with quantity */}
          <div className="flex flex-col gap-1">
            <SecMainHeader
              className="text-[#183136] text-md  text-left tracking-wider font-light"
              content={name}
            />

            <div className="flex justify-start gap-3">
              <p className="text-[#183136] text-md  text-left font-semibold">
                ${price}
              </p>
            </div>

            {size && (
              <p className="text-[#183136] text-md  text-left font-semibold">
                size: {size}
              </p>
            )}
          </div>
        </div>

        {/* price */}
        <div className="text-right items-start">
          <p className="inline-flex items-baseline text-[#183136]">
            <span className="text-lg">$</span>
            <span className=" text-lg">{totalPrice}</span>
          </p>
        </div>
      </div>

      {/* horizontal line */}
    </div>
  );
};

export default SummaryItem;
