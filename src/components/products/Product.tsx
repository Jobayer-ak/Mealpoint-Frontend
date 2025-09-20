'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectGroup, SelectItem } from '@radix-ui/react-select';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { LuEuro } from 'react-icons/lu';
import z from 'zod';
import Container from '../container/Container';
import BottomShadow from '../Shared/BottomShadow';
import ButtonComp from '../Shared/ButtonComp';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ProductAdditionalInfo from './ProductAdditionalInfo';
import ProductInfo from './ProductInfo';
import ProductReview from './ProductReview';
import RelatedProductCard from './RelatedProductCard';

const description =
  'Consectetur adipisicing elit. Soluta, impedit, saepe. Unde minima distinctio officiis amet temporibus, consequuntur dolorem dicta reprehenderit doloremque voluptate voluptas molestiae et pariatur soluta, nemo eos molestias beatae excepturi deleniti. Ea hic perferendis ut possimus. Culpa corrupti unde fugit doloremque omnis aliquam nam, velit, cupiditate quis reiciendis provident dolorum adipisci accusamus. Cum debitis, ipsum est ipsam vitae vel, quam in sint reprehenderit ducimus repudiandae ab et.';

const tabClass =
  'data-[state=active]:bg-white w-full md:w-fit px-0 py-0 md:px-4 md:py-3 dark:data-[state=active]:text-foreground focus-visible:border-none focus-visible:ring-0 focus-visible:outline-0 dark:data-[state=active]:border-0 dark:data-[state=active]:bg-input/0 text-foreground text-[#838383] dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-0 rounded-sm border-none border-transparent text-xs font-small whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[0px] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-[#183136] data-[state=active]:shadow-none';

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
    name: 'Casserol',
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

const Product = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTab, SetCurrentTab] = useState('description');

  // Avoid hydration mismatch by skipping data fetch during SSR and first client render

  useEffect(() => setMounted(true), []);

  const formSchema = z.object({
    search: z
      .string()
      .min(2, { message: 'Search must be at least 2 characters' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: '' },
  });

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
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 0.1,
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
          {/* ######################################### */}

          {/* main content */}
          <div className="mt-18 pt-18">
            <div className="flex justify-center gap-0">
              {/* Left side product image */}
              <div className="w-1/2 pr-10">
                <div className="w-full h-[355px] overflow-hidden relative rounded-sm">
                  <Image
                    src={'/assets/menu/fruit-salad.webp'}
                    alt="Image"
                    fill
                    className="object-center cursor-pointer transform transition-transform duration-500 ease-out hover:scale-110"
                    sizes="100vw"
                  />
                  {/* <div className="relative"> */}
                  <AiOutlineSearch className="absolute bg-white p-3 rounded-full top-10 right-10 -translate-y-1/2 text-black size-12 cursor-pointer " />

                  {/* </div> */}
                </div>
              </div>

              {/* Right side content part */}
              <div className="w-1/2">
                <div className="flex flex-col gap-10">
                  <SecMainHeader
                    className="text-[#183136] text-5xl font-extrabold"
                    content="Fruit Salad"
                  />
                  <div className="inline-flex items-baseline">
                    <LuEuro
                      className="text-[#183136] flex-shrink-0 size-9 translate-y-[6px]"
                      aria-hidden="true"
                      strokeWidth={2}
                    />
                    <p className="text-[#183136] font-light text-4xl leading-none">
                      10.0
                    </p>
                  </div>

                  <p className="text-[#183136] font-extralight leading-none tracking-wide">
                    Consectetur adipisicing elit. Soluta, impedit, saepe.
                  </p>
                </div>

                <div className=" mt-8 ">
                  <div className=" flex justify-start items-center gap-10">
                    <p className="text-[#183136] font-bold text-md tracking-wide">
                      Size{' '}
                    </p>
                    {/* select */}
                    <div className=" relative">
                      <Select>
                        <SelectTrigger className="w-[210px] text-[#183136] text-md pl-4 pr-2 py-6 shadow-md shadow-gray-300/50 rounded-sm border border-gray-100">
                          <SelectValue
                            placeholder="Choose an option"
                            className="text-md"
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm border-none bg-white">
                          <SelectGroup className="">
                            <SelectLabel className="text-md font-bold">
                              Choose an option
                            </SelectLabel>

                            <SelectItem
                              value="banana"
                              className="bg-amber-100 mb-1 pl-2"
                            >
                              1
                            </SelectItem>
                            <SelectItem
                              value="blueberry"
                              className="bg-amber-100 mb-1 pl-2"
                            >
                              2
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* product price */}
                  <div className="inline-flex items-baseline mt-6">
                    <LuEuro
                      className="text-[#183136] flex-shrink-0 size-9 translate-y-[7px]"
                      aria-hidden="true"
                      strokeWidth={2}
                    />
                    <p className="text-[#183136] font-light text-4xl leading-none">
                      10.0
                    </p>
                  </div>

                  {/* add to cart and items quantity */}
                  <div className="flex jsutify-start gap-10 items-baseline-last">
                    {/* item quantity */}

                    <div className="mt-6 w-1/6">
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
                                      placeholder="1"
                                      {...field}
                                      className="text-[#183136] text-lg md:text-md pl-4 pr-2 py-6 rounded-sm border-1 border-[#afeef7]"
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </div>
                    {/* button */}
                    <ButtonComp
                      content="Add To Cart"
                      className="uppercase text-[#112029] tracking-[2px] font-semibold bg-[#f29e38] py-6 px-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-1"
                    />
                  </div>

                  {/* small info about item */}
                  <div className="mt-8 flex flex-col gap-4">
                    <p className="text-[#183136] text-md font-extralight tracking-wide">
                      SKU : <span>{'N/A'}</span>
                    </p>
                    <p className="text-[#183136] text-md font-extralight tracking-wide ">
                      Categories : <span>{'All, Dessers'}</span>
                    </p>
                    <p className="text-[#183136] text-md font-extralight tracking-wide">
                      Tags : <span>{'Desserts, Fruits, Salad'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ################################################ */}

            {/* tabs section */}
            <section className="mt-1 mb-12">
              <div className="">
                {/* tab menu */}
                <div className="pt-15">
                  <Tabs
                    value={currentTab}
                    onValueChange={SetCurrentTab}
                    className="w-full"
                  >
                    <div className="w-full mb-7">
                      <TabsList className="flex flex-row justify-start gap-6 items-center tracking-widest">
                        <TabsTrigger
                          value="description"
                          className={`cursor-pointer uppercase text-xs font-semibold ${tabClass}`}
                        >
                          Description
                        </TabsTrigger>
                        <TabsTrigger
                          value="additionalInfo"
                          className={`cursor-pointer uppercase text-xs font-semibold ${tabClass}`}
                        >
                          Additional Information
                        </TabsTrigger>
                        <TabsTrigger
                          value="reviews"
                          className={`cursor-pointer uppercase text-xs font-semibold ${tabClass}`}
                        >
                          Reviews <span className="ml-1">{'(0)'}</span>
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    {/* Horizontal line */}
                    <HorizontalLine />

                    <TabsContent value={currentTab}>
                      {/* section headers */}

                      {currentTab === 'additionalInfo' ? (
                        <ProductAdditionalInfo currentTab={currentTab} />
                      ) : currentTab === 'reviews' ? (
                        <ProductReview currentTab={currentTab} />
                      ) : (
                        <ProductInfo
                          currentTab={currentTab}
                          description={description}
                        />
                      )}

                      {/* cards */}
                    </TabsContent>
                  </Tabs>

                  {/* Horizontal line */}
                </div>
              </div>
            </section>
            <HorizontalLine />

            {/* Related products */}
            <div className="mt-12">
              <SecMainHeader
                className="text-[#183136] text-3xl  text-left font-extrabold"
                content={'Related Products'}
              />

              {/* Product cards */}
              <div className="mt-10">
                <div className="flex justify-between items-center gap-8">
                  <RelatedProductCard
                    name="Juices"
                    price={10.0}
                    srcImage="/assets/menu/juices.webp"
                  />
                  <RelatedProductCard
                    name="King Burger"
                    price={10.0}
                    srcImage="/assets/menu/king-burger.webp"
                  />
                  <RelatedProductCard
                    name="Casserol"
                    price={10.0}
                    srcImage="/assets/menu/casserol.webp"
                  />
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

export default Product;
