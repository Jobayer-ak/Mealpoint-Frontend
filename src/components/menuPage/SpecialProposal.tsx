'use client';
import BottomShadow from '../Shared/BottomShadow';
import ButtonComp from '../Shared/ButtonComp';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import SpecialSlider from './SpecialSlider';

const desc =
  'Porro eveniet, autem ipsam corrupti consectetur cum. Repudiandae dignissimos fugiat sit nam.';

const SpecialProposal = () => {
  return (
    <div className="w-full h-auto bg-white relative py-7 pb-14 rounded-md px-2 md:px-14">
      {/* Top shadow */}
      <TopShadow />

      <div className="flex flex-col justify-center items-center gap-8 mt-12">
        <SecHeader
          className=""
          header={'Menu'}
          headerClass="text-[#183136] text-sm mt-5 tracking-widest font-semibold uppercase"
          spanClass={'ms-1'}
        />

        <SecMainHeader
          className="text-[#183136] text-3xl md:text-4xl lg:text-6xl text-center font-extrabold"
          content={'Special proposals'}
        />

        <SecDescription
          className="text-[#183136] w-full md:w-1/2 lg:w-1/3 text-center font-light tracking-wider leading-7"
          content={desc}
        />
      </div>

      {/* slider */}
      <div className="w-full">
        <SpecialSlider />

        <div className=" flex justify-between items-center">
          <ButtonComp
            className="uppercase bg-[#f39e39] text-wide px-7 py-7"
            content="All Products"
          />

          <div className="md:w-2/4 lg:w-2/5 md:jus-items-start lg:justify-items-center items-center hidden md:block  ">
            <p className="text-sm font-semibold tracking-wider uppercase">
              Slider Navigation
            </p>
          </div>
        </div>
      </div>

      {/* bottom shadow */}
      <BottomShadow />
    </div>
  );
};

export default SpecialProposal;
