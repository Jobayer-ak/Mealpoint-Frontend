'use client';

import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook/hook';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ''
);

interface StripePaymentButtonProps {
  userId: string;
  orderId: string;
  className?: string;
  buttonText?: string;
}

export default function StripePaymentButton({
  userId,
  orderId,
  className = '',
  buttonText = 'Pay Now',
}: StripePaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const { items } = useAppSelector((state) => state.cart);

  const handlePayment = async () => {
    if (!userId || !orderId) {
      toast.error('Missing order or user information.');
      return;
    }

    if (!items || items.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Creating Stripe session...');

    try {
      const payload = {
        userId,
        orderId,
        items: items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        method: 'stripe',
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/initiate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Payment initiation failed');
      }

      const data = await response.json();
      const sessionUrl = data?.checkoutSession?.url;

      if (!sessionUrl) {
        throw new Error('No Stripe session URL received.');
      }

      toast.success('Redirecting to Stripe checkout...', { id: toastId });
      window.location.href = sessionUrl;
    } catch (error: any) {
      console.error('Stripe payment error:', error);
      toast.error(error.message || 'Something went wrong during payment.', {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={handlePayment}
      className={`bg-[#f29e38] hover:bg-[#e69531] text-sm text-[#183136] py-6 px-6 w-full sm:w-[300px] uppercase tracking-widest cursor-pointer transition-colors duration-300 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
}
