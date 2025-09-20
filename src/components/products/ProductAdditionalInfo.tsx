import SecMainHeader from '../Shared/SecMainHeader';

interface IInfo {
  currentTab: string;
}

const ProductAdditionalInfo = ({ currentTab }: IInfo) => {
  return (
    <div>
      <div className="flex flex-col justify-start items-left gap-8 mt-10 md:mt-12">
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

        <div>
          <div className="w-full text-start px-4 py-3 shadow-lg">
            <p className="text-[#183136] text-md font-bold w-1/5 tracking-widest">
              Size <span className="ml-15 text-md font-light">1, 2</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdditionalInfo;
