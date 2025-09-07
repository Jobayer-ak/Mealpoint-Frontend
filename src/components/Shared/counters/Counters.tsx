// import Counter from '../CountNumbers';

import CounterNumbers from '../Counter';

const Counters = () => {
  return (
    <div className="bg-white w-full h-[300px] flex justify-around items-center">
      <CounterNumbers number={200} headingContent="Happy Visitors" />
      <CounterNumbers number={150} headingContent="Deliver Monthly" />
      <CounterNumbers number={99} headingContent="Positive Feedback" />
      <CounterNumbers number={15} headingContent="Awards & Honors" />
    </div>
  );
};

export default Counters;
