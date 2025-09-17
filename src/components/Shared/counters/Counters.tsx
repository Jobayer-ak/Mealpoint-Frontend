// import Counter from '../CountNumbers';

import CounterNumbers from '../Counter';

const Counters = () => {
  return (
    <div className="bg-white w-full h-[300px] flex justify-around items-center">
      <CounterNumbers end={200} headingContent="Happy Visitors" />
      <CounterNumbers end={150} headingContent="Deliver Monthly" />
      <CounterNumbers end={99} headingContent="Positive Feedback" />
      <CounterNumbers end={15} headingContent="Awards & Honors" />
    </div>
  );
};

export default Counters;
