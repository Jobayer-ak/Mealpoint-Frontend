'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import Container from '../container/Container';
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

const Checkout = () => {
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
        <div className="bg-white px-12 py-12 rounded-md relative">
          {/* top shadow */}
          <TopShadow />

          <SecMainHeader
            className="text-[#183136] text-5xl  text-left font-extrabold"
            content={'Checkout'}
          />

          {/* main content */}
          <div className="flex justify-between items-baseline gap-0 py-5">
            {/* left content */}
            <div className="w-3/5 py-5">
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 px-4"
                  >
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative w-full">
                              {/* form field */}

                              <div className="shadow-md px-6 py-4">
                                {/* Contact information */}
                                <div className="flex flex-col gap-6 mb-6 ">
                                  <SecMainHeader
                                    className="text-[#183136] text-xl  text-left font-extrabold tracking-wider"
                                    content={'Contact Information'}
                                  />

                                  <SecDescription
                                    className="text-[#183136] w-full px-0 text-start text-sm tracking-wider leading-7"
                                    content={
                                      "We'll use this email to send you details and updates about your order."
                                    }
                                  />

                                  <Input
                                    placeholder="Email address"
                                    {...field}
                                    className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-6"
                                  />
                                </div>
                              </div>
                              {/* ###################################### */}

                              {/* Billing address */}
                              <div className="shadow-md px-6 py-4 mt-6">
                                <div className="flex flex-col gap-6 mb-6 ">
                                  <SecMainHeader
                                    className="text-[#183136] text-xl  text-left font-extrabold tracking-wider"
                                    content={'Billing address'}
                                  />

                                  <SecDescription
                                    className="text-[#183136] w-full px-0 text-start text-sm tracking-wider leading-7"
                                    content={
                                      'Enter the billing address that matches your payment method.'
                                    }
                                  />

                                  {/* select */}
                                  <div className=" relative">
                                    <Select>
                                      <SelectTrigger className="w-full text-[#183136] text-md pl-4 pr-2 py-6 shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100">
                                        <SelectValue
                                          placeholder="Area"
                                          className="text-md"
                                        />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-sm border-none bg-white">
                                        <SelectGroup className="">
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
                                  <div className="grid grid-cols-2 gap-6 ">
                                    <Input
                                      placeholder="First name"
                                      {...field}
                                      className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7"
                                    />
                                    <Input
                                      placeholder="Last name"
                                      {...field}
                                      className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7"
                                    />
                                  </div>

                                  <Input
                                    placeholder="Address"
                                    {...field}
                                    className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7"
                                  />

                                  <Input
                                    placeholder="Road No., Apartment, suite, etc."
                                    {...field}
                                    className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7"
                                  />

                                  <div className="grid grid-cols-2 gap-6 ">
                                    <Input
                                      placeholder="Phone number"
                                      {...field}
                                      className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7"
                                    />
                                    <Input
                                      placeholder="Phone number (optional)"
                                      {...field}
                                      className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Payment options */}
                              <div className="shadow-md px-6 py-4 mt-6">
                                <div>
                                  <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                    defaultValue="item-1"
                                  >
                                    <RadioGroup defaultValue="comfortable">
                                      {/* kkk */}

                                      <AccordionItem value="item-1">
                                        <div className="flex items-center gap-3">
                                          <RadioGroupItem
                                            value="default"
                                            id="r1"
                                          />
                                          <Label htmlFor="r1">
                                            <AccordionTrigger>
                                              Direct Bank Transfer
                                            </AccordionTrigger>
                                          </Label>
                                        </div>

                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                          <p>
                                            Make your payment directly into our
                                            bank account. Please use your Order
                                            ID as the payment reference. Your
                                            order will not be shipped until the
                                            funds have cleared in our account.
                                          </p>
                                        </AccordionContent>
                                      </AccordionItem>

                                      {/* kkk */}
                                      <AccordionItem value="item-2">
                                        <div className="flex items-center gap-3">
                                          <RadioGroupItem
                                            value="comfortable"
                                            id="r2"
                                          />
                                          <Label htmlFor="r2">
                                            <AccordionTrigger>
                                              Online Payment
                                            </AccordionTrigger>
                                          </Label>
                                        </div>

                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                          <p>
                                            Please send a check to Store Name,
                                            Store Street, Store Town, Store
                                            State / County, Store Postcode.
                                          </p>
                                        </AccordionContent>
                                      </AccordionItem>

                                      {/* kkk */}
                                      <AccordionItem value="item-3">
                                        <div className="flex items-center gap-3">
                                          <RadioGroupItem
                                            value="compact"
                                            id="r3"
                                          />
                                          <Label htmlFor="r3">
                                            <AccordionTrigger>
                                              Casho On Delivery (COD)
                                            </AccordionTrigger>
                                          </Label>
                                        </div>

                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                          <p>Pay with cash upon delivery.</p>
                                        </AccordionContent>
                                      </AccordionItem>
                                    </RadioGroup>
                                  </Accordion>
                                </div>
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
            </div>

            {/* right content */}
            <div className="w-3/8  pb-2"></div>
          </div>

          {/* Bottom shadow */}
          {/* <BottomShadow /> */}
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
