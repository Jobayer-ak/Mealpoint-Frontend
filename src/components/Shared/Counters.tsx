import { motion } from 'framer-motion';
import Counter from './Counter';

interface StatisticItem {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: string;
}

const Counters = () => {
  // Statistics data - you can easily modify these values
  const statistics: StatisticItem[] = [
    {
      id: 'visitors',
      value: 2847,
      label: 'Happy Visitors',
      suffix: '+',
    },
    {
      id: 'deliveries',
      value: 1520,
      label: 'Deliver Monthly',
      suffix: '+',
    },
    {
      id: 'feedback',
      value: 99,
      label: 'Positive Feedback',
      suffix: '%',
    },
    {
      id: 'awards',
      value: 15,
      label: 'Awards & Honors',
      suffix: '+',
    },
  ];

  return (
    <section className="py-16">
      {/* Statistics Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="text-center bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              {/* Icon */}
              {stat.icon && (
                <motion.div
                  className="text-4xl mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.3,
                    type: 'spring',
                    bounce: 0.4,
                  }}
                  viewport={{ once: true }}
                >
                  {stat.icon}
                </motion.div>
              )}

              {/* Animated Counter */}
              <Counter
                end={stat.value}
                duration={2.5}
                delay={index * 0.2}
                suffix={stat.suffix}
                prefix={stat.prefix}
                className="text-4xl md:text-5xl font-extrabold text-[#19302d] mb-4"
              />

              {/* Label */}
              <motion.p
                className="text-lg font-semibold text-[#19302d] opacity-80 tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + 0.8,
                }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counters;
