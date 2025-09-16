import BreadCrumbButton from '../Shared/BreadCrumbButton';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const MenuBanner = () => {
  const description =
    'Quaerat debitis, vel, sapiente dicta sequi labore porro pariatur harum expedita.';

  return (
    <div className="relative ">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0f2025]/20 via-[#0f2025]/10 to-[#0f2025]/10"></div>

      <div className="w-full h-100 flex flex-col justify-center items-center gap-10 mt-22 md:mt-14 lg:mt-22">
        <SecHeader
          className=""
          header="Menu"
          headerClass="uppercase text-white mt-6 tracking-wider font-semibold tracking-widest"
          spanClass="ms-2"
        />

        <SecMainHeader
          className="text-white text-5xl md:text-6xl lg:text-7xl text-center font-extrabold tracking-wider "
          content={'Discover Our menu'}
        />

        <SecDescription
          className="text-[#b3c2c9] w-full md:w-1/2 lg:w-1/4 text-center tracking-wider leading-7"
          content={description}
        />

        <div className="">
          <BreadCrumbButton />
        </div>
      </div>
    </div>
  );
};

export default MenuBanner;
