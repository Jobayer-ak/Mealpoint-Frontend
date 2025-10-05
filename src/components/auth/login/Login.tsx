'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import Link from 'next/link';
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

const Login = () => {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Please enter a valid email address.' }),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  // 3. Hook form
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
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
        <div className="flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-12 w-full min-h-screen">
          {/* image */}
          <div className="relative w-full lg:w-1/2 h-100 mt-28 lg:mt-0">
            <Image
              src="/assets/Login.png"
              alt="image"
              fill
              className="md:object-cover object-center"
            />
          </div>

          {/* login form  */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5  items-center bg-[#1b1a1a] mt-16 pb-6 rounded-lg">
            <div className="items-center justify-center">
              <h4 className="text-white text-4xl font-extrabold tracking-wider mt-2">
                Login
              </h4>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="text-white w-full md:w-2/3 px-6 md:px-0"
              >
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

                <div className="flex justify-end items-end">
                  <button
                    type="submit"
                    className="text-blue-500 text-xs tracking-wider cursor-pointer"
                  >
                    Forgot Password
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full text-xl text-[#183136] bg-yellow-600 py-6 mt-6"
                >
                  Sign In
                </Button>
              </form>
            </Form>
            {/* social login */}
            <p className="text-md text-white">Or continue with </p>

            {/* Google login */}
            <div className="flex justify-center items-center gap-6">
              <button
                type="button"
                className="px-12 py-2 rounded-3xl bg-white cursor-pointer"
              >
                <FcGoogle size={28} />
              </button>

              {/* Facebook login */}
              <button
                type="button"
                className="px-12 py-2 rounded-3xl bg-white cursor-pointer"
              >
                <FaFacebook size={28} fill="blue" />
              </button>
            </div>

            <p className="text-md text-white font-light">
              Don&apos;t have an account yet?{' '}
              <span className="font-semibold underline underline-offset-4 decoration-[#d08b2f]">
                <Link href="/auth/signup">Register for free</Link>
              </span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
