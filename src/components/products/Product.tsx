'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import { toast } from 'sonner';
import Container from '../container/Container';
import BottomShadow from '../Shared/BottomShadow';
import ButtonComp from '../Shared/ButtonComp';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import ImageZoomModal from '../Shared/ImageZoomModal';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ProductAdditionalInfo from './ProductAdditionalInfo';
import ProductInfo from './ProductInfo';
import ProductReview from './ProductReview';
import RelatedProductCard from './RelatedProductCard';

const formSchema = z.object({
  quantity: z
    .string()
    .min(1, { message: 'Quantity must be at least 1' })
    .regex(/^\d+$/, { message: 'Quantity must be a number' }),
  size: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const tabClass =
  'data-[state=active]:bg-white w-full md:w-fit px-0 py-0 md:px-4 md:py-4 uppercase text-foreground text-[#838383] inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center rounded-sm text-sm whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-none disabled:opacity-50 data-[state=active]:text-[#183136]';

const Product = () => {
  const [currentTab, setCurrentTab] = useState('description');
  const [zoomOpen, setZoomOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [displayPrice, setDisplayPrice] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const params = useParams();
  const slug = params?.slug as string;

  const { data } = useGetSingleProductQuery(slug!, { skip: !slug });
  const product = data?.data;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { quantity: '1', size: '' },
  });

  const quantityValue = form.watch('quantity');
  const isAddToCartDisabled =
    !quantityValue ||
    isNaN(Number(quantityValue)) ||
    Number(quantityValue) <= 0 ||
    (product?.hasVariants && !selectedSize);

  useEffect(() => {
    if (!product) return;

    if (product.hasVariants && selectedSize) {
      const variant = product.variations.find(
        (v: { size: string }) => v.size === selectedSize
      );
      setDisplayPrice(variant?.price ?? 0);
    } else if (!product.hasVariants) {
      setDisplayPrice(product.basePrice ?? 0);
    } else {
      setDisplayPrice(null);
    }
  }, [selectedSize, product]);

  const onSubmit = (values: FormValues) => {
    if (!product) return;
    const price = displayPrice ?? 0;

    const cartItem = {
      id: product.id,
      mongoId: product._id,
      name: product.name,
      price,
      image: product.image,
      description: product.description,
      quantity: Number(values.quantity),
      size: product.hasVariants ? selectedSize : null,
      hasVariants: product.hasVariants,
      totalPrice: price * Number(values.quantity),
    };

    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} added to cart!`);
  };

  return (
    <div className="mt-18">
      <Container>
        <div className="relative min-h-screen px-14 pb-12 bg-white rounded-md">
          <TopShadow />
          <BottomShadow />

          {/* Decorative Circle */}
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
                }}
              />
            </div>
          </div>

          <div className="pt-20 flex flex-col gap-12 md:flex-row">
            {/* Product Image */}
            <div className="w-full md:w-1/2 relative h-[355px] rounded-sm overflow-hidden">
              {product?.image ? (
                <Image
                  src={product.image}
                  alt={product.name || 'Product'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-[355px] bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
              <AiOutlineSearch
                className="absolute bg-white p-3 rounded-full top-10 right-10 text-black size-12 cursor-pointer shadow-md"
                onClick={() => setZoomOpen(true)}
              />
              <ImageZoomModal
                src={product?.image || ''}
                alt={product?.name || 'Product'}
                isOpen={zoomOpen}
                onClose={() => setZoomOpen(false)}
              />
            </div>

            {/* Product Info */}
            <div className="w-full md:w-1/2">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col gap-6">
                  <SecMainHeader
                    className="text-[#183136] text-5xl font-extrabold"
                    content={product?.name || 'Unnamed Product'}
                  />
                  <div className="inline-flex items-baseline gap-2">
                    <LuEuro className="text-[#183136] size-9 translate-y-[6px]" />
                    <p className="text-[#183136] font-light text-4xl leading-none">
                      {displayPrice !== null
                        ? displayPrice.toFixed(2)
                        : product?.hasVariants
                        ? 'Select size'
                        : 'Contact us'}
                    </p>
                  </div>
                  <p className="text-[#183136] font-light tracking-wide leading-relaxed">
                    {product?.description ||
                      'No product description available.'}
                  </p>
                </div>

                {/* Size Dropdown */}
                {product?.hasVariants && product.variations.length > 0 && (
                  <div className="relative w-[210px]">
                    <div
                      className="cursor-pointer text-[#183136] text-md pl-3 pr-2 py-4 shadow-md rounded-sm border border-gray-100 flex justify-between items-center"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                      <span>
                        {selectedSize
                          ? selectedSize.charAt(0).toUpperCase() +
                            selectedSize.slice(1)
                          : 'Select size'}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          dropdownOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {dropdownOpen && (
                      <div className="absolute z-50 mt-1 w-full bg-white rounded-sm shadow-md">
                        {['small', 'medium', 'large']
                          .filter((size) =>
                            product.variations.some(
                              (v: { size: string }) => v.size === size
                            )
                          )
                          .map((size) => (
                            <div
                              key={size}
                              className="px-4 py-3 transition-all duration-100 hover:bg-amber-400 cursor-pointer text-[#183136]"
                              onClick={() => {
                                setSelectedSize(size);
                                form.setValue('size', size);
                                setDropdownOpen(false);
                              }}
                            >
                              {size.charAt(0).toUpperCase() + size.slice(1)}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Quantity + Add to Cart */}
                <div className="flex gap-4 justify-start items-center mt-6">
                  <input
                    {...form.register('quantity')}
                    type="number"
                    min={1}
                    placeholder="1"
                    className="w-[120px] text-[#183136] text-lg pl-4 py-2 border border-gray-200 rounded-sm shadow-sm focus:outline-none"
                  />
                  {form.formState.errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.quantity.message}
                    </p>
                  )}

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

              {/* Additional Product Info */}
              <div className="mt-8 flex flex-col gap-4">
                <p className="text-[#183136] text-md font-light tracking-wide">
                  SKU : <span>{product?._id || 'N/A'}</span>
                </p>
                <p className="text-[#183136] text-md font-light tracking-wide">
                  Category : <span>{product?.category?.name || 'N/A'}</span>
                </p>
                <p className="text-[#183136] text-md font-light tracking-wide">
                  Tags : <span>{product?.tags?.join(', ') || 'N/A'}</span>
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
