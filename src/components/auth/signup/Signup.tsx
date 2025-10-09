/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import Container from '../../container/Container';
import LoadingButton from '../../Shared/LoadingButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';

const Signup = () => {
  const router = useRouter();
  // const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Zod schema with confirm password
  const formSchema = z
    .object({
      name: z.string().min(1, { message: 'Name is required.' }),
      email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Please enter a valid email address.' }),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long.' }),
      confirmPassword: z.string().min(6, { message: 'Confirm your password.' }),
      phone: z
        .string()
        .min(1, { message: 'Phone number is required.' })
        .regex(/^[0-9]{10,15}$/, {
          message: 'Please enter a valid phone number.',
        }),
      address: z.string().min(1, { message: 'Address is required.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'], // Shows error under confirmPassword field
    });

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      let data: any;
      try {
        data = await res.json();
      } catch (err) {
        data = { message: res.statusText || 'Invalid response from server' };
      }

      if (!res.ok) {
        toast.error(data.message || 'Signup failed');
        return;
      }

      toast.success('Signup successful! You can now login.');
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Container>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-12 w-full min-h-screen">
          {/* image */}
          <div className="relative w-full lg:w-1/2 h-100 mt-28 lg:mt-0">
            <Image
              src="/assets/Login.png"
              alt="Signup image"
              fill
              className="md:object-cover object-center"
            />
          </div>

          {/* signup form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5 items-center bg-[#1b1a1a] mt-16 pb-6 rounded-lg">
            <h4 className="text-white text-4xl font-extrabold tracking-wider mt-2">
              Sign Up
            </h4>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="text-white w-full px-1 md:px-4"
              >
                <div className="flex flex-col justify-center items-center gap-3 md:grid md:grid-cols-2 md:gap-3 w-full">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your Full Name"
                            className="py-6 bg-white text-[#183136]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="you@example.com"
                            className="py-6 bg-white text-[#183136]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="******"
                            className="py-6 bg-white text-[#183136]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="******"
                            className="py-6 bg-white text-[#183136]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Phone Number"
                            className="py-6 bg-white text-[#183136]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your Address"
                            className="py-6 bg-white text-[#183136]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-center items-center mt-6">
                  <LoadingButton
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Logging in..."
                    className="w-1/3 text-xl text-[#183136] bg-yellow-600 py-6 mt-2"
                  >
                    Signup
                  </LoadingButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
