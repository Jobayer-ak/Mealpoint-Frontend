'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Container from '../container/Container';
import BottomShadow from '../Shared/BottomShadow';
import BreadCrumbButton from '../Shared/BreadCrumbButton';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import ContactIcons from './ContactIcons';
import WriteMessage from './WriteMessage';

const description = 'Porro eveniet, autem ipsam vitae consequatur!';

const ContactInfo = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  return (
    <div>
      <Container>
        <div className="relative min-h-screen px-14 pt-14  pb-12 bg-white rounded-md">
          <TopShadow />

          {/* Shadow for next section */}
          <div className="absolute bg-white w-[80px] h-[90px] rounded-full z-22 top-[-42px] left-1/2 transform -translate-x-1/2">
            <div className="w-[20px] h-[35px] bg-white/10 rounded-xl border-2 border-[#54575a] flex m-auto mt-[14px] relative overflow-hidden">
              {/* Animated dot */}
              {mounted && (
                <motion.button
                  className="absolute w-[4px] h-[4px] bg-[#54575a] rounded-full left-1/2 transform -translate-x-1/2 cursor-pointer"
                  initial={{ y: 3 }}
                  animate={{ y: [3, 15, 3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 0.5,
                  }}
                />
              )}
            </div>
          </div>
          {/* Shadow for the circular div - positioned to show only top half */}
          <div
            className="absolute bg-white/15 rounded-full z-30 left-1/2 transform -translate-x-1/2"
            style={{
              width: '106px',
              height: '106px',
              top: '-53px',
            }}
          ></div>

          {/* content */}
          <div>
            <div className="w-full h-100 flex flex-col justify-center items-center gap-10 mb-15">
              <SecHeader
                className=""
                header="Contact"
                headerClass="uppercase text-[#183136] mt-6 tracking-widest font-semibold"
                spanClass="ms-6"
              />

              <SecMainHeader
                className="text-[#183136] text-5xl md:text-6xl lg:text-7xl text-center font-extrabold tracking-wider "
                content={'Contact Information'}
              />

              <SecDescription
                className="text-[#183136] w-full md:w-1/2 lg:w-1/3 px-0 text-center tracking-wider leading-7"
                content={description}
              />

              <div className="">
                <BreadCrumbButton />
              </div>
            </div>

            <ContactIcons />

            {/* Horizontal line */}
            <HorizontalLine />
          </div>

          {/* Write message  */}
          <WriteMessage />

          {/* Bottom Shadow */}
          <BottomShadow />
        </div>
      </Container>
    </div>
  );
};

export default ContactInfo;
