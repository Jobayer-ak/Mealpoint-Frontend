'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

// Icons
import { AiOutlineSearch } from 'react-icons/ai';
import { LuEuro } from 'react-icons/lu';

// Redux API
import { useGetSingleProductQuery } from '../../redux/features/menu/menuApi';

// UI components
import Container from '../container/Container';
import BottomShadow from '../Shared/BottomShadow';
import ButtonComp from '../Shared/ButtonComp';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import ProductAdditionalInfo from './ProductAdditionalInfo';
import ProductInfo from './ProductInfo';
import ProductReview from './ProductReview';
import RelatedProductCard from './RelatedProductCard';

// Shadcn UI
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Schema for form validation
const formSchema = z.object({
  quantity: z
    .string()
    .min(1, { message: 'Quantity must be at least 1' })
    .regex(/^\d+$/, { message: 'Quantity must be a number' }),
  size: z.string().optional(),
});

// Tabs style
const tabClass =
  'data-[state=active]:bg-white w-full md:w-fit px-0 py-0 md:px-4 md:py-3 text-foreground text-[#838383] inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center rounded-sm text-xs font-small whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-none disabled:opacity-50 data-[state=active]:text-[#183136]';

const Product = () => {
  const [currentTab, setCurrentTab] = useState('description');

  // Get product ID from URL
  const params = useParams();
  const productId = Array.isArray(params?.slug)
    ? params.slug[0]?.split('-').pop()
    : params?.slug?.split('-').pop();

  const { data, isLoading } = useGetSingleProductQuery(productId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { quantity: '1', size: '' },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('🛒 Add to cart:', { ...values, productId });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[#183136] text-lg font-light">Loading product...</p>
      </div>
    );
  }

  const product = data?.data;

  return (
    <div className="mt-18">
      <Container>
        <div className="relative min-h-screen px-14 pb-12 bg-white rounded-md">
          {/* Shadows */}
          <TopShadow />
          <BottomShadow />

          {/* Decorative floating element */}
          <div className="absolute bg-white w-[80px] h-[90px] rounded-full z-22 top-[-42px] left-1/2 transform -translate-x-1/2">
            <div className="w-[20px] h-[35px] bg-white/10 rounded-xl border-2 border-[#54575a] flex m-auto mt-[14px] relative overflow-hidden">
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
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-20">
            <div className="flex justify-center gap-12 flex-wrap md:flex-nowrap">
              {/* Left Image */}
              <div className="w-full md:w-1/2">
                <div className="relative w-full h-[355px] rounded-sm overflow-hidden">
                  <Image
                    src={'/assets/menu/fruit-salad.webp'}
                    alt={product?.name || 'Product'}
                    fill
                    className="object-center transition-transform duration-500 ease-out hover:scale-110"
                  />
                  <AiOutlineSearch className="absolute bg-white p-3 rounded-full top-10 right-10 text-black size-12 cursor-pointer shadow-md" />
                </div>
              </div>

              {/* Right Info */}
              <div className="w-full md:w-1/2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="flex flex-col gap-6">
                      <SecMainHeader
                        className="text-[#183136] text-5xl font-extrabold"
                        content={product?.name || 'Unnamed Product'}
                      />

                      <div className="inline-flex items-baseline">
                        <LuEuro className="text-[#183136] size-9 translate-y-[6px]" />
                        <p className="text-[#183136] font-light text-4xl leading-none">
                          {product?.price || '0.00'}
                        </p>
                      </div>

                      <p className="text-[#183136] font-light tracking-wide leading-relaxed">
                        {product?.description ||
                          'No product description available.'}
                      </p>
                    </div>

                    {/* Size Selection */}
                    <div className="flex justify-start items-center gap-10">
                      <p className="text-[#183136] font-bold text-md tracking-wide">
                        Size
                      </p>
                      {product?.size && product.size.length > 0 ? (
                        <FormField
                          control={form.control}
                          name="size"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[210px] text-[#183136] text-md pl-4 pr-2 py-6 shadow-md shadow-gray-300/50 rounded-sm border border-gray-100">
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent className="bg-white rounded-sm shadow-md">
                                  <SelectGroup>
                                    <SelectLabel>Available Sizes</SelectLabel>
                                    {product.size.map((s: string) => (
                                      <SelectItem key={s} value={s}>
                                        {s}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p className="text-[#183136] font-light text-md">
                          Size not available
                        </p>
                      )}
                    </div>

                    {/* product price */}

                    {product?.size ? (
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
                    ) : (
                      <p className="text-[#183136] font-light text-md leading-none"></p>
                    )}

                    <div className="flex jsutify-start gap-10 items-baseline">
                      {/* Quantity Input */}
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                min={1}
                                className="w-[120px] text-[#183136] text-lg pl-4 py-6 border border-gray-200 rounded-sm shadow-sm"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Add to Cart Button */}
                      <ButtonComp
                        // type="submit"
                        content="Add To Cart"
                        className="uppercase text-[#112029] tracking-[2px] font-semibold bg-[#f29e38] py-6 px-6 hover:-translate-y-1 transition-all duration-200"
                      />
                    </div>
                  </form>
                </Form>

                <div className="mt-8 flex flex-col gap-4">
                  <p className="text-[#183136] text-md font-light tracking-wide">
                    SKU : <span>{'N/A'}</span>
                  </p>
                  <p className="text-[#183136] text-md font-light tracking-wide ">
                    Categories : <span>{'All, Dessers'}</span>
                  </p>
                  <p className="text-[#183136] text-md font-light tracking-wide">
                    Tags : <span>{'Desserts, Fruits, Salad'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs Section */}

            <section className="mt-1 mb-12">
              <div className="">
                {/* tab menu */}
                <div className="pt-15">
                  <Tabs
                    value={currentTab}
                    onValueChange={setCurrentTab}
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
                          description={product?.description}
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

            {/* Related Products */}
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
        </div>
      </Container>
    </div>
  );
};

export default Product;
