'use client';
import { motion } from 'framer-motion';
import Features from '../homePage/Features';
import NewsLetter from '../homePage/NewsLetter';
import Testimonials from '../homePage/Testimonials';
import BottomShadow from '../Shared/BottomShadow';
import Counters from '../Shared/Counters';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import TopShadow from '../Shared/TopShadow';
import WorkingHours from '../Shared/workingHours/WorkingHours';
import AboutBanner from './AboutBanner';
import AboutVideo from './AboutVideo';
import ReservationSection from './ReservationSection';
import Team from './Team';

const AboutPage = () => {
  return (
    <div className="">
      <AboutBanner />
      <div className="px-2 md:px-8 lg:px-8">
        <div className="bg-white rounded-md relative">
          {/* Top shadow */}
          <TopShadow />

          {/* Shadow for next section */}
          <div className="absolute bg-white w-[80px] h-[90px] rounded-full z-22 top-[-42px] left-1/2 transform -translate-x-1/2">
            <div className="w-[20px] h-[35px] bg-white/10 rounded-xl border-2 border-[#54575a] flex m-auto mt-[14px] relative overflow-hidden">
              {/* Animated dot */}
              <motion.button
                className="absolute w-[4px] h-[4px] bg-[#54575a] rounded-full left-1/2 transform -translate-x-1/2 cursor-pionter"
                initial={{ y: 3 }}
                animate={{ y: [3, 15, 3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 0,
                }}
              />
            </div>
          </div>
          {/* Shadow for the circular div - positioned to show only top half */}
          <div
            className="absolute bg-white/15 rounded-full z-45 left-1/2 transform -translate-x-1/2"
            style={{
              width: '106px',
              height: '106px',
              top: '-53px',
            }}
          ></div>

          <div className="px-2 md:px-6 lg:px-18 pt-12 relative">
            {/* video */}
            <AboutVideo />

            <HorizontalLine />
            {/* Features section */}
            <Features />

            {/* Team */}
            <Team />

            {/* <div className="mt-6"></div> */}
            {/* Working hours */}
            <WorkingHours />

            {/* Counters */}
            <Counters />

            {/* bootm shadow */}
            <BottomShadow />
          </div>
        </div>
      </div>

      {/* Reservation */}
      <ReservationSection />

      <div className="px-2 md:px-8 lg:px-8 rounded-md pb-15 ">
        <div className="relative">
          {/* Top Shadow of section */}
          <TopShadow />

          {/* Testimonials */}
          <Testimonials />

          {/* News Letter */}
          <NewsLetter />

          {/* Bottom shadow */}
          <BottomShadow />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
