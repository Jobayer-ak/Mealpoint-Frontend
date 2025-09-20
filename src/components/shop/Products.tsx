// 'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { z } from 'zod';
import { useGetMenusQuery } from '../../redux/features/menu/menuApi';
import Container from '../container/Container';
import SpecialSliderCard from '../menu/SpecialSliderCard';
import BottomShadow from '../Shared/BottomShadow';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Slider } from '../ui/slider';

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

const tags = [
  'Bear',
  'Burger',
  'Pancakes',
  'Salad',
  'Juices',
  'Desserts',
  'Dishes',
  'Foods',
  'Seafoods',
];

const Products = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTab, SetCurrentTab] = useState('alldishes');

  // Avoid hydration mismatch by skipping data fetch during SSR and first client render

  useEffect(() => setMounted(true), []);
  // Call hooks unconditionally
  const formSchema = z.object({
    search: z
      .string()
      .min(2, { message: 'Search must be at least 2 characters' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: '' },
  });

  const { data, isLoading, isError } = useGetMenusQuery(undefined, {
    skip: !mounted,
  });

  // Render a consistent placeholder until mounted to avoid SSR/CSR mismatch
  // if (!mounted || isLoading) {
  //   return <div className="text-center py-10">Loading...</div>;
  // }
  // if (isError) {
  //   return (
  //     <div className="text-center py-10 text-red-500">Something went wrong</div>
  //   );
  // }

  const desserts = data?.data?.filter((d) => d.category.name === 'Desserts');
  const beverages = data?.data?.filter((b) => b.category.name === 'Beverages');
  const mainCourses = data?.data?.filter(
    (m) => m.category.name === 'Main Course'
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="mt-18">
      <Container>
        <div className="relative min-h-screen px-14 pb-12 bg-white rounded-md">
          {/* Top shadow */}
          <TopShadow />

          <div className="absolute bg-white w-[80px] h-[90px] rounded-full z-22 top-[-42px] left-1/2 transform -translate-x-1/2">
            <div className="w-[20px] h-[35px] bg-white/10 rounded-xl border-2 border-[#54575a] flex m-auto mt-[14px] relative overflow-hidden">
              {/* Animated dot */}
              {mounted && (
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
              )}
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

          {/* Main content */}

          <div className="mt-18 pt-15 ">
            <div className="flex gap-4">
              {/* Left content */}
              <div className="row-span-3 w-1/3">
                <div className="flex flex-col gap-14 pr-3">
                  {/* search bar */}

                  <div>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="search"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    placeholder="Search products...."
                                    {...field}
                                    className="text-black text-lg md:text-md pl-4 pr-2 py-7 shadow-xl shadow-gray-300/50 rounded-sm border border-gray-100"
                                  />
                                  <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 size-5 cursor-pointer" />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </div>

                  {/* Categories */}
                  <div>
                    <div>
                      <SecMainHeader
                        className="text-[#183136] text-2xl font-extrabold uppercase"
                        content="categories"
                      />
                    </div>

                    {/* tab buttons */}
                    <div className="flex flex-col gap-3 items-start tracking-wide text-[#183136] mt-6">
                      <button
                        className="cursor-pointer transition-all duration-300 ease-in-out group"
                        onClick={() => {
                          SetCurrentTab('alldishes');
                        }}
                      >
                        <span className="mr-2 group-hover:underline group-hover:underline-offset-4">
                          All
                        </span>
                        <span className="font-light">
                          ({data?.data?.length || 0})
                        </span>
                      </button>
                      <button
                        className="cursor-pointer transition-all duration-300 ease-in-out group"
                        onClick={() => {
                          SetCurrentTab('maincourses');
                        }}
                      >
                        <span className="mr-2 group-hover:underline group-hover:underline-offset-4">
                          Main Courses
                        </span>
                        <span className="font-light">
                          ({mainCourses?.length || 0})
                        </span>
                      </button>
                      <button
                        className="cursor-pointer transition-all duration-300 ease-in-out group"
                        onClick={() => {
                          SetCurrentTab('desserts');
                        }}
                      >
                        <span className="mr-2 group-hover:underline group-hover:underline-offset-4">
                          Desserts
                        </span>
                        <span className="font-light">
                          ({desserts?.length || 0})
                        </span>
                      </button>
                      <button
                        className="cursor-pointer transition-all duration-300 ease-in-out group"
                        onClick={() => {
                          SetCurrentTab('beverages');
                        }}
                      >
                        <span className="mr-2 group-hover:underline group-hover:underline-offset-4">
                          Drinks
                        </span>
                        <span className="font-light">
                          ({beverages?.length || 0})
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* filter by price*/}
                  <div>
                    <SecMainHeader
                      className="text-[#183136] text-2xl font-extrabold uppercase"
                      content="Filter By Price"
                    />

                    <div className="mt-4">
                      <Slider
                        className="bg-[#f0b437]"
                        defaultValue={[33]}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>

                    <div className="mt-6">
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-8"
                        >
                          <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative w-full flex justify-between items-center gap-4">
                                    <Input
                                      placeholder="200"
                                      {...field}
                                      className="text-[#183136] text-lg md:text-md pl-4 pr-2 py-4 rounded-sm border-1 border-[#afeef7]"
                                    />
                                    <Input
                                      placeholder="500"
                                      {...field}
                                      className="text-[#183136] text-lg md:text-md pl-4 pr-2 py-4 rounded-sm border-1 border-[#afeef7]"
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <SecMainHeader
                      className="text-[#183136] text-2xl font-extrabold uppercase"
                      content="Tags"
                    />
                    <div className="mt-6 text-[#f39c12] uppercase">
                      {tags?.map((tag, index) => (
                        <button
                          key={index}
                          className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2 mb-2 cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div className="col-span-8 w-full px-4">
                <div className="flex justify-between items-baseline-last ">
                  <div>
                    <SecMainHeader
                      className="text-[#183136] text-3xl md:text-4xl lg:text-4xl text-left font-extrabold"
                      content={
                        currentTab === 'maincourses'
                          ? 'Main Courses'
                          : currentTab === 'desserts'
                          ? 'Desserts'
                          : currentTab === 'beverages'
                          ? 'Drinks'
                          : 'All Dishes'
                      }
                    />

                    <p className="text-[#183136] font-ligth mt-4">
                      Show all{' '}
                      {currentTab === 'maincourses'
                        ? mainCourses?.length || 0
                        : currentTab === 'desserts'
                        ? desserts?.length || 0
                        : currentTab === 'beverages'
                        ? beverages?.length || 0
                        : data?.data?.length || 0}{' '}
                      results
                    </p>
                  </div>

                  {/* select filtering */}
                  <div className=" relative">
                    <Select>
                      <SelectTrigger className="w-[210px] text-[#183136] text-md pl-4 pr-2 py-5 shadow-md shadow-gray-300/50 rounded-sm border border-gray-100">
                        <SelectValue
                          placeholder="Default sorting"
                          className="text-sm"
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-sm border-none bg-white">
                        <SelectGroup className="">
                          <SelectLabel>Default sorting</SelectLabel>
                          <SelectItem value="apple">Default sorting</SelectItem>
                          <SelectItem value="banana">
                            Sort by average rating
                          </SelectItem>
                          <SelectItem value="blueberry">
                            Sort by popularity
                          </SelectItem>
                          <SelectItem value="grapes">Sort by lates</SelectItem>
                          <SelectItem value="pineapple">
                            Sort by price: low to high
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* product cards */}
                <div>
                  <div className="grid grid-cols-3 gap-6 mt-4">
                    {dishes?.map((dish, index) => (
                      <SpecialSliderCard
                        srcImage={dish.src}
                        name={dish.name}
                        description={dish.description}
                        price={dish.price}
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom shadow */}
          <BottomShadow />
        </div>
      </Container>
    </div>
  );
};

export default Products;
