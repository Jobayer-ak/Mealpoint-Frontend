import ButtonComp from '../ButtonComp';
import HorizontalLine from '../featuresIcons/HorizontalLine';
import SecDescription from '../SecDescription';
import SecHeader from '../SecHeader';
import SecMainHeader from '../SecMainHeader';

const WorkingHours = () => {
  return (
    <>
      {/* Content goes here */}
      <div className="h-[420px] w-full rounded-md relative overflow-hidden mb-20">
        {/* Background image with zoom */}
        <div
          className="absolute inset-0 bg-cover bg-bottom transform scale-102"
          style={{
            backgroundImage: "url('/assets/working-hours/working-hours.jpg')",
          }}
        ></div>
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2025]/40 via-[#0f2025]/50 to-[#0f2025]/10"></div>

        {/* Your content here */}
        <div className="relative z-10 ps-15 pr-5 py-4 flex justify-between h-full items-center">
          <div className="">
            <SecHeader
              header={'ABOUT US'}
              className={'my-8 flex gap-3 font-bold items-center text-white'}
            />
            <SecMainHeader
              className={'text-white text-6xl font-extrabold'}
              content={'Working Hours'}
            />

            <SecDescription
              className="mt-8 text-[#d5f7f2] opacity-[0.9] max-w-lg"
              content={
                'Rolorem, beatae dolorum, praesentium itaque et quam quaerat.'
              }
            />

            <div className="relative inline-block">
              {/* Main Button */}
              <div className="relative z-10">
                <ButtonComp
                  content={'RESERVATION'}
                  className="text-[#112029] tracking-[3px] bg-[#f29e38] py-8 px-10 mt-8 cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
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
          </div>

          {/* working times */}
          <div className="bg-white rounded h-full w-1/3 justify-items-center py-20">
            <div className="text-center text-[#1b2c2d]">
              <p className="tracking-wider font-bold text-md">
                SUNDAY TO TUESDAY
              </p>
              <h4 className=" tracking-wider text-3xl font-extrabold ">
                09 <span className="text-[#f29e38]">:</span> 00
              </h4>
              <h4 className=" tracking-wider text-3xl font-extrabold ">
                22 <span className="text-[#f29e38]">:</span> 00
              </h4>
            </div>

            <div className="mt-10 text-center text-[#1b2c2d]">
              <p className="tracking-wider font-bold text-md">
                FRIDAY TO SATURDAY
              </p>
              <h4 className=" text-3xl font-extrabold tracking-wider">
                09 <span className="text-[#f29e38]">:</span> 00
              </h4>
              <h4 className="text-3xl font-extrabold  tracking-wider">
                22 <span className="text-[#f29e38]">:</span> 00
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Line Separator */}
      <HorizontalLine />
    </>
  );
};

export default WorkingHours;
