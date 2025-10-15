'use client';

import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VscChromeClose } from 'react-icons/vsc';
import { toast } from 'sonner';
import { removeFromCart } from '../../redux/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook/hook';

interface IRemoveItemProps {
  id: string;
  itemName: string;
}

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
export default function CartDropdown({ isOpen, className }: CartDropdownProps) {
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const total = items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = ({ id, itemName }: IRemoveItemProps) => {
    dispatch(removeFromCart({ id }));
    toast.success(`${itemName} removed from cart!`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-dropdown"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.25 }}
          className={`w-full sm:w-110 bg-white shadow-2xl rounded-sm mt-2 p-4 origin-top-right ${className}`}
        >
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Your cart is empty! <br />
              Please add products!
            </p>
          ) : (
            <>
              <div className="space-y-3 max-h-75 overflow-y-auto scrollbar-none">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="relative flex items-center justify-between shadow-lg rounded-sm p-2 group hover:bg-gray-50 transition"
                  >
                    {/* Left: Image + Info */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-24 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="rounded-l-sm object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/product/${item?.slug}`}>
                          <p className="font-medium text-[#183136]">
                            {item.name}
                            {item.size ? ` - ${item.size}` : ''}
                          </p>
                          <p className="text-sm text-gray-500">
                            &euro;{item.price} × {item.quantity}
                          </p>
                        </Link>
                      </div>
                    </div>

                    {/* Right: Price + Close Icon */}
                    <div className="">
                      <button
                        className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition cursor-pointer"
                        onClick={() =>
                          handleRemove({ id: item?.id, itemName: item?.name })
                        }
                        aria-label="Remove item"
                      >
                        <VscChromeClose size={18} />
                      </button>
                      <p className="font-semibold text-[#183136]">
                        &euro;{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center my-6 pt-6 border-t border-gray-200">
                <span className="text-[#183136] text-md font-semibold uppercase tracking-wider">
                  Subtotal:
                </span>
                <span className="text-xl font-semibold text-[#183136]">
                  <span className="font-normal text-md">&euro;</span>
                  {total.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 mb-2 flex gap-3">
                <Button
                  className="flex-1 bg-[#f19e38] text-[#183136] cursor-pointer uppercase font-bold tracking-wider py-6 transition-all duration-300 hover:bg-[#e09335]"
                  onClick={() => router.push('/cart')}
                >
                  View Cart
                </Button>
                <Button
                  className="flex-1 bg-[#f19e38] text-[#183136] cursor-pointer uppercase font-bold tracking-wider py-6 transition-all duration-300 hover:bg-[#e09335]"
                  onClick={() => router.push('/checkout')}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
