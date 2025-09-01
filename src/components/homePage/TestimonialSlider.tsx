'use client';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonComp from '../Shared/ButtonComp';
import SlideCard from '../Shared/testimonial/SliderCard';

const TestimonialSlider = ({}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR render
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
    <div className="relative pb-3 pt-6">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        centeredSlides
        observer={true}
        observeParents={true}
        pagination={{ clickable: true }}
        navigation={false}
        autoplay={
          false ? { delay: 3000, disableOnInteraction: false } : undefined
        }
        modules={[Pagination, Navigation, Autoplay]}
        className="h-[600px] relative overflow-visible"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="!overflow-visible">
            {({ isActive }) => (
              <SlideCard
                title={item.title}
                description={item.description}
                imageSrc="/assets/Testimonial-slider-images/face-1.jpg"
                name="John Doe"
                date="29.08.2025"
                border={!isActive} //  remove border when active
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
        className="absolute z-30 bottom-0 text-[#112029] font-semibold tracking-[2px] bg-[#f29e38] py-8 px-6 cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
      />
    </div>
  );
};

export default TestimonialSlider;
