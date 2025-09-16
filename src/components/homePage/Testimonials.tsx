import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import TestimonialSlider from './TestimonialSlider';

const Testimonials = () => {
  const description =
    'Porro eveniet, autem ipsam corrupti consectetur cum. Repudiandae dignissimos fugiat sit nam';

  return (
    <div className="relative bg-white px-3 lg:px-19 py-15 rounded-t-md w-full min-h-screen">
      {/* box shadow top of component */}
      <TopShadow />

      <div className="">
        <div className="mb-14">
          {/* section header */}
          <div className="flex flex-col gap-6 justify-center items-center">
            <SecHeader
              header={'TESTIMONIALS'}
              className={'items-center'}
              headerClass={'mt-6 font-bold tracking-[4px] text-[#19302d]'}
              spanClass="ms-15"
            />
            <SecMainHeader
              className="text-4xl md:text-5xl text-[#19302d] font-extrabold"
              content="What Our Visitors Say"
            />
            <SecDescription
              content={description}
              className="text-[#19302d] w-full md:w-1/2 lg:w-1/3 text-center"
            />
          </div>

          {/* testimonial slider */}
          <div className="mt-3">
            <TestimonialSlider />
          </div>
        </div>

        {/* subtle dotted line */}
        <HorizontalLine />
      </div>
    </div>
  );
};

export default Testimonials;
