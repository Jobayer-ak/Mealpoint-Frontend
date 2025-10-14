'use client';

import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useAppSelector } from '../../redux/hook/hook';

export default function CartDropdown() {
  const data = useAppSelector((state) => state.cart);
  const cartItems = data?.items;

  console.log(cartItems);

  return (
    <div className="relative">
      {/* Dropdown */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-2xl p-4 z-50"
        >
          <h3 className="text-lg font-semibold mb-3">Shopping Cart</h3>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-xl p-2"
                >
                  <div className="flex items-center space-x-3 relative">
                    <Image
                      src={item.image || 'product image'}
                      alt={item.name || 'product name'}
                      fill
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Total + Buttons */}
          {cartItems.length > 0 && (
            <>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-700 font-semibold">Total:</span>
                <span className="text-lg font-bold">
                  ${data?.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                  onClick={() => {
                    window.location.href = '/cart';
                  }}
                >
                  View Cart
                </Button>
                <Button
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => {
                    window.location.href = '/checkout';
                  }}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
