'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  quantity: z
    .string()
    .min(1, { message: 'Quantity is required' })
    .regex(/^[1-9]\d*$/, { message: 'Enter a valid positive number' }),
});

interface QuantitySelectorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  min?: number;
  max?: number;
}

const QuantitySelector = ({
  defaultValue = '1',
  onChange,
  className = '',
  min = 1,
  max = 99,
}: QuantitySelectorProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { quantity: defaultValue },
    mode: 'onChange',
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input
                {...field}
                type="number"
                inputMode="numeric"
                min={min}
                max={max}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  onChange?.(value);
                }}
                className={`text-[#183136] text-lg md:text-md pl-4 pr-2 py-6 rounded-sm border-none transition-all duration-200 ${className}`}
                placeholder="1"
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default QuantitySelector;
