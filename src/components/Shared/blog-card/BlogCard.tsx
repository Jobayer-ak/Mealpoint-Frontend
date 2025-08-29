import Image from 'next/image';
import UserInfo from '../testimonial/UserInfo';

interface ICard {
  src: string;
  alt: string;
}

const BlogCard = ({ src, alt }: ICard) => {
  return (
    <div className="w-full max-w-sm rounded-md overflow-hidden shadow-lg bg-white hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-52">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-2">
        <h4 className="text-2xl font-extrabold text-[#1f3336] tracking-wide">
          Business Breakfast
        </h4>
        <p className="font-extralight text-gray-600 leading-7 tracking-wide antialiased">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
          temporibus velit quasi eligendi, repudiandae maxime quibusdam in.
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
