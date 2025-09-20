import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import Container from '../container/Container';
import ButtonComp from '../Shared/ButtonComp';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const description = 'Porro eveniet, autem ipsam vitae consequatur!';

const WriteMessage = () => {
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
    <div>
      <Container>
        <div className="bg-white">
          <div className="justify-items-center mt-10 md:my-15">
            <SecHeader
              header={'Contact'}
              className={'items-center'}
              headerClass={
                'mt-4 font-bold tracking-[2px] text-[#19302d] uppercase'
              }
              spanClass="ms-7"
            />
            <SecMainHeader
              className="text-3xl md:text-5xl text-[#19302d] font-extrabold mt-8 -tracking-wide"
              content="Write us a message"
            />
            <SecDescription
              content={description}
              className="mt-8 text-[#19302d] font-light tracking-wider"
            />
          </div>

          {/* form */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          {/* form field */}

                          <div className="grid grid-cols-2 gap-6">
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
                            <Input
                              placeholder="Phone"
                              {...field}
                              className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7"
                            />
                            <Input
                              placeholder="Email"
                              {...field}
                              className="text-black text-md md:text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7"
                            />
                          </div>

                          {/* text area field */}
                          <div className="mt-6">
                            <Textarea
                              placeholder="Write your message here...."
                              className="border-none shadow-md shadow-gray-300/50"
                            />
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-center items-center">
                  <ButtonComp
                    className="bg-[#f99d3a] w-[300px] text-[#183136] text-md uppercase tracking-widest px-4 py-8 mt-3 cursor-pointer"
                    content="Send Message"
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WriteMessage;
