'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonComp from '../Shared/Button';
import SlideCard from '../Shared/testimonial/SliderCard';

const TestimonialSlider = ({}) => {
  // const items = [
  //   <div
  //     className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
  //     style={{
  //       border: '2px dotted rgba(26, 47, 51, 0.2)',
  //     }}
  //   >
  //     <h3 className="text-black text-2xl text-left font-extrabold mb-8">
  //       Heading for all
  //     </h3>
  //     <p className="text-pretty text-left mb-4 leading-7">
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
  //       odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
  //       ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  //       doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
  //     </p>

  //     {/* <HorizontalLine /> */}
  //     <div
  //       className="mt-4"
  //       style={{
  //         borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
  //         width: '100%',
  //       }}
  //     ></div>

  //     {/* user info */}
  //     <UserInfo
  //       imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
  //       name="John Doe"
  //       date="29.08.2025"
  //       className="mt-4"
  //     />
  //   </div>,
  //   <div
  //     className="w-auto h-[460px] px-10  py-6 rounded-md shadow text-center bor"
  //     style={{
  //       border: '2px dotted rgba(26, 47, 51, 0.2)',
  //     }}
  //   >
  //     <h3 className="text-black text-2xl text-left font-extrabold mb-8">
  //       Heading for all
  //     </h3>
  //     <p className="text-pretty text-left mb-4 leading-7">
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
  //       odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
  //       ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  //       doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
  //     </p>

  //     {/* <HorizontalLine /> */}
  //     <div
  //       className="mt-4"
  //       style={{
  //         borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
  //         width: '100%',
  //       }}
  //     ></div>

  //     {/* user info */}
  //     <UserInfo
  //       imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
  //       name="John Doe"
  //       date="29.08.2025"
  //       className="mt-4"
  //     />
  //   </div>,
  //   <div
  //     className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
  //     style={{
  //       border: '2px dotted rgba(26, 47, 51, 0.2)',
  //     }}
  //   >
  //     <h3 className="text-black text-2xl text-left font-extrabold mb-8">
  //       Heading for all
  //     </h3>
  //     <p className="text-pretty text-left mb-4 leading-7">
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
  //       odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
  //       ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  //       doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
  //     </p>

  //     {/* <HorizontalLine /> */}
  //     <div
  //       className="mt-4"
  //       style={{
  //         borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
  //         width: '100%',
  //       }}
  //     ></div>

  //     {/* user info */}
  //     <UserInfo
  //       imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
  //       name="John Doe"
  //       date="29.08.2025"
  //       className="mt-4"
  //     />
  //   </div>,

  //   <div
  //     className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
  //     style={{
  //       border: '2px dotted rgba(26, 47, 51, 0.2)',
  //     }}
  //   >
  //     <h3 className="text-black text-2xl text-left font-extrabold mb-8">
  //       Heading for all
  //     </h3>
  //     <p className="text-pretty text-left mb-4 leading-7">
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
  //       odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
  //       ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  //       doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
  //     </p>

  //     {/* <HorizontalLine /> */}
  //     <div
  //       className="mt-4"
  //       style={{
  //         borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
  //         width: '100%',
  //       }}
  //     ></div>

  //     {/* user info */}
  //     <UserInfo
  //       imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
  //       name="John Doe"
  //       date="29.08.2025"
  //       className="mt-4"
  //     />
  //   </div>,
  //   <div
  //     className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
  //     style={{
  //       border: '2px dotted rgba(26, 47, 51, 0.2)',
  //     }}
  //   >
  //     <h3 className="text-black text-2xl text-left font-extrabold mb-8">
  //       Heading for all
  //     </h3>
  //     <p className="text-pretty text-left mb-4 leading-7">
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
  //       odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
  //       ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  //       doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
  //     </p>

  //     {/* <HorizontalLine /> */}
  //     <div
  //       className="mt-4"
  //       style={{
  //         borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
  //         width: '100%',
  //       }}
  //     ></div>

  //     {/* user info */}
  //     <UserInfo
  //       imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
  //       name="John Doe"
  //       date="29.08.2025"
  //       className="mt-4"
  //     />
  //   </div>,
  //   <div
  //     className="w-auto h-[460px] px-10  py-6   rounded-md shadow text-center bor"
  //     style={{
  //       border: '2px dotted rgba(26, 47, 51, 0.2)',
  //     }}
  //   >
  //     <h3 className="text-black text-2xl text-left font-extrabold mb-8">
  //       Heading for all
  //     </h3>
  //     <p className="text-pretty text-left mb-4 leading-7">
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
  //       odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed
  //       ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  //       doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
  //     </p>

  //     {/* <HorizontalLine /> */}
  //     <div
  //       className="mt-4"
  //       style={{
  //         borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
  //         width: '100%',
  //       }}
  //     ></div>

  //     {/* user info */}
  //     <UserInfo
  //       imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
  //       name="John Doe"
  //       date="29.08.2025"
  //       className="mt-4"
  //     />
  //   </div>,
  // ];

  // items.ts
  const items = [
    {
      title: 'Heading for all',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo',
      imageSrc: '/assets/Testimonial-slider-images/face-1.jpg',
      name: 'John Doe',
      date: '29.08.2025',
    },
    {
      title: 'Heading for all',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo',
      imageSrc: '/assets/Testimonial-slider-images/face-1.jpg',
      name: 'John Doe',
      date: '29.08.2025',
    },
    {
      title: 'Heading for all',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo',
      imageSrc: '/assets/Testimonial-slider-images/face-1.jpg',
      name: 'John Doe',
      date: '29.08.2025',
    },
    {
      title: 'Heading for all',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo',
      imageSrc: '/assets/Testimonial-slider-images/face-1.jpg',
      name: 'John Doe',
      date: '29.08.2025',
    },
    {
      title: 'Heading for all',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo',
      imageSrc: '/assets/Testimonial-slider-images/face-1.jpg',
      name: 'John Doe',
      date: '29.08.2025',
    },
    {
      title: 'Heading for all',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo',
      imageSrc: '/assets/Testimonial-slider-images/face-1.jpg',
      name: 'John Doe',
      date: '29.08.2025',
    },
  ];

  return (
    <div className="relative pb-3">
      {/* <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={false}
        centeredSlides={true}
        pagination={true ? { clickable: true } : false}
        navigation={false}
        autoplay={
          false ? { delay: 3000, disableOnInteraction: false } : undefined
        }
        modules={[Pagination, Navigation, Autoplay]}
        className="h-[580px] relative"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`transition-transform duration-300 min-h-[460px] b-10 flex flex-col justify-between
                  ${isActive ? 'shadow-xl rounded-2xl' : 'opacity-70'}
                `}
              >
                {<>{item}</>}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper> */}
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides
        pagination={{ clickable: true }}
        navigation={false}
        autoplay={
          false ? { delay: 3000, disableOnInteraction: false } : undefined
        }
        modules={[Pagination, Navigation, Autoplay]}
        className="h-[580px] relative"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <SlideCard
                title={item.title}
                description={item.description}
                imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
                name="John Doe"
                date="29.08.2025"
                border={!isActive} // 🔑 remove border when active
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination wrapper - absolutely inside container */}
      <div className="absolute top-7 w-full flex justify-center z-50 pointer-events-none">
        <style jsx global>{`
          .swiper-pagination {
            pointer-events: auto;
          }
          .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #19302d;
            opacity: 0.5;
          }
          .swiper-pagination-bullet-active {
            opacity: 1;
            background: #f29e38;
          }
        `}</style>
      </div>
      {/* Button */}
      <ButtonComp
        content={'MORE ABOUT US'}
        className="absolute z-30 bottom-[5px] text-[#112029] font-semibold tracking-[2px] bg-[#f29e38] py-8 px-6 cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
      />
    </div>
  );
};

export default TestimonialSlider;
