/* eslint-disable react/jsx-key */
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import UserInfo from '../Shared/testimonial/UserInfo';
import TestimonialSlider from './TestimonialSlider';

const Testimonials = () => {
  const description =
    'Porro eveniet, autem ipsam corrupti consectetur cum. Repudiandae dignissimos fugiat sit nam';

  const items = [
    <div
      className="min-h-[460px] px-10  py-6 rounded-md shadow text-center bor"
      style={{
        border: '2px dotted rgba(26, 47, 51, 0.2)',
      }}
    >
      <h3 className="text-black text-2xl text-left font-extrabold mb-8">
        Heading for all
      </h3>
      <p className="text-pretty text-left mb-4 leading-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
        ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      </p>

      {/* <HorizontalLine /> */}
      <div
        className="mt-4"
        style={{
          borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
          width: '100%',
        }}
      ></div>

      {/* user info */}
      <UserInfo
        imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
        name="John Doe"
        date="29.08.2025"
        className="mt-4"
      />
    </div>,

    <div
      className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
      style={{
        border: '2px dotted rgba(26, 47, 51, 0.2)',
      }}
    >
      <h3 className="text-black text-2xl text-left font-extrabold mb-8">
        Heading for all
      </h3>
      <p className="text-pretty text-left mb-4 leading-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
        ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      </p>

      {/* <HorizontalLine /> */}
      <div
        className="mt-4"
        style={{
          borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
          width: '100%',
        }}
      ></div>

      {/* user info */}
      <UserInfo
        imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
        name="John Doe"
        date="29.08.2025"
        className="mt-4"
      />
    </div>,
    <div
      className="w-auto h-[460px] px-10  py-6 rounded-md shadow text-center bor"
      style={{
        border: '2px dotted rgba(26, 47, 51, 0.2)',
      }}
    >
      <h3 className="text-black text-2xl text-left font-extrabold mb-8">
        Heading for all
      </h3>
      <p className="text-pretty text-left mb-4 leading-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
        ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      </p>

      {/* <HorizontalLine /> */}
      <div
        className="mt-4"
        style={{
          borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
          width: '100%',
        }}
      ></div>

      {/* user info */}
      <UserInfo
        imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
        name="John Doe"
        date="29.08.2025"
        className="mt-4"
      />
    </div>,
    <div
      className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
      style={{
        border: '2px dotted rgba(26, 47, 51, 0.2)',
      }}
    >
      <h3 className="text-black text-2xl text-left font-extrabold mb-8">
        Heading for all
      </h3>
      <p className="text-pretty text-left mb-4 leading-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
        ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      </p>

      {/* <HorizontalLine /> */}
      <div
        className="mt-4"
        style={{
          borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
          width: '100%',
        }}
      ></div>

      {/* user info */}
      <UserInfo
        imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
        name="John Doe"
        date="29.08.2025"
        className="mt-4"
      />
    </div>,

    <div
      className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
      style={{
        border: '2px dotted rgba(26, 47, 51, 0.2)',
      }}
    >
      <h3 className="text-black text-2xl text-left font-extrabold mb-8">
        Heading for all
      </h3>
      <p className="text-pretty text-left mb-4 leading-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
        ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      </p>

      {/* <HorizontalLine /> */}
      <div
        className="mt-4"
        style={{
          borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
          width: '100%',
        }}
      ></div>

      {/* user info */}
      <UserInfo
        imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
        name="John Doe"
        date="29.08.2025"
        className="mt-4"
      />
    </div>,
    <div
      className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
      style={{
        border: '2px dotted rgba(26, 47, 51, 0.2)',
      }}
    >
      <h3 className="text-black text-2xl text-left font-extrabold mb-8">
        Heading for all
      </h3>
      <p className="text-pretty text-left mb-4 leading-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
        ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      </p>

      {/* <HorizontalLine /> */}
      <div
        className="mt-4"
        style={{
          borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
          width: '100%',
        }}
      ></div>

      {/* user info */}
      <UserInfo
        imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
        name="John Doe"
        date="29.08.2025"
        className="mt-4"
      />
    </div>,
    <div
      className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
      style={{
        border: '2px dotted rgba(26, 47, 51, 0.2)',
      }}
    >
      <h3 className="text-black text-2xl text-left font-extrabold mb-8">
        Heading for all
      </h3>
      <p className="text-pretty text-left mb-4 leading-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
        ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      </p>

      {/* <HorizontalLine /> */}
      <div
        className="mt-4"
        style={{
          borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
          width: '100%',
        }}
      ></div>

      {/* user info */}
      <UserInfo
        imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
        name="John Doe"
        date="29.08.2025"
        className="mt-4"
      />
    </div>,
  ];

  return (
    <div className="relative bg-white px-18 py-15 rounded-t-md w-full min-h-screen">
      {/* box shadow top of component */}
      <div
        className="absolute top-[-25px]  w-full left-[9px] bg-white/15 rounded-sm z-21"
        style={{
          width: 'calc(100% - 20px)',
          height: '15px',
          transform: 'translateY(15px)',
        }}
      ></div>

      <div className="">
        <div className="mb-14">
          {/* section header */}
          <div className="justify-items-center">
            <SecHeader
              header={'TESTIMONIALS'}
              className={'items-center'}
              headerClass={'mt-4 font-bold tracking-[4px] text-[#19302d]'}
              spanClass="ms-15"
            />
            <SecMainHeader
              className="text-5xl text-[#19302d] font-extrabold mt-8"
              content="What Our Visitors Say"
            />
            <SecDescription
              content={description}
              className="mt-8 text-[#19302d] w-1/3 mx-auto text-center"
            />
          </div>

          {/* testimonial slider */}
          <div className="mt-10">
            <TestimonialSlider items={items} className="h-[580px]" />
          </div>
        </div>
        {/* subtle dotted line */}
        <HorizontalLine />
      </div>
    </div>
  );
};

export default Testimonials;
