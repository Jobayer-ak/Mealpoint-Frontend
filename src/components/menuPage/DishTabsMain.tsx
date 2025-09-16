/* eslint-disable react/jsx-key */
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import BottomShadow from '../Shared/BottomShadow';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TabCard from './TabCard';

interface IDishes {
  id: number;
  name: string;
  src: string;
  description: string;
  category: string;
  price: number;
}

const dishes: IDishes[] = [
  {
    id: 1,
    name: 'Fruit salad',
    src: '/assets/menu/fruit-salad.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'desserts',
    price: 10.5,
  },
  {
    id: 2,
    name: 'Pan cakes',
    src: '/assets/menu/pancakes.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',

    category: 'desserts',
    price: 10.5,
  },
  {
    id: 3,
    name: 'Casserole',
    src: '/assets/menu/casserol.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'dishes',
    price: 10.5,
  },
  {
    id: 4,
    name: 'King burger',
    src: '/assets/menu/king-burger.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'dishes',
    price: 10.5,
  },
  {
    id: 5,
    name: 'Bear',
    src: '/assets/menu/bear.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'drinks',
    price: 10.5,
  },

  {
    id: 6,
    name: 'Juices',
    src: '/assets/menu/juices.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'drinks',
    price: 10.99,
  },
];

const desc =
  'Porro eveniet, autem ipsam corrupti consectetur cum. Repudiandae dignissimos fugiat sit nam';

const DishTabsMain = () => {
  const [currentTab, SetCurrentTab] = useState('alldishes');

  const dishesArray = dishes.filter((dish) => dish.category === 'dishes');
  const dessertsArray = dishes.filter((dish) => dish.category === 'desserts');
  const drinksArray = dishes.filter((dish) => dish.category === 'drinks');

  // useEffect(() => {}, [currentTab, SetCurrentTab]);

  return (
    <div className="w-full min-h-screen bg-white relative pb-14 mt-14 rounded-md">
      {/* Top shadow */}
      <TopShadow />

      <div className="absolute bg-white w-[80px] h-[90px] rounded-full z-22 top-[-42px] left-1/2 transform -translate-x-1/2">
        <div className="w-[20px] h-[35px] bg-white/10 rounded-xl border-2 border-[#54575a] flex m-auto mt-[14px] relative overflow-hidden">
          {/* Animated dot */}
          <motion.button
            className="absolute w-[4px] h-[4px] bg-[#54575a] rounded-full left-1/2 transform -translate-x-1/2 cursor-pionter"
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
      {/* Shadow for the circular div - positioned to show only top half */}
      <div
        className="absolute bg-white/15 rounded-full z-30 left-1/2 transform -translate-x-1/2"
        style={{
          width: '106px',
          height: '106px',
          top: '-53px',
        }}
      ></div>

      {/* main content */}
      <div className="pt-8 px-3 md:px-14 md:pt-17">
        {/* tabs */}

        <div>
          <Tabs defaultValue="alldishes" className="w-full">
            <div className="w-full flex justify-center items-center ">
              <TabsList className="w-full md:w-auto h-45 md:h-auto flex flex-col mt-5 md:mt-0 md:flex-row gap-0 md:gap-1 tracking-wider">
                <TabsTrigger
                  value="alldishes"
                  className="cursor-pointer"
                  onClick={() => SetCurrentTab('alldishes')}
                >
                  ALL DISHES
                </TabsTrigger>
                <TabsTrigger
                  value="dishes"
                  className="cursor-pointer"
                  onClick={() => SetCurrentTab('dishes')}
                >
                  DISHES
                </TabsTrigger>
                <TabsTrigger
                  value="desserts"
                  className="cursor-pointer"
                  onClick={() => SetCurrentTab('desserts')}
                >
                  DESSERTS
                </TabsTrigger>
                <TabsTrigger
                  value="drinks"
                  className="cursor-pointer"
                  onClick={() => SetCurrentTab('drinks')}
                >
                  DRINKS
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={currentTab}>
              {/* small section */}
              <div className="flex flex-col justify-center items-center gap-8 mt-10 md:mt-12">
                <SecHeader
                  className=""
                  header={
                    currentTab === 'dishes'
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
                />

                <SecMainHeader
                  className="text-[#183136] text-3xl md:text-4xl lg:text-6xl text-center font-extrabold"
                  content={
                    currentTab === 'dishes'
                      ? 'Dishes'
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

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between items-center gap-8 mt-8">
                {currentTab === 'dishes'
                  ? dishesArray?.map((dish) => (
                      <TabCard
                        name={dish.name}
                        srcImage={dish.src}
                        description={dish.description}
                        price={dish.price}
                      />
                    ))
                  : currentTab === 'desserts'
                  ? dessertsArray?.map((dish) => (
                      <TabCard
                        name={dish.name}
                        srcImage={dish.src}
                        description={dish.description}
                        price={dish.price}
                      />
                    ))
                  : currentTab === 'drinks'
                  ? drinksArray?.map((dish) => (
                      <TabCard
                        name={dish.name}
                        srcImage={dish.src}
                        description={dish.description}
                        price={dish.price}
                      />
                    ))
                  : dishes?.map((dish) => (
                      <TabCard
                        name={dish.name}
                        srcImage={dish.src}
                        description={dish.description}
                        price={dish.price}
                      />
                    ))}
              </div>
            </TabsContent>
            {/* <TabsContent value="dishes">Dishes</TabsContent>
            <TabsContent value="desserts">Desserts</TabsContent>
            <TabsContent value="drinks">Drinks</TabsContent> */}
          </Tabs>
        </div>
      </div>

      {/* Bottom shadow */}
      <BottomShadow />
    </div>
  );
};

export default DishTabsMain;
