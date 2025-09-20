import SecDescription from '../Shared/SecDescription';
import SecMainHeader from '../Shared/SecMainHeader';

interface IProductInfo {
  currentTab: string;
  description: string;
}

const ProductInfo = ({ currentTab, description }: IProductInfo) => {
  return (
    <div>
      <div className="flex flex-col justify-start items-left gap-8 mt-10 md:mt-12">
        <SecMainHeader
          className="text-[#183136] text-3xl md:text-4xl font-extrabold"
          content={
            currentTab === 'additionalInfo'
              ? 'Additional Information'
              : currentTab === 'reviews'
              ? 'Reviews'
              : 'Description'
          }
        />

        <SecDescription
          className="text-[#183136] w-full text-left font-light tracking-wider leading-7"
          content={description}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
