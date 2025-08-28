import DarkOverlay from '../Shared/DarkOverlay';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const MobileAppSection = () => {
  return (
    <div className="relative w-full">
      {/* Background image wrapper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/assets/Mobile-App-Section/burger.png')",
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '600px',
        }}
      >
        <DarkOverlay />
      </div>

      {/* Content container - no overlay needed here */}
      <div className="container mx-auto px-18 relative z-10">
        <div className="h-[555px]">
          <div className="width-1/2 h-full pt-20">
            <SecHeader
              header="MOBILE APPLICATION"
              className={'flex gap-3 items-center text-white'}
            />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppSection;
