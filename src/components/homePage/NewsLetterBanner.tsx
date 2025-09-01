import ButtonComp from '../Shared/ButtonComp';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const NewsLetterBanner = () => {
  return (
    <div className="h-[447px] w-full rounded-md relative overflow-hidden mt-15 mb-10">
      <div
        className="absolute inset-0 bg-cover bg-bottom transform scale-102"
        style={{
          backgroundImage: "url('/assets/news-letter-images/gallery-i-6.jpg')",
        }}
      ></div>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f2025]/40 via-[#0f2025]/50 to-[#0f2025]/10"></div>

      {/* Content */}
      <div className="relative z-10 justify-items-center mt-8 text-center">
        <SecHeader
          header={'NEWS LETTER'}
          className={'mt-10 font-bold items-center text-white'}
          spanClass="ms-9 mb-6"
        />
        <SecMainHeader
          className={'text-white text-6xl font-extrabold mt-6'}
          content={'Subscribe our news letter'}
        />
        <SecDescription
          className="mt-9 text-[#d5f7f2] opacity-[0.9] max-w-lg mx-auto"
          content={
            'Rolorem, beatae dolorum, praesentium itaque et quam quaerat.'
          }
        />

        {/* Input + Button row */}
        <form className="mt-14 flex justify-center items-center gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-[3] px-4 py-3 rounded-md border-0 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#f29e38]"
          />

          <div className="relative">
            <ButtonComp
              content={'SUBSCRIBE'}
              className="rounded-r-md py-6 px-6 bg-[#f29e38] text-[#112029] font-semibold tracking-[2px] cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
            />
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
        </form>
      </div>
    </div>
  );
};

export default NewsLetterBanner;
