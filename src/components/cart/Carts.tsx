/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FaAngleDown } from 'react-icons/fa';
import { useAppSelector } from '../../redux/hook/hook';
import Container from '../container/Container';
import BottomShadow from '../Shared/BottomShadow';
import ButtonComp from '../Shared/ButtonComp';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import CartDetails from './CartDetails';

const Carts = () => {
  const data = useAppSelector((state) => state.cart);

  const total = data?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log('Items: ', data);

  return (
    <div className="mt-28">
      <Container>
        <div className="bg-white px-3 md:px-12 py-12 rounded-md relative">
          {/* top shadow */}
          <TopShadow />

          <div>
            <SecMainHeader
              className="text-[#183136] text-4xl lg:text-5xl  text-left font-extrabold"
              content={'Cart'}
            />
          </div>

          <div className="flex flex-col gap-15 md:flex-row justify-between items-baseline md:gap-0 py-5">
            {/* product cards of left side*/}
            <div className="w-full md:w-3/5 shadow-lg py-5 ">
              {/* carts heading and total */}
              <div className="hidden md:block">
                <div className="flex justify-between items-center px-5 mb-4">
                  <p className="text-sm text-[#183136] font-semibold tracking-widest uppercase">
                    Product
                  </p>
                  <p className="text-sm text-[#183136] font-semibold tracking-widest uppercase">
                    Total
                  </p>
                </div>
              </div>

              {/* Horizontal line */}
              <HorizontalLine />

              {/* carts with details */}
              <AnimatePresence>
                <div className="px-0 md:px-5 mt-5">
                  <div className="flex flex-col gap-4">
                    {data?.items?.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -200 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        layout
                      >
                        <CartDetails key={i} item={item} />
                        <HorizontalLine />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatePresence>
            </div>

            {/* Cart totals of Right side */}
            <div className="w-full md:w-3/8  pb-2">
              <div className="shadow-lg mb-3">
                <div className="px-5 mb-4">
                  <p className="text-md text-[#183136] font-semibold tracking-widest uppercase ">
                    Cart Totals
                  </p>
                </div>
                {/* Horizontal line */}
                <HorizontalLine />

                <div className="">
                  <div className="flex justify-between items-center px-5 py-4 cursor-pointer">
                    <p className="text-[#183136] text-md font-light tracking-widest">
                      Add a coupon
                    </p>

                    <FaAngleDown size={20} className="fill-[#183136] " />
                  </div>

                  {/* Horizontal line */}
                  <HorizontalLine />

                  <div className="flex justify-between items-center px-5 py-4">
                    <p className="text-[#183136] text-xl font-extrabold tracking-widest">
                      Estimated Total:
                    </p>

                    <p className="text-[#183136] text-xl font-extrabold ">
                      &euro; {data?.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* proceed button */}
              <Link href="/checkout">
                <ButtonComp
                  className="bg-[#f99d3a] text-[#183136] text-md uppercase tracking-widest px-4 py-8 mt-3 w-full cursor-pointer"
                  content="Proceed to checkout "
                />
              </Link>
            </div>
          </div>

          {/* Bottom shadow */}
          <BottomShadow />
        </div>
      </Container>
    </div>
  );
};

export default Carts;
