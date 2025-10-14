// 'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGetMenusQuery } from '../../redux/features/menu/menuApi';
import BottomShadow from '../Shared/BottomShadow';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TabCard from './TabCard';

const desc =
  'Porro eveniet, autem ipsam corrupti consectetur cum. Repudiandae dignissimos fugiat sit nam';

const DishTabsMain = () => {
  const [currentTab, SetCurrentTab] = useState('alldishes');
  const [mounted, setMounted] = useState(false);

  // ensure query runs only after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data } = useGetMenusQuery(undefined, {
    skip: !mounted, // don't run on SSR
    // useErrorBoundary: true,
  });

  console.log('Data: ', data);

  const desserts = data?.data?.filter((d) => d.category.name === 'Desserts');
  const drinks = data?.data?.filter((b) => b.category.name === 'Drinks');

  const fastFood = data?.data?.filter((f) => f.category.name === 'Fast Food');

  return (
    <div className="w-full min-h-screen bg-white relative pb-14 mt-14 rounded-md">
      {/* Top shadow */}
      <TopShadow />

      <div className="absolute bg-white w-[80px] h-[90px] rounded-full z-22 top-[-42px] left-1/2 transform -translate-x-1/2">
        <div className="w-[20px] h-[35px] bg-white/10 rounded-xl border-2 border-[#54575a] flex m-auto mt-[14px] relative overflow-hidden">
          {/* Animated dot */}

          <motion.button
            className="absolute w-[4px] h-[4px] bg-[#54575a] rounded-full left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ y: 3 }}
            animate={{ y: [3, 15, 3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.5,
            }}
          />
        </div>
      </div>
      {/* Shadow for the circular div */}
      <div
        className="absolute bg-white/15 rounded-full z-30 left-1/2 transform -translate-x-1/2"
        style={{
          width: '106px',
          height: '106px',
          top: '-53px',
        }}
      ></div>

      {/* main content */}
      <div className="pt-8 px-2 md:px-14 md:pt-17">
        <Tabs
          value={currentTab}
          onValueChange={SetCurrentTab}
          className="w-full"
        >
          <div className="w-full flex justify-center items-center ">
            <TabsList className="w-full md:w-auto h-45 md:h-auto flex flex-col mt-5 md:mt-0 md:flex-row gap-0 md:gap-1 tracking-wider">
              <TabsTrigger
                value="alldishes"
                className="cursor-pointer uppercase"
              >
                All Dishes
              </TabsTrigger>
              <TabsTrigger
                value="fastfood"
                className="uppercase cursor-pointer"
              >
                Fast Food
              </TabsTrigger>
              <TabsTrigger
                value="desserts"
                className="cursor-pointer uppercase"
              >
                Desserts
              </TabsTrigger>
              <TabsTrigger value="drinks" className="cursor-pointer uppercase">
                Drinks
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={currentTab}>
            {/* section headers */}
            <div className="flex flex-col justify-center items-center gap-8 mt-10 md:mt-12">
              <SecHeader
                header={
                  currentTab === 'fastfood'
                    ? '01 Menu'
                    : currentTab === 'desserts'
                    ? '02 Menu'
                    : currentTab === 'drinks'
                    ? '03 Menu'
                    : 'Our Menu'
                }
                headerClass="text-[#183136] text-sm mt-5 tracking-wider font-semibold uppercase"
                spanClass={`${
                  currentTab === 'alldishes' ? 'ms-6' : 'ms-[15px]'
                }`}
                className={''}
              />

              <SecMainHeader
                className="text-[#183136] text-3xl md:text-4xl lg:text-6xl text-center font-extrabold"
                content={
                  currentTab === 'fastfood'
                    ? 'Main Courses'
                    : currentTab === 'desserts'
                    ? 'Desserts'
                    : currentTab === 'drinks'
                    ? 'Drinks'
                    : 'All Dishes'
                }
              />

              <SecDescription
                className="text-[#183136] w-full md:w-1/2 lg:w-1/4 text-center font-light tracking-wider leading-7"
                content={desc}
              />
            </div>

            {/* cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between items-center gap-8 mt-8">
              {currentTab === 'fastfood'
                ? fastFood?.map((dish) => (
                    <TabCard
                      key={dish._id}
                      id={dish._id}
                      shortId={dish.id}
                      name={dish.name}
                      slug={dish.slug}
                      srcImage={dish.image}
                      description={dish.description}
                      basePrice={dish.basePrice || undefined}
                      hasVariants={dish.hasVariants}
                      variations={dish.variations || undefined}
                    />
                  ))
                : currentTab === 'desserts'
                ? desserts?.map((dish) => (
                    <TabCard
                      key={dish._id}
                      shortId={dish.id}
                      id={dish._id}
                      name={dish.name}
                      slug={dish.slug}
                      srcImage={dish.image}
                      description={dish.description}
                      basePrice={dish.basePrice || undefined}
                      hasVariants={dish.hasVariants}
                      variations={dish.variations ?? undefined}
                    />
                  ))
                : currentTab === 'drinks'
                ? drinks?.map((dish) => (
                    <TabCard
                      key={dish._id}
                      id={dish._id}
                      shortId={dish.id}
                      name={dish.name}
                      slug={dish.slug}
                      srcImage={dish.image}
                      description={dish.description}
                      basePrice={dish.basePrice || undefined}
                      hasVariants={dish.hasVariants}
                      variations={dish.variations ?? undefined}
                    />
                  ))
                : data?.data?.map((dish) => (
                    <TabCard
                      key={dish._id}
                      id={dish._id}
                      shortId={dish.id}
                      name={dish.name}
                      slug={dish.slug}
                      srcImage={dish.image}
                      description={dish.description}
                      basePrice={dish.basePrice || undefined}
                      hasVariants={dish.hasVariants}
                      variations={dish.variations ?? undefined}
                    />
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom shadow */}
      <BottomShadow />
    </div>
  );
};

export default DishTabsMain;
