/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAngleDown, FaAngleUp, FaSearch } from 'react-icons/fa';
import { z } from 'zod';
import {
  useGetCategoriesQuery,
  useGetMenusQuery,
} from '../../redux/features/menu/menuApi';
import Container from '../container/Container';
import BottomShadow from '../Shared/BottomShadow';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import ShopCart from './ShopCart';

const TAGS = [
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

const SORT_OPTIONS = [
  { label: 'Default sorting', value: 'default' },
  { label: 'Price: Low to High', value: 'priceLowToHigh' },
  { label: 'Price: High to Low', value: 'priceHighToLow' },
  { label: 'Newest', value: 'newest' },
];

const formSchema = z.object({
  search: z
    .string()
    .min(2, { message: 'Search must be at least 2 characters' }),
});

const Products = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTab, setCurrentTab] = useState('alldishes');
  const [priceRange, setPriceRange] = useState([150]);
  const [searchInput, setSearchInput] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: '' },
  });

  const { data: allMenus } = useGetMenusQuery(undefined);
  const { data: categoriesData } = useGetCategoriesQuery(undefined, {
    skip: !mounted,
  });

  const tabs =
    categoriesData?.data?.map((cat) => ({
      key: cat.slug,
      label: cat.name,
      count:
        allMenus?.data?.filter((item) => item.category.slug === cat.slug)
          .length || 0,
    })) || [];

  const allTab = {
    key: 'alldishes',
    label: 'All',
    count: allMenus?.data?.length || 0,
  };
  const allTabs = [allTab, ...tabs];

  const getPrice = (item: any) => {
    if (
      item.hasVariants &&
      Array.isArray(item.variations) &&
      item.variations.length > 0
    ) {
      const prices = item.variations
        .map((v: any) => Number(v?.price))
        .filter((p: number) => !Number.isNaN(p));
      if (prices.length > 0) return Math.min(...prices);
    }
    const base = Number(item?.basePrice);
    if (!Number.isNaN(base) && base > 0) return base;
    return Infinity;
  };

  const filteredAndSortedProducts = useMemo(() => {
    if (!allMenus?.data) return [];

    let products = [...allMenus.data];

    if (currentTab !== 'alldishes') {
      products = products.filter((item) => item.category.slug === currentTab);
    }

    products = products.filter((item) => getPrice(item) <= priceRange[0]);

    if (searchInput.trim()) {
      const value = searchInput.toLowerCase();
      products = products.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
    }

    switch (sortOption) {
      case 'priceLowToHigh':
        return products.sort((a, b) => getPrice(a) - getPrice(b));
      case 'priceHighToLow':
        return products.sort((a, b) => getPrice(b) - getPrice(a));
      case 'newest':
        return products.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return products;
    }
  }, [allMenus, currentTab, priceRange, searchInput, sortOption]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSearchInput(values.search.toLowerCase());
  };

  return (
    <div className="mt-18">
      <Container>
        <div className="relative min-h-screen px-14 pb-12 bg-white rounded-md">
          <TopShadow />

          {/* Animated circular div */}
          <div className="absolute bg-white w-[80px] h-[90px] rounded-full z-22 top-[-42px] left-1/2 transform -translate-x-1/2">
            <div className="w-[20px] h-[35px] bg-white/10 rounded-xl border-2 border-[#54575a] flex m-auto mt-[14px] relative overflow-hidden">
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

          <div
            className="absolute bg-white/15 rounded-full z-30 left-1/2 transform -translate-x-1/2"
            style={{ width: '106px', height: '106px', top: '-53px' }}
          ></div>

          <div className="mt-18 pt-15 flex gap-4">
            {/* Left sidebar */}
            <div className="row-span-3 w-1/3 flex flex-col gap-14 pr-3">
              {/* Search */}
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
                              placeholder="Search products..."
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                setSearchInput(e.target.value.toLowerCase());
                              }}
                              className="text-black text-lg md:text-md pl-4 pr-10 py-7 shadow shadow-gray-300/50 rounded-sm border border-gray-100"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter')
                                  form.handleSubmit(onSubmit)();
                              }}
                            />
                            <button
                              type="button"
                              onClick={form.handleSubmit(onSubmit)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                              aria-label="Search products"
                            >
                              <FaSearch size={20} />
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              {/* Categories */}
              <div>
                <SecMainHeader
                  className="text-[#183136] text-2xl font-extrabold uppercase"
                  content="categories"
                />
                <div className="flex flex-col gap-3 items-start tracking-wide text-[#183136] mt-6">
                  {allTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setCurrentTab(tab.key)}
                      className={`cursor-pointer transition-all duration-300 ease-in-out group ${
                        currentTab === tab.key
                          ? 'font-semibold text-[#f0b437]'
                          : ''
                      }`}
                    >
                      <span className="mr-2 transition-all duration-300 group-hover:underline group-hover:underline-offset-4">
                        {tab.label}
                      </span>
                      <span className="font-light">({tab.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter by price */}
              <div>
                <SecMainHeader
                  className="text-[#183136] text-xl font-extrabold uppercase"
                  content="Filter By Price"
                />
                <div className="mt-4">
                  <Slider
                    className="bg-[#f0b437]"
                    value={priceRange}
                    min={0}
                    max={150}
                    step={1}
                    onValueChange={(value) => setPriceRange(value)}
                  />
                  <p className="mt-4 text-[#183136] font-normal">
                    From 0 to {priceRange[0]}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <SecMainHeader
                  className="text-[#183136] text-2xl font-extrabold uppercase"
                  content="Tags"
                />
                <div className="mt-6 text-[#f39c12] uppercase">
                  {TAGS.map((tag, index) => (
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

            {/* Right content */}
            <div className="col-span-8 w-full px-4">
              <div className="flex justify-between items-baseline-last">
                <div>
                  <SecMainHeader
                    className="text-[#183136] text-3xl md:text-4xl lg:text-4xl text-left font-extrabold"
                    content={
                      allTabs.find((t) => t.key === currentTab)?.label ||
                      'All Dishes'
                    }
                  />
                  <p className="text-[#183136] font-light mt-4">
                    Show all {filteredAndSortedProducts.length} results
                  </p>
                </div>

                {/* Custom Dropdown */}
                <div ref={dropdownRef} className="relative w-[220px]">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-4 py-3 border border-gray-100 rounded shadow flex justify-between items-center cursor-pointer"
                  >
                    {SORT_OPTIONS.find((o) => o.value === sortOption)?.label ||
                      'Select'}
                    <span className="ml-2">
                      {dropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute w-full border-gray-100 bg-white shadow-lg rounded mt-1 z-50">
                      {SORT_OPTIONS.map((option) => (
                        <li
                          key={option.value}
                          className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                            sortOption === option.value
                              ? 'font-semibold text-[#f19e38]'
                              : ''
                          }`}
                          onClick={() => {
                            setSortOption(option.value);
                            setDropdownOpen(false);
                          }}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Product cards */}
              <div className="grid grid-cols-3 gap-6 mt-4">
                {filteredAndSortedProducts.length > 0 ? (
                  filteredAndSortedProducts.map((item) => (
                    <ShopCart
                      key={item._id}
                      id={item.id}
                      name={item.name}
                      slug={item.slug}
                      image={item.image}
                      description={item.description}
                      basePrice={item.basePrice}
                      hasVariants={item.hasVariants}
                      variations={item.variations}
                    />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-500 py-10">
                    No products found in this category.
                  </p>
                )}
              </div>
            </div>
          </div>

          <BottomShadow />
        </div>
      </Container>
    </div>
  );
};

export default Products;
