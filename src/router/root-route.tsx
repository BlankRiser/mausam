import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { RootComponent } from "@/components/common/global-layout";

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Mausam is a weather data visualization tool.",
      },
      {
        name: "keywords",
        content: "weather, data, visualization, synoptic, mausam, meteorology, climate",
      },
      {
        name: "author",
        content: "Ram Shankar Choudhary",
      },
    ],
  }),
});
