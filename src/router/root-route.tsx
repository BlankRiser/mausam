import {
  networksQueryOptions,
  variablesQueryOptions,
} from "@/api/query-factory";
import { RootComponent } from "@/components/common/global-layout";
import { extractMetaDetails } from "@/lib/synoptic-utils";
import { useKeysStore } from "@/store/env-keys.store";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, redirect } from "@tanstack/react-router";

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  // errorComponent: () => <div>Something went wrong</div>,
  beforeLoad: ({ location }) => {
    if (
      (!useKeysStore.getState().mapboxToken ||
        !useKeysStore.getState().synopticToken) &&
      location.pathname !== "/token"
    ) {
      throw redirect({
        to: "/token",
      });
    }
  },
  loader: async ({ context }) => {
    const variables = context.queryClient.ensureQueryData(
      variablesQueryOptions(),
    );
    const networks = context.queryClient.ensureQueryData(
      networksQueryOptions(),
    ).catch((e: Error)=>{
      throw e
    })
    const resolvedData = await Promise.all([variables, networks]);

    return extractMetaDetails({
      variableArr: resolvedData[0]?.["VARIABLES"] ?? [],
      networksArr: resolvedData[1]?.["MNET"] ?? [],
    });
  },
});
