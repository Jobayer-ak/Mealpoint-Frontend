/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
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
import { Spinner } from '../../ui/spinner';

const Login = () => {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Credentials login
  const onSubmit = async (values: FormSchemaType) => {
    setIsSubmitting(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        toast.error('Invalid email or password');
        return;
      }

      toast.success('Login successful!');
      router.push('/');
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (err: any) {
      toast.error(err?.message || 'Google login failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-12 w-full min-h-screen">
        {/* Image */}
        <div className="relative w-full lg:w-1/2 h-100 mt-28 lg:mt-0">
          <Image
            src="/assets/Login.png"
            alt="Login image"
            fill
            className="md:object-cover object-center"
          />
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5 items-center bg-[#1b1a1a] mt-16 pb-6 rounded-lg">
          <h4 className="text-white text-4xl font-extrabold tracking-wider mt-2">
            Login
          </h4>

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
                    <FormLabel>Email</FormLabel>
                    <FormControl className="mb-3">
                      <Input
                        {...field}
                        placeholder="you@example.com"
                        className="py-6 bg-white text-[#183136]"
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end items-end mb-4">
                <button
                  type="button"
                  className="text-blue-500 text-xs tracking-wider cursor-pointer"
                  disabled={isSubmitting}
                >
                  Forgot Password
                </button>
              </div>

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                isLoading={isSubmitting}
                loadingText="Logging in..."
                className="w-full text-xl text-[#183136] bg-yellow-600 py-6 mt-2"
              >
                Login
              </LoadingButton>
            </form>
          </Form>

          {/* Social login */}
          <p className="text-md text-white mt-4">Or continue with</p>

          <div className="flex justify-center items-center gap-6 mt-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading || isSubmitting}
              className="px-12 py-2 rounded-md bg-white cursor-pointer disabled:opacity-70 flex items-center justify-center"
            >
              {googleLoading ? (
                <Spinner className="size-5" />
              ) : (
                <FcGoogle size={28} />
              )}
            </button>
          </div>

          <p className="text-md text-white font-light mt-4">
            Don&apos;t have an account yet?{' '}
            <Link
              href="/auth/signup"
              className="font-semibold underline underline-offset-4 decoration-[#d08b2f]"
            >
              Register for free
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
