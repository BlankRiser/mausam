/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { router } from "@/router/router";
import { useKeysStore } from "@/store/env-keys.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AddTokensForm = () => {
  const navigate = useNavigate({ from: "/token" });
  const synopticToken = useKeysStore((state) => state.synopticToken);
  const mapboxToken = useKeysStore((state) => state.mapboxToken);
  const setTokens = useKeysStore((state) => state.setTokens);

  const form = useForm<z.infer<typeof AddTokensFormSchema>>({
    resolver: zodResolver(AddTokensFormSchema),
    defaultValues: {
      synopticToken: synopticToken,
      mapboxToken: mapboxToken,
    },
  });

  const onSubmit = (values: z.infer<typeof AddTokensFormSchema>) => {
    setTokens(values);
    router.invalidate().catch(console.error);
    navigate({ to: "/" }).catch(console.error);
  };

  return (
    <div className="h-full grid place-items-center">
      <div className="max-w-4xl bg-neutral-50 dark:bg-neutral-950 rounded-md p-4 border border-neutral-200 dark:border-neutral-800">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Add Your Tokens</h2>
          <span className="text-neutral-500 text-sm">
            Enter Mapbox and Synoptic tokens to display weather data.
          </span>
          <br />
          <span className="text-neutral-500 text-sm">
            Your tokens are hidden from the input field.
          </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="mapboxToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mapbox Token</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********************"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This token is used to display the map on the dashboard.{" "}
                    <br />
                    You can get it from the{" "}
                    <a
                      href="https://docs.mapbox.com/help/getting-started/access-tokens/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      Mapbox account page
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="synopticToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Synoptic Token</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********************"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This token is used to fetch weather data for the dashboard.
                    <br />
                    Learn more about it on the{" "}
                    <a
                      href="https://docs.synopticdata.com/account/public-api-tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      Synoptic Data API documentation
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

const AddTokensFormSchema = z.object({
  synopticToken: z.string().min(2, {
    message: "Please enter a valid token",
  }),
  mapboxToken: z.string().min(2, {
    message: "Please enter a valid token",
  }),
});
