'use client';
import { motion } from 'framer-motion';
import { FaApple, FaGoogle } from 'react-icons/fa';
import ButtonComp from '../Shared/Button';
import DarkOverlay from '../Shared/DarkOverlay';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const MobileAppSection = () => {
  return (
    <div className="relative w-full">
      {/* Background image wrapper */}
      <div
        className="absolute inset-0 right-20"
        style={{
          backgroundImage: "url('/assets/Mobile-App-Section/burger.png')",
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
              header="MOBILE APPLICATION"
              className={'flex gap-3 items-center text-white'}
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
                    Download
                    <br />
                    our application
                  </>
                }
                className="text-white text-7xl font-extrabold"
              />
            </motion.div>
            <SecDescription
              className="text-[#a0acb0] mt-12 w-1/3"
              content="Quaerat debitis, vel, sapiente dicta sequi labore porro pariatur harum expedita.

"
            />

            <div className="relative inline-block">
              {/* Main Button */}
              <div className="relative z-10">
                <ButtonComp
                  content="APP STORE"
                  // icon={
                  //   <div
                  //     style={{
                  //       backgroundImage: "url('/assets/icons/apple-icon.svg')",
                  //       width: '20px',
                  //       height: '20px',
                  //       backgroundSize: 'cover',
                  //       marginRight: '4px',
                  //       marginBottom: '6px',
                  //       fill: '#1b2e3c',
                  //     }}
                  //     // className="item-center"
                  //     // fill="currentColor"
                  //   ></div>
                  // }
                  className="text-[#112029] tracking-[2px] font-semibold bg-[#f29e38] py-8 px-14 mt-8 cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-1"
                />

                <FaApple
                  size={21}
                  className="absolute bottom-[26px] left-7 text-[#0e2028]"
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

            <motion.div
              className="relative inline-block ms-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Main Button */}
              <div className="relative z-10">
                <ButtonComp
                  content={'PLAY MARKET'}
                  className="text-[#112029] font-semibold tracking-[2px] bg-[#f29e38] py-8 px-14 mt-8 cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
                />
                <FaGoogle
                  size={19}
                  className="absolute bottom-[24px] left-7 text-[#0e2028]"
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppSection;
