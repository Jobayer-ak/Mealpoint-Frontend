/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { loadStripe } from '@stripe/stripe-js';
import { City, Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useAppSelector } from '../../redux/hook/hook';
import Container from '../container/Container';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import SecDescription from '../Shared/SecDescription';
import SecMainHeader from '../Shared/SecMainHeader';
import TopShadow from '../Shared/TopShadow';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import SummaryItem from './SummaryItem';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

// ---------------------------
// Zod schema
// ---------------------------
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  postalCode: z.string().min(1, { message: 'Postal code is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  apartment: z.string().optional(),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  phone2: z.string().optional(),
  discountId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const [value, setValue] = useState('item-1');
  const [loading, setLoading] = useState(false);

  const { items } = useAppSelector((state) => state.cart);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
      address: '',
      apartment: '',
      phone: '',
      phone2: '',
      discountId: '',
    },
  });

  // country-state-city
  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);
  const [cities, setCities] = useState<{ name: string }[]>([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    setCountries(
      Country.getAllCountries().map((c) => ({
        name: c.name,
        isoCode: c.isoCode,
      }))
    );
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const allStates = State.getStatesOfCountry(selectedCountry).map((s) => ({
      name: s.name,
      isoCode: s.isoCode,
    }));
    setStates(allStates);
    setSelectedState('');
    setCities([]);
    setSelectedCity('');
    form.setValue('country', selectedCountry, { shouldValidate: true });
  }, [selectedCountry, form]);

  useEffect(() => {
    if (!selectedState || !selectedCountry) return;
    const allCities = City.getCitiesOfState(selectedCountry, selectedState).map(
      (c) => ({ name: c.name })
    );
    setCities(allCities);
    setSelectedCity('');
    form.setValue('state', selectedState, { shouldValidate: true });
  }, [selectedState, selectedCountry, form]);

  useEffect(() => {
    form.setValue('city', selectedCity, { shouldValidate: true });
  }, [selectedCity, form]);

  // Build order items
  const buildOrderItems = () =>
    (items || []).map((it: any) => {
      const itemType =
        it.type ||
        (it.comboItemId || it.combo || it.isCombo ? 'combo' : 'menu');
      if (itemType === 'combo') {
        return {
          comboItemId: it.comboItemId || it.mongoId || it.id,
          quantity: it.quantity || 1,
          type: 'combo',
        };
      } else {
        const menuObj: any = {
          menuItemId: it.menuItemId || it.mongoId || it.id,
          quantity: it.quantity || 1,
          type: 'menu',
        };
        if (it.size) menuObj.size = it.size;
        return menuObj;
      }
    });

  const createOrder = async (values: FormValues) => {
    const deliveryAddressParts = [
      values.address,
      values.apartment?.trim() || null,
      values.city,
      values.state,
      values.country,
    ].filter(Boolean);

    const deliveryAddress = deliveryAddressParts.join(', ');

    const orderBody: any = {
      type: 'delivery',
      deliveryAddress,
      items: buildOrderItems(),
      discountId: values.discountId || undefined,
      customer: {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        phone2: values.phone2,
        postalCode: values.postalCode,
      },
    };

    const res = await fetch('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderBody),
    });

    if (!res.ok)
      throw new Error(
        `Order creation failed: ${
          (await res.text().catch(() => null)) || res.statusText
        }`
      );
    return res.json();
  };

  const initiatePayment = async (orderId: string) => {
    const res = await fetch('/payment/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });

    if (!res.ok)
      throw new Error(
        `Payment initiation failed: ${
          (await res.text().catch(() => null)) || res.statusText
        }`
      );

    const data = await res.json();
    const clientSecret = data?.checkoutSession?.clientSecret;
    const redirectUrl =
      data?.checkoutSession?.url || data?.checkoutSession?.redirect_url;

    if (!clientSecret && !redirectUrl)
      throw new Error(
        'Payment initiation returned no clientSecret or redirect url.'
      );
    if (clientSecret) {
      const stripe = await (stripePromise ??
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!));
      if (!stripe) throw new Error('Stripe failed to load.');

      await stripe.initEmbeddedCheckout({ clientSecret });
      return;
    }
    if (redirectUrl) window.location.href = redirectUrl;
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const orderResp = await createOrder(values);
      const orderId = orderResp?.order?.id || orderResp?.id || orderResp?._id;
      if (!orderId) throw new Error('Order created but no order id returned.');

      if (value === 'item-3')
        window.location.href = `/payment/success?orderId=${orderId}`;
      else if (value === 'item-1')
        window.location.href = `/payment/bank-details?orderId=${orderId}`;
      else if (value === 'item-2') await initiatePayment(orderId);
    } catch (err: any) {
      console.error('Checkout submit error:', err);
      alert(err?.message || 'Something went wrong while placing order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-28">
      <Container>
        <div className="bg-white px-3 md:px-12 py-12 rounded-md relative">
          <TopShadow />

          <SecMainHeader
            className="text-[#183136] text-5xl  text-left font-extrabold"
            content={'Checkout'}
          />

          <div className="w-full flex flex-col-reverse lg:flex-row items-stretch gap-8 lg:gap-8 py-5">
            {/* Left Form */}
            <div className="w-full lg:w-3/5 py-5 border-t-1 border-gray-300">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full"
                >
                  {/* Contact Info */}
                  <div className="shadow-md px-3 md:px-6 py-4">
                    <div className="flex flex-col gap-6 mb-6 ">
                      <SecMainHeader
                        className="text-[#183136] text-xl text-left font-extrabold tracking-wider"
                        content={'Contact Information'}
                      />
                      <SecDescription
                        className="text-[#183136] w-full px-0 md:text-start text-md tracking-wider font-light leading-7"
                        content={
                          "We'll use this email to send you details and updates about your order."
                        }
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Email address"
                                {...field}
                                className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-6 w-full sm:w-[350px] md:w-full"
                              />
                            </FormControl>
                            {fieldState.error && (
                              <p className="text-red-500 text-sm mt-1">
                                {fieldState.error.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="shadow-md px-3 md:px-6 py-4 mt-6">
                    <div className="flex flex-col gap-6 mb-6">
                      <SecMainHeader
                        className="text-[#183136] text-xl text-left font-extrabold tracking-wider"
                        content={'Billing address'}
                      />
                      <SecDescription
                        className="text-[#183136] w-full px-0 text-start text-md tracking-wider font-light leading-7"
                        content={
                          'Enter the billing address that matches your payment method.'
                        }
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="First name"
                                  {...field}
                                  className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                />
                              </FormControl>
                              {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Last name"
                                  {...field}
                                  className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                />
                              </FormControl>
                              {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Country */}
                      <FormField
                        control={form.control}
                        name="country"
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <Select
                                value={selectedCountry}
                                onValueChange={setSelectedCountry}
                              >
                                <SelectTrigger className="text-[#183136] text-md pl-4 pr-2 py-6 shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 w-full">
                                  <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-none bg-white w-full max-h-60 overflow-y-auto">
                                  <SelectGroup>
                                    <SelectLabel className="text-md font-bold">
                                      Country
                                    </SelectLabel>
                                    {countries.map((c) => (
                                      <SelectItem
                                        key={c.isoCode}
                                        value={c.isoCode}
                                      >
                                        {c.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {form.formState.errors.country && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.country?.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />

                      {/* State */}
                      <FormField
                        control={form.control}
                        name="state"
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <Select
                                value={selectedState}
                                onValueChange={setSelectedState}
                                disabled={!selectedCountry}
                              >
                                <SelectTrigger className="text-[#183136] text-md pl-4 pr-2 py-6 shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 w-full">
                                  <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-none bg-white w-full max-h-60 overflow-y-auto">
                                  <SelectGroup>
                                    <SelectLabel className="text-md font-bold">
                                      State
                                    </SelectLabel>
                                    {states.map((s) => (
                                      <SelectItem
                                        key={s.isoCode}
                                        value={s.isoCode}
                                      >
                                        {s.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {form.formState.errors.state && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.state?.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />

                      {/* City */}
                      <FormField
                        control={form.control}
                        name="city"
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <Select
                                value={selectedCity}
                                onValueChange={setSelectedCity}
                                disabled={!selectedState}
                              >
                                <SelectTrigger className="text-[#183136] text-md pl-4 pr-2 py-6 shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 w-full">
                                  <SelectValue placeholder="Select City" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-none bg-white w-full max-h-60 overflow-y-auto">
                                  <SelectGroup>
                                    <SelectLabel className="text-md font-bold">
                                      City
                                    </SelectLabel>
                                    {cities.map((c) => (
                                      <SelectItem key={c.name} value={c.name}>
                                        {c.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {form.formState.errors.city && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.city?.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />

                      {/* Address */}
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Address"
                                {...field}
                                className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                              />
                            </FormControl>
                            {fieldState.error && (
                              <p className="text-red-500 text-sm mt-1">
                                {fieldState.error.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="apartment"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Apartment, suite, etc. (optional)"
                                {...field}
                                className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Phone number"
                                  {...field}
                                  className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                />
                              </FormControl>
                              {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone2"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Phone number (optional)"
                                  {...field}
                                  className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Options & rest of form */}
                  {/* ... keep your Accordion, Checkbox, Buttons, HorizontalLine here exactly as in your original code */}
                  {/* Make sure <ButtonComp type="submit" /> is used to submit the form */}
                </form>
              </Form>
            </div>

            {/* Right content (Order Summary) */}
            {/* right content */}
            <div className="w-full  lg:w-3/8 py-5 pb-2 border-t-1 border-gray-300">
              {/* Mobile: accordion summary */}
              <div className="shadow-md lg:hidden">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  <AccordionItem value="item-1" className="px-3 py-3">
                    <AccordionTrigger className="text-[#183136] text-md md:text-lg lg:text-md font-bold tracking-wider mb-4 ml-2 lg:ml-0">
                      Order Summery
                    </AccordionTrigger>
                    <AccordionContent>
                      {items?.map((item) => (
                        <div className="flex flex-col" key={item?.mongoId}>
                          <SummaryItem
                            id={item?.id}
                            _id={item?.mongoId}
                            name={item?.name}
                            image={item?.image}
                            quantity={item?.quantity}
                            description={item?.description}
                            hasVariants={item?.hasVariants}
                            size={item?.size}
                            price={item?.price}
                            totalPrice={item?.totalPrice}
                          />
                        </div>
                      ))}

                      {/* horizontal line */}
                      <HorizontalLine />

                      {/* coupon accordion */}
                      <div className="my-4">
                        <Accordion
                          type="single"
                          collapsible
                          className="w-full "
                          defaultValue="item-1"
                        >
                          <AccordionItem value="item-1" className="px-3">
                            <AccordionTrigger className="text-[#183136] text-md md:text-lg lg:text-md font-bold tracking-wide cursor-pointer hover:no-underline focus:no-underline">
                              Add a coupon
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-baseline gap-3">
                                <Input
                                  placeholder="Enter Coupon Code"
                                  // {...field}
                                  className="mt-2 text-black text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-300 py-7 tracking-wider w-full sm:w-auto"
                                />

                                <button className="w-full sm:w-[200px] px-4 py-[15px] bg-[#f29e38] text-xl text-[#183136] rounded-sm tracking-widest cursor-pointer">
                                  Apply
                                </button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* horizontal line */}
                      <HorizontalLine />

                      {/* subtotal */}
                      <div className="my-4 px-2 flex justify-between items-center">
                        <p className="text-[#183136] text-xl font-semibold tracking-wider">
                          Subtotal
                        </p>

                        <p className="inline-flex items-baseline text-[#183136]">
                          <span className="text-xl">$</span>
                          <span className=" text-xl">10.00</span>
                        </p>
                      </div>

                      {/* horizontal line */}
                      <HorizontalLine />

                      {/* Total */}
                      <div className="my-4 px-2 flex justify-between items-center">
                        <p className="text-[#183136] text-xl font-bold tracking-wider">
                          Total
                        </p>

                        <p className="inline-flex items-baseline text-[#183136] font-bold">
                          <span className="text-xl">$</span>
                          <span className=" text-xl">57.00</span>
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Desktop: sticky summary */}
              <div className="shadow-md pb-2 hidden lg:block">
                <SecMainHeader
                  className="text-[#183136] text-xl font-bold tracking-wider ml-2 mb-6"
                  content="Order Summary"
                />

                <div className="max-h-60 overflow-y-auto">
                  {items?.map((item) => (
                    <div className="" key={item.mongoId}>
                      <SummaryItem
                        id={item?.id}
                        _id={item?.mongoId}
                        name={item?.name}
                        image={item?.image}
                        quantity={item?.quantity}
                        description={item?.description}
                        hasVariants={item?.hasVariants}
                        size={item?.size}
                        price={item?.price}
                        totalPrice={item?.totalPrice}
                      />
                    </div>
                  ))}
                </div>

                {/* horizontal line */}
                <HorizontalLine />

                {/* coupon accordion */}
                <div className="py-2">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full "
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-1" className="px-3 py-3">
                      <AccordionTrigger className="text-[#183136] text-md font-bold tracking-wide cursor-pointer hover:no-underline focus:no-underline">
                        Add a coupon
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-baseline gap-3">
                          <Input
                            placeholder="Enter Coupon Code"
                            // {...field}
                            className="mt-2 text-[#183136] text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-300 py-5 tracking-wider w-full sm:w-auto"
                          />

                          <button className="w-full sm:w-[200px] px-4 py-2 bg-[#f29e38] text-lg text-[#183136] rounded-sm tracking-widest cursor-pointer">
                            Apply
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* horizontal line */}
                <HorizontalLine />

                {/* subtotal */}
                <div className="my-4 px-2 flex justify-between items-center">
                  <p className="text-[#183136] text-lg font-semibold tracking-wider">
                    Subtotal
                  </p>

                  <p className="inline-flex items-baseline text-[#183136]">
                    <span className="text-xl">$</span>
                    <span className=" text-xl">10.00</span>
                  </p>
                </div>

                {/* horizontal line */}
                <HorizontalLine />

                {/* Total */}
                <div className="my-4 px-2 flex justify-between items-center">
                  <p className="text-[#183136] text-xl font-bold tracking-wider">
                    Total
                  </p>

                  <p className="inline-flex items-baseline text-[#183136] font-bold">
                    <span className="text-xl">$</span>
                    <span className=" text-xl">57.00</span>
                  </p>
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
