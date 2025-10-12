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

// Redux
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useGetSingleProductQuery } from '../../redux/features/menu/menuApi';
import { useAppDispatch } from '../../redux/hook/hook';

// UI Components
import Container from '../container/Container';
import BottomShadow from '../Shared/BottomShadow';
import ButtonComp from '../Shared/ButtonComp';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';

import ImageZoomModal from '../Shared/ImageZoomModal';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ProductAdditionalInfo from './ProductAdditionalInfo';
import ProductInfo from './ProductInfo';
import ProductReview from './ProductReview';
import RelatedProductCard from './RelatedProductCard';

// ------------------- Form Schema -------------------
const formSchema = z.object({
  quantity: z
    .string()
    .min(1, { message: 'Quantity must be at least 1' })
    .regex(/^\d+$/, { message: 'Quantity must be a number' }),
  size: z.string().optional(),
});

// ------------------- Tabs Class -------------------
const tabClass =
  'data-[state=active]:bg-white w-full md:w-fit px-0 py-0 md:px-4 md:py-4 uppercase text-foreground text-[#838383] inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center rounded-sm text-sm whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-none disabled:opacity-50 data-[state=active]:text-[#183136]';

const Product = () => {
  const [currentTab, setCurrentTab] = useState('description');
  const dispatch = useAppDispatch();
  const [zoomOpen, setZoomOpen] = useState(false);

  // Get productId from params
  const params = useParams();
  const productId = params?.slug?.split('-').pop();

  const { data } = useGetSingleProductQuery(productId);
  const product = data?.data;

  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { quantity: '1', size: '' },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(
      addToCart({
        id: product?._id,
        name: product?.name,
        price: product?.price,
        image:
          'https://tastyc.bslthemes.com/wp-content/uploads/2021/04/gallery-i-2.jpg',
        quantity: +values.quantity,
        size: values.size,
      })
    );
  };

  const quantityValue = form.watch('quantity');
  const isAddToCartDisabled =
    !quantityValue ||
    isNaN(Number(quantityValue)) ||
    Number(quantityValue) <= 0;

  return (
    <div className="mt-18">
      <Container>
        <div className="relative min-h-screen px-14 pb-12 bg-white rounded-md">
          {/* Top & Bottom Shadows */}
          <TopShadow />
          <BottomShadow />

          {/* Decorative Floating Circle */}
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

          {/* Top Half Shadow */}
          <div
            className="absolute bg-white/15 rounded-full z-30 left-1/2 transform -translate-x-1/2"
            style={{ width: '106px', height: '106px', top: '-53px' }}
          />

          {/* Main Content */}
          <div className="pt-20 flex flex-col gap-12 md:flex-row">
            {/* Product Image */}
            <div className="w-full md:w-1/2 relative h-[355px] rounded-sm overflow-hidden">
              <Image
                src={
                  'https://tastyc.bslthemes.com/wp-content/uploads/2021/04/gallery-i-2.jpg'
                }
                alt={product?.name || 'Product'}
                fill
                className="object-center transition-transform duration-500 ease-out hover:scale-110"
              />

              <AiOutlineSearch
                className="absolute bg-white p-3 rounded-full top-10 right-10 text-black size-12 cursor-pointer shadow-md"
                onClick={() => setZoomOpen(true)}
              />

              <ImageZoomModal
                src={
                  'https://tastyc.bslthemes.com/wp-content/uploads/2021/04/gallery-i-2.jpg'
                }
                alt={product?.name || 'Product'}
                isOpen={zoomOpen}
                onClose={() => setZoomOpen(false)}
              />
            </div>

            {/* Product Info */}
            <div className="w-full md:w-1/2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Product Details */}
                  <div className="flex flex-col gap-6">
                    <SecMainHeader
                      className="text-[#183136] text-5xl font-extrabold"
                      content={product?.name || 'Unnamed Product'}
                    />

                    <div className="inline-flex items-baseline">
                      <LuEuro className="text-[#183136] size-9 translate-y-[6px]" />
                      <p className="text-[#183136] font-light text-4xl leading-none">
                        {product?.price?.toFixed(2) || '0.00'}
                      </p>
                    </div>

                    <p className="text-[#183136] font-light tracking-wide leading-relaxed">
                      {product?.description ||
                        'No product description available.'}
                    </p>
                  </div>

                  {/* Size Selection */}
                  {product?.size?.length ? (
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[210px] text-[#183136] text-md pl-4 pr-2 py-6 shadow-md rounded-sm border border-gray-100">
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

                  {/* Quantity + Add to Cart */}
                  <div className="flex gap-4 justify-start items-center mt-6">
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
                              placeholder="1"
                              className="w-[120px] text-[#183136] text-lg pl-4 py-6 border border-gray-200 rounded-sm shadow-sm"
                            />
                          </FormControl>
                          {form.formState.errors.quantity && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.quantity.message}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />

                    <ButtonComp
                      content="Add To Cart"
                      disabled={isAddToCartDisabled}
                      className={`uppercase text-[#112029] tracking-[2px] font-semibold bg-[#f29e38] py-6 px-6 transition-all duration-200 cursor-pointer ${
                        isAddToCartDisabled
                          ? 'opacity-50 cursor-not-allowed hover:translate-y-0'
                          : ''
                      }`}
                    />
                  </div>
                </form>
              </Form>

              {/* Additional Product Info */}
              <div className="mt-8 flex flex-col gap-4">
                <p className="text-[#183136] text-md font-light tracking-wide">
                  SKU : <span>{product?.sku || 'N/A'}</span>
                </p>
                <p className="text-[#183136] text-md font-light tracking-wide ">
                  Categories :{' '}
                  <span>
                    {product?.categories?.join(', ') || 'All, Dessers'}
                  </span>
                </p>
                <p className="text-[#183136] text-md font-light tracking-wide">
                  Tags :{' '}
                  <span>
                    {product?.tags?.join(', ') || 'Desserts, Fruits, Salad'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <section className="mt-12 mb-12">
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full"
            >
              <div className="mb-7">
                <TabsList className="flex flex-row justify-start gap-6 items-center tracking-widest">
                  <TabsTrigger value="description" className={tabClass}>
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="additionalInfo" className={tabClass}>
                    Additional Information
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className={tabClass}>
                    Reviews <span className="ml-1">(0)</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <HorizontalLine />

              <TabsContent value={currentTab}>
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
              </TabsContent>
            </Tabs>
          </section>

          <HorizontalLine />

          {/* Related Products */}
          <div className="mt-12">
            <SecMainHeader
              className="text-[#183136] text-3xl text-left font-extrabold"
              content="Related Products"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <RelatedProductCard
                name="Juices"
                price={10.0}
                srcImage="https://tastyc.bslthemes.com/wp-content/uploads/2021/05/blog-1.jpg"
              />
              <RelatedProductCard
                name="King Burger"
                price={10.0}
                srcImage="https://tastyc.bslthemes.com/wp-content/uploads/2021/04/gallery-i-5-800x583.jpg"
              />
              <RelatedProductCard
                name="Casserol"
                price={10.0}
                srcImage="https://tastyc.bslthemes.com/wp-content/uploads/2021/04/gallery-i-2.jpg"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
