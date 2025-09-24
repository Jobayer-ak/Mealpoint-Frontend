import Image from 'next/image';
import SecDescription from '../Shared/SecDescription';
import SecMainHeader from '../Shared/SecMainHeader';

const description = 'Consectetur adipisicing elit. Soluta impedit, saepe';
const SummaryItem = () => {
  return (
    <div className="bg-white mb-6 ">
      <div className="flex justify-between items-start gap-4 mb-2 px-2">
        {/* image */}
        <div className="relative w-20 h-15 ">
          <Image
            src={'/assets/menu/juices.webp'}
            alt="image"
            fill
            className="object-cover rounded-sm"
          />

          <div className="w-6 h-6 text-[#183136] text-center bg-white rounded-full border-1 border-gray-400 absolute right-[-4] top-[-6]">
            1
          </div>
        </div>

        {/* details with quantity */}
        <div className="flex flex-col gap-2">
          <SecMainHeader
            className="text-[#183136] text-xl  text-left tracking-wider font-extrabold lg:font-light"
            content={'Juice'}
          />

          <div className="flex justify-start gap-3">
            <div className="flex items-baseline font-bold lg:font-light">
              <del className="inline-flex items-baseline text-[#adb6b7]">
                <span className="text-xl">$</span>
                <span className=" text-xl">10.00</span>
              </del>
            </div>

            <p className="text-[#183136] text-xl  text-left font-bold lg:font-light">
              $10.00
            </p>
          </div>

          <SecDescription
            className="text-[#183136] text-md font-light tracking-wider"
            content={description}
          />
        </div>

        {/* price */}
        <div className="text-right items-start">
          <p className="inline-flex items-baseline text-[#183136]">
            <span className="text-xl">$</span>
            <span className=" text-xl">10.00</span>
          </p>
        </div>
      </div>

      {/* horizontal line */}
    </div>
  );
};

export default SummaryItem;
