'use client';

import Container from '../../../../components/container/Container';
import Product from '../../../../components/products/Products';
import BreadCrumbButton from '../../../../components/Shared/BreadCrumbButton';
import DarkOverlay from '../../../../components/Shared/DarkOverlay';
import SecDescription from '../../../../components/Shared/SecDescription';
import SecHeader from '../../../../components/Shared/SecHeader';
import SecMainHeader from '../../../../components/Shared/SecMainHeader';

const description =
  'Quaerat debitis, vel, sapiente dicta sequi labore porro pariatur harum expedita.';

const page = () => {
  return (
    <div className="relative">
      <DarkOverlay />
      <Container>
        <div>
          <div className="w-full h-100 flex flex-col justify-center items-center gap-10 mt-22 md:mt-14 lg:mt-22">
            <SecHeader
              className=""
              header="Online Store"
              headerClass="uppercase text-white mt-6 tracking-wider font-semibold tracking-widest"
              spanClass="ms-12"
            />

            <SecMainHeader
              className="text-white text-5xl md:text-6xl lg:text-7xl text-center font-extrabold tracking-wider "
              content={'Shop'}
            />

            <SecDescription
              className="text-[#b3c2c9] w-full md:w-1/2 lg:w-1/3 px-8 text-center tracking-wider leading-7"
              content={description}
            />

            <div className="">
              <BreadCrumbButton />
            </div>
          </div>
        </div>

        {/* single product */}
        <Product />
      </Container>
    </div>
  );
};

export default page;
