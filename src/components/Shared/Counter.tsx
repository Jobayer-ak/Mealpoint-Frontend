import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  number: number;
  headingContent: string;
}

const Counter = ({ number, headingContent }: CounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const node = counterRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);

          const duration = 2500; // 2.5 seconds
          const start = Date.now();

          const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * number);

            setCount(currentCount);

            if (progress >= 1) {
              setCount(number);
              clearInterval(timer);
            }
          }, 16); // 60 FPS

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [number, hasStarted]);

  return (
    <div className="text-center">
      {/* Number with counting animation only */}
      <div ref={counterRef} className="flex justify-center items-baseline">
        <h2 className="text-5xl text-[#19302d] font-extrabold">
          {count.toLocaleString()}
        </h2>

        <span
          className={`text-[#f29e38] ms-2 ${
            headingContent.toLowerCase().includes('feedback')
              ? 'text-4xl'
              : 'text-5xl' // Make + symbol bigger to match % visually
          }`}
        >
          {headingContent.toLowerCase().includes('feedback') ? '%' : '+'}
        </span>
      </div>

      {/* Static Heading */}
      <p className="mt-5 uppercase text-md font-semibold text-[#19302d] opacity-80 tracking-wide">
        {headingContent}
      </p>
    </div>
  );
};

export default Counter;
