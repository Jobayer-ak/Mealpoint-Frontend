import BreadCrumbButton from '../Shared/BreadCrumbButton';
import SecDescription from '../Shared/SecDescription';
import SecMainHeader from '../Shared/SecMainHeader';

const AboutBanner = () => {
  return (
    <div className="h-[70vh] w-full relative overflow-hidden">
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
      <div className="relative z-12 mt-26">
        <div className="px-26 justify-items-center">
          <p className=" text-md text-white uppercase tracking-widest font-semibold">
            About Us
          </p>

          <SecMainHeader
            content="Story of our restaurant"
            className="text-white text-7xl font-extrabold tracking-wider mt-10"
          />

          <SecDescription
            content="Quaerat debitis, vel, sapiente dicta sequi
            labore porro pariatur harum expedita."
            className="mt-10 text-[#b3c2c9] w-1/3 text-center tracking-wider leading-7"
          />

          <div className="mt-8">
            <BreadCrumbButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
