import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const stidFormSchema = z.object({
  stid: z.string().min(2).max(50),
});

export const StationIndexPage = () => {
  const navigate = useNavigate({ from: '/station/' });

  const form = useForm<z.infer<typeof stidFormSchema>>({
    resolver: zodResolver(stidFormSchema),
    defaultValues: {
      stid: '',
    },
  });

  function onSubmit(values: z.infer<typeof stidFormSchema>) {
    void navigate({
      to: '/station/$stationId',
      params: {
        stationId: values.stid.trim(),
      },
      search: {
        variable: '',
      },
    });
  }

  return (
    <div className='h-[calc(100dvh-var(--nav-height))] w-full gap-4'>
      <div className='flex h-full w-full flex-col items-center justify-center '>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md space-y-4 px-2'>
            <FormField
              control={form.control}
              name='stid'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Station ID</FormLabel>
                  <FormDescription>Know the station ID? Enter it here to view its details.</FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      ref={(ref) => {
                        if (ref) {
                          ref.focus();
                        }
                      }}
                    />
                  </FormControl>
                  <div className='flex items-center gap-1'>
                    <FormDescription>You can also search in the</FormDescription>
                    <Button asChild mode='link' underline={'solid'}>
                      <Link to='/'>home page.</Link>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={'primary'} type='submit'>
              Search
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
