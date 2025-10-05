'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import z from 'zod';
import Container from '../../container/Container';
import { Button } from '../../ui/button';
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
  const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),

    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Please enter a valid email address.' }),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),

    phone: z
      .string()
      .min(1, { message: 'Phone number is required.' })
      .regex(/^[0-9]{10,15}$/, {
        message: 'Please enter a valid phone number.',
      }),

    address: z.string().min(1, { message: 'Address is required.' }),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  // 3. Hook form
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="">
      <Container>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-0  lg:gap-12  w-full min-h-screen">
          {/* image */}
          <div className="relative w-full  lg:w-1/2 h-100 mt-28 lg:mt-0">
            <Image
              src="/assets/Login.png"
              alt="image"
              fill
              className="md:object-cover object-center"
            />
          </div>

          {/* login form  */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5 items-center bg-[#1b1a1a] mt-16 pb-6 rounded-lg">
            <div className="items-center justify-center">
              <h4 className="text-white text-4xl font-extrabold tracking-wider mt-2">
                Sign Up
              </h4>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" text-white w-full px-1 md:px-4"
              >
                <div className="flex flex-col justify-center items-center gap-3 md:grid md:grid-cols-2 md:gap-3 w-full">
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="tracking-wider text-sm">
                          Full Name
                        </FormLabel>
                        <FormControl className="mb-3">
                          <Input
                            placeholder="Your Full Name"
                            {...field}
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
                        <FormLabel className="tracking-wider text-sm">
                          Email
                        </FormLabel>
                        <FormControl className="mb-3">
                          <Input
                            placeholder="you@example.com"
                            {...field}
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
                        <FormLabel className="text-sm tracking-wider">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                            className="py-6 bg-white text-[#183136] mb-2"
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
                        <FormLabel className="text-sm tracking-wider">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                            className="py-6 bg-white text-[#183136] mb-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/*  phone*/}

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="tracking-wider text-sm">
                          Phone
                        </FormLabel>
                        <FormControl className="mb-3">
                          <Input
                            placeholder="Phone Number"
                            {...field}
                            className="py-6 bg-white text-[#183136]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="tracking-wider text-sm">
                          Address
                        </FormLabel>
                        <FormControl className="mb-3">
                          <Input
                            placeholder="Your Address"
                            {...field}
                            className="py-6 bg-white text-[#183136]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" flex justify-center items-center">
                  <Button
                    type="submit"
                    className=" text-xl text-[#183136] bg-yellow-600 px-16 py-6 mt-6"
                  >
                    Sign Up
                  </Button>
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
