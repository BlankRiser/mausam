import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";

const stidFormSchema = z.object({
  stid: z.string().min(2).max(50),
});

export const StationIndexPage = () => {
  const navigate = useNavigate({ from: "/station/" });

  const form = useForm<z.infer<typeof stidFormSchema>>({
    resolver: zodResolver(stidFormSchema),
    defaultValues: {
      stid: "",
    },
  });

  function onSubmit(values: z.infer<typeof stidFormSchema>) {
    void navigate({
      to: "/station/$stationId",
      params: {
        stationId: values.stid.trim(),
      },
      search: {
        variable: "",
      },
    });
  }

  return (
    <div className="w-full h-[calc(100dvh-var(--nav-height))] grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-full flex flex-col justify-center items-center w-full ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-md px-2"
          >
            <FormField
              control={form.control}
              name="stid"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Station ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Know the station ID? Enter it here to view its details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
      </div>
      <div className="h-full flex flex-col justify-center items-center gap-4 text-center bg-zinc-50 dark:bg-zinc-950">
        <h3 className="text-4xl md:text-5xl font-semibold">Select a station</h3>
        <Link
          to="/"
          className="text-base md:text-lg text-blue-600 dark:text-blue-400 underline underline-offset-4"
        >
          Go back to the home page and select a station to view its details.
        </Link>
      </div>
    </div>
  );
};
