'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'sonner';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../redux/features/cart/cartSlice';
import { useAppDispatch } from '../../redux/hook/hook';
import SecDescription from '../Shared/SecDescription';
import SecMainHeader from '../Shared/SecMainHeader';

interface ICart {
  id: string;
  mongoId: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  size?: string | null;
  hasVariants: boolean;
  totalPrice: number;
}

interface CartProps {
  item: ICart;
}

const Cart: React.FC<CartProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity({ id }));
    toast.success(`${item.name} quantity increased to ${item.quantity + 1}`);
  };

  console.log('size: ', item?.size);

  const handleDecrease = (id: string) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity({ id }));
      toast.success(`${item.name} quantity decreased to ${item.quantity - 1}`);
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart({ id }));
    toast.success(`${item.name} removed from cart!`);
  };

  return (
    <AnimatePresence>
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -200, transition: { duration: 0.3 } }}
        layout
        className="bg-white p-4 rounded-md mb-4"
      >
        <div className="flex justify-between items-start gap-4">
          {/* Image */}
          <div className="flex justify-start items-start gap-6">
            <div className="relative w-30 md:w-40 h-20 md:h-30">
              <Image
                src={item.image || '/placeholder.png'}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-3">
              <Link href={`/product/${item?.slug}`}>
                <SecMainHeader
                  className="text-[#183136] text-lg font-semibold tracking-wide"
                  content={item.name}
                />
              </Link>
              <div className="flex gap-3 items-baseline">
                <del className="text-[#adb6b7] text-lg">
                  &euro;{item.price + 2}
                </del>
                <p className="text-[#183136] text-xl font-semibold">
                  &euro;{item.price}
                </p>
              </div>

              <SecDescription
                className="text-[#183136] text-sm font-light"
                content={item.description}
              />

              {/* size of item */}
              {item?.size && (
                <div className="flex justify-start items-center gap-4">
                  <p className="text-[#183136] text-md font-semibold">Size: </p>
                  <p className="text-[#183136] text-md font-semibold">
                    {item.size}
                  </p>
                </div>
              )}

              {/* Quantity controls with animation */}
              <motion.div
                className="w-[100px] border border-gray-200 rounded-sm flex justify-between items-center px-2 py-2"
                whileTap={{ scale: 0.95 }}
              >
                <button onClick={() => handleDecrease(item.id)}>
                  <AiOutlineMinus className="text-gray-600" />
                </button>
                <motion.p
                  key={item.quantity}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="text-[#183136] font-semibold"
                >
                  {item.quantity}
                </motion.p>
                <button onClick={() => handleIncrease(item.id)}>
                  <AiOutlinePlus className="text-gray-600" />
                </button>
              </motion.div>

              {/* Remove button */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="bg-red-600 rounded-full p-1 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => handleRemove(item.id)}
                >
                  <AiOutlineDelete size={18} className="text-white" />
                </button>
                <p
                  onClick={() => handleRemove(item.id)}
                  className="text-[#183136] text-xs underline cursor-pointer hover:no-underline"
                >
                  Remove Item
                </p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-right flex flex-col items-end gap-2">
            <motion.p
              key={item.totalPrice}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="text-[#183136] text-xl font-semibold"
            >
              &euro;{item.totalPrice}
            </motion.p>
            {/* <button className="border border-[#f99d3a] rounded-sm text-xs font-semibold text-[#f99d3a] w-[80px] py-1 mt-1 hover:bg-[#f99d3a] hover:text-white transition-all">
              Save &euro; 2
            </button> */}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;
