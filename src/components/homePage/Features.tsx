import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const Features = () => {
  const description = 'Porro eveniet, autem ipsam vitae consequatur!';
  return (
    <div>
      <div className="justify-items-center">
        <SecHeader
          header={'FEATURES'}
          className={'items-center'}
          headerClass={'mt-4 font-bold tracking-[2px] text-[#19302d]'}
          spanClass="ms-7"
        />
        <SecMainHeader
          className="text-6xl text-[#19302d] font-extrabold mt-8 -tracking-wildest"
          content="Why People Choose Us?"
        />
        <SecDescription content={description} className="mt-8 text-[#19302d]" />
      </div>
    </div>
  );
};

export default Features;
