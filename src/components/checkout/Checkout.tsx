'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';
import z from 'zod';
import { useAppSelector } from '../../redux/hook/hook';
import Container from '../container/Container';
import ButtonComp from '../Shared/ButtonComp';
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
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
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

const Checkout = () => {
  const [value, setValue] = useState('item-1');

  const { items } = useAppSelector((state) => state.cart);

  console.log('Items: ', items);

  const formSchema = z.object({
    search: z
      .string()
      .min(2, { message: 'Search must be at least 2 characters' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="mt-28">
      <Container>
        <div className="bg-white px-3 md:px-12 py-12 rounded-md relative">
          {/* top shadow */}
          <TopShadow />

          <SecMainHeader
            className="text-[#183136] text-5xl  text-left font-extrabold"
            content={'Checkout'}
          />

          {/* main content */}
          <div className="w-full flex flex-col-reverse lg:flex-row items-stretch gap-8 lg:gap-8 py-5">
            {/* left content */}
            <div className="w-full lg:w-3/5 py-5 border-t-1 border-gray-300">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full"
                >
                  <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            {/* form field */}

                            <div className="shadow-md px-3 md:px-6 py-4">
                              {/* Contact information */}
                              <div className="flex flex-col gap-6 mb-6 ">
                                <SecMainHeader
                                  className="text-[#183136] text-xl  text-left font-extrabold tracking-wider"
                                  content={'Contact Information'}
                                />
                                <div className="">
                                  <SecDescription
                                    className="text-[#183136] w-full px-0 md:text-start text-md tracking-wider font-light leading-7"
                                    content={
                                      "We'll use this email to send you details and updates about your order."
                                    }
                                  />
                                </div>

                                <Input
                                  placeholder="Email address"
                                  {...field}
                                  className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-6 w-full sm:w-[350px] md:w-full"
                                />
                              </div>
                            </div>
                            {/* ###################################### */}

                            {/* Billing address */}
                            <div className="shadow-md px-3 md:px-6 py-4 mt-6">
                              <div className="flex flex-col gap-6 mb-6 ">
                                <SecMainHeader
                                  className="text-[#183136] text-xl  text-left font-extrabold tracking-wider "
                                  content={'Billing address'}
                                />

                                <SecDescription
                                  className="text-[#183136] w-full px-0 text-start text-md tracking-wider font-light leading-7"
                                  content={
                                    'Enter the billing address that matches your payment method.'
                                  }
                                />

                                {/* select */}
                                <div className=" relative">
                                  <Select>
                                    <SelectTrigger className=" text-[#183136] text-md pl-4 pr-2 py-6 shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 w-full">
                                      <SelectValue
                                        placeholder="Area"
                                        className="text-md"
                                      />
                                    </SelectTrigger>
                                    <SelectContent
                                      position="popper"
                                      className="rounded-sm border-none bg-white w-full sm:w-[350px] md:w-full max-h-60 overflow-y-auto"
                                    >
                                      <SelectGroup className="w-full sm:w-[350px] md:w-full">
                                        <SelectLabel className="text-md font-bold">
                                          Select your area
                                        </SelectLabel>

                                        <SelectItem
                                          value="charpara"
                                          className="bg-amber-100 mb-1 pl-2"
                                        >
                                          Charpara
                                        </SelectItem>
                                        <SelectItem
                                          value="maskanda"
                                          className="bg-amber-100 mb-1 pl-2"
                                        >
                                          Maskanda
                                        </SelectItem>
                                        <SelectItem
                                          value="shankipara"
                                          className="bg-amber-100 mb-1 pl-2"
                                        >
                                          Shankipara
                                        </SelectItem>
                                        <SelectItem
                                          value="cantonment"
                                          className="bg-amber-100 mb-1 pl-2"
                                        >
                                          Cantonment
                                        </SelectItem>
                                        <SelectItem
                                          value="akua"
                                          className="bg-amber-100 mb-1 pl-2"
                                        >
                                          Akua
                                        </SelectItem>
                                        <SelectItem
                                          value="nowmohall"
                                          className="bg-amber-100 mb-1 pl-2"
                                        >
                                          Nowmohall
                                        </SelectItem>
                                        <SelectItem
                                          value="panditpara"
                                          className="bg-amber-100 mb-1 pl-2"
                                        >
                                          Panditpara
                                        </SelectItem>
                                        <SelectItem
                                          value="kalibari"
                                          className="bg-amber-100 mb-1 pl-2"
                                        >
                                          Kalibari
                                        </SelectItem>
                                        <SelectItem
                                          value="vatikashor"
                                          className="bg-amber-100 mb-1 pl-2"
                                        >
                                          Vatikashor
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>

                                {/* form field */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                  <Input
                                    placeholder="First name"
                                    {...field}
                                    className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                  />
                                  <Input
                                    placeholder="Last name"
                                    {...field}
                                    className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                  />
                                </div>

                                <Input
                                  placeholder="Address"
                                  {...field}
                                  className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                />

                                <Input
                                  placeholder="Road No., Apartment, suite, etc."
                                  {...field}
                                  className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                  <Input
                                    placeholder="Phone number"
                                    {...field}
                                    className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                  />
                                  <Input
                                    placeholder="Phone number (optional)"
                                    {...field}
                                    className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Payment options */}
                            <div className="shadow-md px-3 md:px-6 py-4 my-12 ">
                              <SecMainHeader
                                className="text-[#183136] mb-6 text-xl  text-left font-extrabold tracking-wider"
                                content={'Payment Options'}
                              />
                              <div className=" ">
                                <div className="border-1 border-gray-200">
                                  <Accordion
                                    type="single"
                                    collapsible
                                    value={value}
                                    onValueChange={setValue} // control accordion with state
                                    className="w-full [&>[data-state]]:m-0"
                                  >
                                    <RadioGroup
                                      value={value}
                                      onValueChange={setValue}
                                      className="space-y-0"
                                    >
                                      {/* Direct Bank Transfer */}
                                      <AccordionItem
                                        value="item-1"
                                        className="pl-3 py-3"
                                      >
                                        <div className="flex gap-3">
                                          <RadioGroupItem
                                            value="item-1"
                                            id="r1"
                                            className="h-6 w-6 border-1 border-gray-400 data-[state=checked]:bg-[#efb536] rounded-full"
                                          />
                                          <Label
                                            htmlFor="r1"
                                            className="text-[#183136] text-lg font-light tracking-wider"
                                          >
                                            Direct Bank Transfer
                                          </Label>
                                        </div>
                                        <AccordionContent className="text-balance text-[#183136] text-lg font-light leading-6 px-2 pt-2">
                                          Make your payment directly into our
                                          bank account. Please use your Order ID
                                          as the payment reference. Your order
                                          will not be shipped until the funds
                                          have cleared in our account.
                                        </AccordionContent>
                                      </AccordionItem>

                                      {/* Online Payment */}
                                      <AccordionItem
                                        value="item-2"
                                        className="pl-3 py-3"
                                      >
                                        <div className="flex gap-3">
                                          <RadioGroupItem
                                            value="item-2"
                                            id="r2"
                                            className="h-6 w-6 border-1 border-gray-400 data-[state=checked]:bg-[#efb536] rounded-full"
                                          />
                                          <Label
                                            htmlFor="r2"
                                            className="text-[#183136] text-xl font-light tracking-wider"
                                          >
                                            Online Payment
                                          </Label>
                                        </div>
                                        <AccordionContent className="text-balance text-[#183136] text-lg font-light leading-6 px-2 pt-2">
                                          You can pay using digital payment
                                          options.
                                        </AccordionContent>
                                      </AccordionItem>

                                      {/* COD */}
                                      <AccordionItem
                                        value="item-3"
                                        className=" pl-3 py-3"
                                      >
                                        <div className="flex gap-3">
                                          <RadioGroupItem
                                            value="item-3"
                                            id="r3"
                                            className="h-6 w-6 border-1 border-gray-400 data-[state=checked]:bg-[#efb536] rounded-full"
                                          />
                                          <Label
                                            htmlFor="r3"
                                            className="text-[#183136] text-xl font-light tracking-wider"
                                          >
                                            Cash On Delivery (COD)
                                          </Label>
                                        </div>
                                        <AccordionContent className="text-balance text-[#183136] text-lg font-light leading-6 px-2 pt-2">
                                          Pay with cash upon delivery.
                                        </AccordionContent>
                                      </AccordionItem>
                                    </RadioGroup>
                                  </Accordion>
                                </div>
                              </div>
                            </div>

                            {/* check box */}
                            <div className="flex items-center gap-4 pl-6 py-5 mb-12 border-1 border-gray-100 shadow-md mt-4">
                              <Checkbox
                                id="terms"
                                className="size-5 border-1 border-gray-400"
                              />
                              <Label
                                htmlFor="terms"
                                className="font-light tracking-wider text-md"
                              >
                                Add a note to your order.
                              </Label>
                            </div>

                            {/* horizontal line */}
                            <HorizontalLine />

                            <p className="text-[#183136] text-lg font-light my-12">
                              By proceeding with your purchase you agree to our
                              Terms and Conditions and Privacy Policy
                            </p>

                            {/* Buttons */}
                            <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                              <div className="flex items-center gap-0 px-3 cursor-pointer">
                                <GoArrowLeft className="size-5 mb-[5px]" />
                                <ButtonComp
                                  className="text-lg tracking-wider cursor-pointer font-light pl-2"
                                  content="Return To Cart "
                                />
                              </div>
                              <ButtonComp
                                className="bg-[#f29e38] text-sm text-[#183136] py-6 px-6 w-full sm:w-[300px] uppercase tracking-widest cursor-pointer"
                                content="Place Order"
                              />
                            </div>

                            {/* ############################################## */}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>

            {/* right content */}
            <div className="w-full lg:w-3/8 py-5 pb-2 border-t-1 border-gray-300">
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

                {/* <SummaryItem />
                <SummaryItem /> */}

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
                            className="mt-2 text-[#183136] text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-300 py-7 tracking-wider w-full sm:w-auto"
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
              </div>
            </div>
          </div>

          {/* Bottom shadow */}
          {/* <BottomShadow /> */}
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
