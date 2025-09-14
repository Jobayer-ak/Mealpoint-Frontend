'use client';
import BottomShadow from '../Shared/BottomShadow';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';

const desc =
  'Porro eveniet, autem ipsam corrupti consectetur cum. Repudiandae dignissimos fugiat sit nam.';

const SpecialProposal = () => {
  return (
    <div className="w-full min-h-screen bg-white relative pt-7 pb-14 rounded-md ">
      {/* Top shadow */}
      <TopShadow />

      <div className="flex flex-col justify-center items-center gap-8 mt-12">
        <SecHeader
          className=""
          header={'Menu'}
          headerClass="text-[#183136] text-sm mt-5 tracking-wider font-semibold uppercase"
          spanClass={'ms-1'}
        />

        <SecMainHeader
          className="text-[#183136] text-3xl md:text-4xl lg:text-6xl text-center font-extrabold"
          content={'Special proposals'}
        />

        <SecDescription
          className="text-[#183136] w-full md:w-1/2 lg:w-1/4 text-center font-light tracking-wider leading-7"
          content={desc}
        />
      </div>

      <div></div>

      {/* bottom shadow */}
      <BottomShadow />
    </div>
  );
};

export default SpecialProposal;
