import ButtonComp from '../Shared/ButtonComp';
import SecMainHeader from '../Shared/SecMainHeader';
import { StarRating } from '../Shared/StartRating';
import { Textarea } from '../ui/textarea';

interface IReview {
  currentTab: string;
}

const ProductReview = ({ currentTab }: IReview) => {
  return (
    <div>
      <div className="w-full flex flex-col justify-start items-left gap-8 mt-10 md:mt-12">
        <SecMainHeader
          className="text-[#183136] text-3xl font-extrabold"
          content={
            currentTab === 'additionalInfo'
              ? 'Additional Information'
              : currentTab === 'reviews'
              ? 'Reviews'
              : 'Description'
          }
        />

        <p className="text-[#183136] text-sm tracking-wide">
          There are no reviews yet.
        </p>

        <div className="w-full">
          <SecMainHeader
            className="text-[#183136] text-xl font-extrabold tracking-wide"
            content='Be the first to review "Fruit salad" '
          />

          <div className="bg-[#f0efef] py-2 px-2 w-1/2 mt-2">
            <p className=" text-[#183136] text-sm tracking-wider italic ">
              Your email address will not be published. Required fields are
              marked. *
            </p>
          </div>
        </div>

        {/* rating */}
        <div>
          <p className="text-[#183136] text-md tracking-wider">
            Your rating *{' '}
          </p>

          <div className="flex gap-2 mt-2">
            {/* <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" /> */}
            <StarRating />
          </div>
        </div>

        {/* form of riveiw writing */}
        <div>
          <Textarea
            placeholder="Type your review here."
            className="border-none w-1/2 shadow-lg"
          />
        </div>

        {/* submit button  */}
        <ButtonComp
          content="Submit"
          className="w-[180px] uppercase text-[#112029] tracking-[2px] font-semibold bg-[#f29e38] py-6 px-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-1"
        />
      </div>
    </div>
  );
};

export default ProductReview;
