// 'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { z } from 'zod';
import { useGetMenusQuery } from '../../redux/features/menu/menuApi';
import Container from '../container/Container';
import BottomShadow from '../Shared/BottomShadow';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';

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
  if (!mounted || isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">Something went wrong</div>
    );
  }

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

          <div className="mt-18 pt-15">
            <div className="grid grid-flow-col grid-rows-3 gap-8 ">
              {/* Left content */}
              <div className="row-span-3 w-[260px]">
                <div className="flex flex-col gap-14">
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
                      <button className="cursor-pointer transition-all duration-300 ease-in-out group">
                        <span className="mr-2 group-hover:underline group-hover:underline-offset-4">
                          All
                        </span>
                        <span className="font-light">
                          ({data?.data?.length || 0})
                        </span>
                      </button>
                      <button className="cursor-pointer transition-all duration-300 ease-in-out group">
                        <span className="mr-2 group-hover:underline group-hover:underline-offset-4">
                          Main Courses
                        </span>
                        <span className="font-light">
                          ({mainCourses?.length || 0})
                        </span>
                      </button>
                      <button className="cursor-pointer transition-all duration-300 ease-in-out group">
                        <span className="mr-2 group-hover:underline group-hover:underline-offset-4">
                          Desserts
                        </span>
                        <span className="font-light">
                          ({desserts?.length || 0})
                        </span>
                      </button>
                      <button className="cursor-pointer transition-all duration-300 ease-in-out group">
                        <span className="mr-2 group-hover:underline group-hover:underline-offset-4">
                          Drinks
                        </span>
                        <span className="font-light">
                          ({beverages?.length || 0})
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* filter */}
                  <div></div>

                  {/* Tags */}
                  <div>
                    <SecMainHeader
                      className="text-[#183136] text-2xl font-extrabold uppercase"
                      content="Tags"
                    />
                    <div className="mt-6 text-[#f39c12] uppercase">
                      <button className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2">
                        Bear
                      </button>
                      <button className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2">
                        Burger
                      </button>
                      <button className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2">
                        Pancakes
                      </button>
                      <button className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2">
                        Salad
                      </button>

                      <button className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2">
                        Juices
                      </button>
                      <button className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2">
                        Desserts
                      </button>
                      <button className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2">
                        Dishes
                      </button>
                      <button className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2">
                        Foods
                      </button>
                      <button className="border-1 border-[#f39c12] uppercase text-sm px-2 py-1 mr-2">
                        Seafoods
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div className="col-span-2"></div>
              <div className="col-span-2"></div>
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
