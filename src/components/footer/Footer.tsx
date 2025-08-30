import ButtonComp from '../Shared/Button';
import DarkOverlay from '../Shared/DarkOverlay';
import SecDescription from '../Shared/SecDescription';
import SecMainHeader from '../Shared/SecMainHeader';
import SocialMediaGroup from '../ui/SocialMediaGroup';
import FooterSlider from './FooterSlider';

const Footer = () => {
  return (
    <div className="relative w-full px-18 pt-15">
      {/* Dark overlay */}
      <DarkOverlay />

      {/* Main content of Footer */}
      <div>
        {/* social media icos and logo */}
        <div className="mb-16 flex justify-between items-center">
          {/* Logo */}
          <div>
            <h2 className="text-white font-extrabold text-4xl">Meal Point</h2>
          </div>

          {/* social media icons */}
          <div className="">
            <SocialMediaGroup
              links={[
                {
                  platform: 'facebook',
                  href: 'https://facebook.com/yourpage',
                },
                {
                  platform: 'instagram',
                  href: 'https://instagram.com/yourpage',
                },
                {
                  platform: 'linkedin',
                  href: 'https://linkedin.com/company/yourcompany',
                },
                { platform: 'twitter', href: 'https://x.com/yourpage' },
              ]}
              size="md"
              variant="default"
              gap="md"
            />
          </div>
        </div>

        {/* Top hoziontal line */}
        {/* <HorizontalLine /> */}
        <div
          className="h-[6px]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(60,60,60,0.7) 2px, transparent 1.5px)',
            backgroundSize: '10px 10px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat-x',
          }}
        ></div>

        {/* ########################################################### */}
        <div className="flex justify-between gap-8 justify-items-center py-18">
          {/* left side of content */}
          <div className="w-1/3">
            <SecMainHeader
              content="About Us"
              className="text-white text-2xl font-extrabold"
            />
            <SecDescription
              content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita repudiandae neque illum aspernatur fugiat maiores id magni, modi, quaerat vitae. Consectetur adipisicing elit."
              className="mt-6 text-left text-pretty text-[#758589] text-[19px] font-light leading-8"
            />

            <ButtonComp
              content="Read More"
              className="text-[#f29e38] uppercase text-md ps-0 cursor-pointer mt-16 "
            />
          </div>

          {/* Middle content */}
          <div className="w-1/3">
            <SecMainHeader
              content="Contact Info"
              className="text-white text-2xl font-extrabold"
            />
            <div className="flex flex-col gap-5 mt-7">
              <div className="flex justify-between items-center">
                <p className="uppercase text-white text-sm font-semibold tracking-wider">
                  Call :
                </p>

                <p className="text-[#758589] text-right text-xl font-light">
                  +880 1814 005745
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="uppercase text-white text-sm font-semibold tracking-wider">
                  Write Us :
                </p>
                <p className="text-[#758589] text-right text-[19px] font-light">
                  jobayer.ak@gmail.com
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="uppercase text-white text-sm font-semibold tracking-wider">
                  Find Us :
                </p>
                <p className="text-[#758589] text-right text-xl font-light">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <ButtonComp
              content="contact us"
              className="text-[#f29e38] uppercase text-md cursor-pointer mt-11 ps-0"
            />
          </div>

          {/* Right content */}
          <div className="w-1/3">
            <SecMainHeader
              content="Gallery"
              className="text-white text-2xl font-extrabold mb-7"
            />
            <FooterSlider />

            {/* button */}
            <ButtonComp
              content="See More"
              className="text-[#f29e38] uppercase text-md ps-0 cursor-pointer mt-11 "
            />
          </div>
        </div>

        {/* Bottom horizontal line */}
        <div
          className="h-[6px]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(60,60,60,0.7) 2px, transparent 1.5px)',
            backgroundSize: '10px 10px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat-x',
          }}
        ></div>

        {/* copy right */}
        <div className="flex justify-between items-center my-12">
          <p className="text-[#758589] text-right text-md font-light">
            <span className="text-2xl align-middle">&copy;</span> Meal Point
            2025 . All rights reserved. Design by
            <span className="text-[#f29e38]">Md. Jobayer Akanda</span>
          </p>

          <ButtonComp
            content="Back To Top"
            className="text-[#f29e38] uppercase text-md pr-0 cursor-pointer"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;
