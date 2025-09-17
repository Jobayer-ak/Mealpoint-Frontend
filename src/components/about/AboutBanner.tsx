import BreadCrumbButton from '../Shared/BreadCrumbButton';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const AboutBanner = () => {
  // const { width, height } = useWindowSize();
  return (
    <div className="h-[60vh] lg:h-[80vh] w-full relative overflow-hidden">
      <div></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/assets/about/about-banner.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',

          backgroundPosition: 'center 47%',
        }}
      ></div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0f2025]/70 via-[#0f2025]/50 to-[#0f2025]/10"></div>

      {/* content of banner */}
      <div className="relative z-12 mt-30">
        <div className="px-2 md:px-26 flex flex-col gap-6 justify-center items-center">
          <SecHeader
            header={'About Us'}
            className={'items-center uppercase'}
            headerClass={'mt-4 font-bold text-white tracking-wider'}
            spanClass="ms-6"
          />

          <SecMainHeader
            content="Story of our restaurant"
            className="text-white text-5xl md:text-6xl lg:text-7xl text-center font-extrabold tracking-wider"
          />

          <SecDescription
            content="Quaerat debitis, vel, sapiente dicta sequi
            labore porro pariatur harum expedita."
            className=" text-[#b3c2c9] w-full md:w-1/3 text-center tracking-wider leading-7"
          />

          <div className="">
            <BreadCrumbButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
