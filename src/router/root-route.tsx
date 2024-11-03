import {
  networksQueryOptions,
  variablesQueryOptions,
} from "@/api/query-factory";
import { RootComponent } from "@/components/common/global-layout";
import { extractMetaDetails } from "@/lib/synoptic-utils";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  loader: async (opts) => {
    const variables = opts.context.queryClient.ensureQueryData(
      variablesQueryOptions(),
    );
    const networks = opts.context.queryClient.ensureQueryData(
      networksQueryOptions(),
    );
    const resolvedData = await Promise.all([variables, networks]);

    return extractMetaDetails({
      variableArr: resolvedData[0]?.["VARIABLES"],
      networksArr: resolvedData[1]?.["MNET"],
    });
  },
});
