import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { Home } from "@/pages/home/home";
import {
  networksQueryOptions,
  variablesQueryOptions,
} from "@/lib/query-factory";
import { extractMetaDetails } from "@/lib/synoptic-utils";

export const childRoutes = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
  staticData: {
    title: "Mausam",
    description:
      "Mausam is a weather app that provides weather information for your location.",
  },
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
