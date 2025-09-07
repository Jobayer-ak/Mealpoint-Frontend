'use client';
import { motion } from 'framer-motion';
import ButtonComp from '../Shared/ButtonComp';
import DarkOverlay from '../Shared/DarkOverlay';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const ReservationSection = () => {
  return (
    <div className="relative w-full mb-0">
      {/* Background image wrapper */}
      <div
        className="absolute inset-0 right-20"
        style={{
          backgroundImage: "url('/assets/about/reserved.png')",
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '615px',
        }}
      >
        <DarkOverlay />
      </div>

      {/* Content container - no overlay needed here */}
      <div className="container mx-auto px-18 relative z-10">
        <div className="h-[610px]">
          <div className="width-1/2 h-full pt-24 ">
            <SecHeader
              header="Reservation"
              className={'uppercase flex gap-3 items-center text-white'}
              spanClass=""
            />

            <div className="mt-8"></div>

            <motion.div
              initial={{ opacity: 0, y: 50 }} // start hidden, below
              whileInView={{ opacity: 1, y: 0 }} // animate when in viewport
              viewport={{ once: true, amount: 0.5 }} // triggers only once, when 50% visible
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <SecMainHeader
                content={
                  <>
                    This Evening
                    <br />
                    Will Be Great!
                  </>
                }
                className="text-white text-7xl font-extrabold"
              />
            </motion.div>
            <SecDescription
              className="text-[#a0acb0] mt-12 w-1/3 font-light"
              content="Quaerat debitis, vel, sapiente dicta sequi labore porro pariatur harum expedita."
            />

            <div className="relative inline-block">
              {/* Main Button */}
              <div className="relative z-10">
                <ButtonComp
                  content="Reservation"
                  className="uppercase text-[#112029] tracking-[2px] font-semibold bg-[#f29e38] py-8 px-8 mt-8 cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-1"
                />
              </div>

              {/* Single bottom shadow layer - 4px height, narrower width, white transparent */}
              <div
                className="absolute bottom-1 left-[9px] bg-white/10 rounded-sm z-0"
                style={{
                  width: 'calc(100% - 20px)',
                  height: '12px',
                  transform: 'translateY(12px)',
                }}
              ></div>
            </div>

            <div className="inline-block ms-4">
              <ButtonComp
                className="uppercase text-white font-semibold tracking-wider cursor-pointer"
                content={'Get In Touch'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSection;
