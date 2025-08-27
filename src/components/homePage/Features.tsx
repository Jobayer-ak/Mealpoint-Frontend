import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import Icon from '../Shared/featuresIcons/Icon';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const Features = () => {
  const description = 'Porro eveniet, autem ipsam vitae consequatur!';
  return (
    <div>
      {/* section header */}
      <HorizontalLine />
      <div className="justify-items-center mt-15">
        <SecHeader
          header={'FEATURES'}
          className={'items-center'}
          headerClass={'mt-4 font-bold tracking-[2px] text-[#19302d]'}
          spanClass="ms-7"
        />
        <SecMainHeader
          className="text-5xl text-[#19302d] font-extrabold mt-8 -tracking-wide"
          content="Why People Choose Us?"
        />
        <SecDescription content={description} className="mt-8 text-[#19302d]" />
      </div>

      {/* features icons */}
      <div className="flex justify-between gap-10 mt-20 mb-20">
        <div>
          <Icon src="/assets/Features/icon-1.png" alt="icon-1" />
          <SecMainHeader
            className="text-2xl text-[#19302d] font-extrabold mt-8"
            content="Menu for every taste"
          />
          <SecDescription
            content="Dolor sit amet, consectetur adipisicing elit et molestias possimus"
            className="mt-6 text-[#19302d] opacity-[0.7]"
          />
        </div>
        <div>
          <Icon src="/assets/Features/icon-2.png" alt="icon-1" />
          <SecMainHeader
            className="text-2xl text-[#19302d] font-extrabold mt-8"
            content="Always fresh ingredients"
          />
          <SecDescription
            content="Assumenda possimus eaque illo iste, autem. Porro eveniet autem"
            className="mt-6 text-[#19302d] opacity-[0.7]"
          />
        </div>
        <div>
          <Icon src="/assets/Features/icon-3.png" alt="icon-1" />
          <SecMainHeader
            className="text-2xl text-[#19302d] font-extrabold mt-8"
            content="Experienced chefs"
          />
          <SecDescription
            content="Rolorem, beatae dolorum, praesentium itaque et quam quaerat"
            className="mt-6 text-[#19302d] opacity-[0.7]"
          />
        </div>
      </div>

      {/* subtle dotted line */}

      <HorizontalLine />
    </div>
  );
};

export default Features;
