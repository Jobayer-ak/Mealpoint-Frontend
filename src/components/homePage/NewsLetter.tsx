import BlogCard from '../Shared/blog-card/BlogCard';
import BottomShadow from '../Shared/BottomShadow';
import ButtonComp from '../Shared/ButtonComp';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import NewsLetterBanner from './NewsLetterBanner';

const NewsLetter = () => {
  const description =
    'Porro eveniet, autem ipsam corrupti consectetur cum. Repudiandae dignissimos fugiat sit nam';
  return (
    <div className="relative w-full min-h-screen px-18 py-10 rounded-b-md bg-white mt-8 ">
      {/* text contents */}
      <div>
        <div className="justify-items-center">
          <SecHeader
            header={'NEWS LETTER'}
            className={'items-center'}
            headerClass={'mt-4 font-bold tracking-[4px] text-[#19302d]'}
            spanClass="ms-14"
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
      </div>

      {/* blog card */}
      <div className="mt-12">
        <div className="w-full flex flex-col-3 gap-8">
          {/* card */}
          <BlogCard
            src="/assets/news-letter-images/blog-4.jpg"
            alt="blog-image"
            heading="Business Breakfast"
            desc="Consectetur adipisicing elit. Soluta, impedit, saepe. Unde minima distinctio officiis amet temporibus, consequuntur dolorem dicta"
          />
          <BlogCard
            src="/assets/news-letter-images/blog-5.jpg"
            alt="blog-image"
            heading="Pancakes in Chocolate"
            desc="Consectetur adipisicing elit. Soluta, impedit, saepe. Unde minima distinctio officiis amet temporibus, consequuntur dolorem dicta"
          />
          <BlogCard
            src="/assets/news-letter-images/blog-6.jpg"
            alt="blog-image"
            heading="Tuna & Tomatoes"
            desc="Consectetur adipisicing elit. Soluta, impedit, saepe. Unde minima distinctio officiis amet temporibus, consequuntur dolorem dicta"
          />
        </div>
      </div>

      {/* button and text line  */}
      <div className="flex justify-between items-center mt-9 mb-14">
        <p className="font-extralight text-gray-600 leading-7 tracking-wide antialiased">
          Read the news of our restaurant, recipes for delicious fears, tips for
          your home kitchen in our blog!
        </p>
        <ButtonComp
          content={'All Publications'}
          className="uppercase text-[#112029] font-semibold tracking-[2px] bg-[#f29e38] py-8 px-6 cursor-pointer transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
        />
      </div>

      {/* Horizontal line */}
      <HorizontalLine />

      {/* News Letter Banner */}
      <NewsLetterBanner />

      {/* shadow bottom of component */}
      <BottomShadow />
    </div>
  );
};

export default NewsLetter;
