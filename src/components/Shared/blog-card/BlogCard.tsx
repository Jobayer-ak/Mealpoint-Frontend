import Image from 'next/image';
import ButtonComp from '../ButtonComp';
import UserInfo from '../testimonial/UserInfo';

interface ICard {
  src: string;
  alt: string;
  heading: string;
  desc: string;
}

const BlogCard = ({ src, alt, heading, desc }: ICard) => {
  return (
    <div className="w-full md:w-full lg:max-w-sm rounded-md overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300">
      {/* Image Wrapper */}
      <div className="relative w-full h-60 md:h-96 overflow-hidden group">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transform transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="100vw"
        />

        {/* button */}
        <ButtonComp
          content={'desserts'}
          className="absolute top-6 left-7 uppercase text-[#112029] text-xs font-bold tracking-[3px] bg-[#f29e38] px-3 cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-2">
        <h4 className="text-2xl font-extrabold text-[#1f3336] tracking-wide">
          {heading}
        </h4>
        <p className="font-extralight text-gray-600 leading-7 tracking-wide antialiased">
          {desc}
        </p>

        {/* horizontal line */}
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
          date="29.08.25"
        />
      </div>
    </div>
  );
};

export default BlogCard;
