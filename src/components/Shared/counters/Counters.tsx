import Counter from '../Counter';

const Counters = () => {
  return (
    <div className="bg-white w-full h-[300px] flex justify-around items-center">
      <Counter number={200} headingContent="Happy Visitors" />
      <Counter number={150} headingContent="Deliver Monthly" />
      <Counter number={99} headingContent="Positive Feedback" />
      <Counter number={15} headingContent="Awards & Honors" />
    </div>
  );
};

export default Counters;
