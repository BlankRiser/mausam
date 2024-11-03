import {
  networksQueryOptions,
  stationMetadataQueryOptions,
  variablesQueryOptions,
} from "@/api/query-factory";
import { extractMetaDetails } from "@/lib/synoptic-utils";
import { Home } from "@/pages/home/home";
import { StationDetails } from "@/pages/station/station";
import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root-route";

export const indexRoute = createRoute({
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

export const stationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "station",
});

export const stationIndexRoute = createRoute({
  getParentRoute: () => stationsRoute,
  path: "/",
  component: () => {
    return <div>Select a station</div>;
  },
});

export const stationRoute = createRoute({
  getParentRoute: () => stationsRoute,
  path: "/$stationId",
  component: StationDetails,
  pendingComponent: () => {},
  loader: async (opts) => {
    const stationId = opts.params.stationId;
    if (!stationId) {
      console.error(`Station ID: ${stationId ?? "N/A"} does not exist`);
      throw redirect({
        to: "/",
      });
    }
  },
});
