'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ButtonComp from '../Shared/ButtonComp';
import DarkOverlay from '../Shared/DarkOverlay';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const GoodOffer = () => {
  return (
    <div className="relative w-full">
      <DarkOverlay />

      {/* Container */}
      <div className="container mx-auto px-6 lg:px-18 relative z-10 flex flex-col lg:flex-row items-center lg:items-start">
        {/* Content Section */}
        <div className="w-full lg:w-1/2 h-full pt-12 lg:pt-24 text-center lg:text-left flex flex-col items-center lg:items-start">
          <SecHeader
            header="Good Offer"
            className="uppercase flex flex-col items-center gap-6 md:flex-row md:items-center  md:gap-3 text-white tracking-wide"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-6"
          >
            <SecMainHeader
              content={
                <>
                  Pay for one
                  <br />
                  Get two!
                </>
              }
              className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold"
            />
          </motion.div>

          <SecDescription
            className="text-[#a0acb0] mt-6 w-1/3 md:w-1/2 lg:w-full text-center lg:text-left"
            content="Quaerat debitis, vel, sapiente dicta sequi labore porro pariatur harum expedita."
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-6 items-center lg:items-start">
            {/* Reservation */}
            <div className="relative inline-block">
              <ButtonComp
                content="Reservation"
                className="uppercase text-[#112029] tracking-[2px] font-semibold bg-[#f29e38] py-8 px-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-1"
              />

              <div
                className="absolute bottom-1 left-[4px] bg-white/10 rounded-sm"
                style={{
                  width: 'calc(100% - 8px)',
                  height: '12px',
                  transform: 'translateY(12px)',
                }}
              />
            </div>

            {/* Good Offer */}
            <div className="relative inline-block">
              <ButtonComp
                content="Get Now"
                className="uppercase text-white tracking-[2px] font-semibold py-8 px-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-1"
              />
            </div>
          </div>
        </div>

        {/* Burger Image Section */}
        <div className="w-full lg:w-1/2 relative mt-0 md:mt-7 lg:mt-[-7]">
          {/* Large screen image */}
          <div className="hidden lg:block relative w-full h-[610px]">
            <Image
              src="/assets/Mobile-App-Section/burger.png"
              alt="Burger App"
              fill
              style={{ objectFit: 'contain', objectPosition: 'right' }}
              priority
            />
          </div>

          {/* Small screen image - larger */}
          <div className="block lg:hidden relative w-full h-[500px] sm:h-[780px]">
            <Image
              src="/assets/Mobile-App-Section/burger.png"
              alt="Burger App"
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodOffer;
