import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, redirect } from "@tanstack/react-router";
import { RootComponent } from "@/components/common/global-layout";
import { useKeysStore } from "@/store/env-keys.store";
import { useGlobalDataStore } from "@/store/global-data.store";

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  beforeLoad: ({ location }) => {
    if (
      !useKeysStore.getState().synopticToken &&
      location.pathname !== "/token"
    ) {
      throw redirect({
        to: "/token",
      });
    }
  },
  loader: () => {
    useGlobalDataStore.getState().fetchVariables();
  },
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Mausam is a weather data visualization tool.",
      },
      {
        name: "keywords",
        content:
          "weather, data, visualization, synoptic, mausam, meteorology, climate",
      },
      {
        name: "author",
        content: "Ram Shankar Choudhary",
      },
    ],
  }),
});
