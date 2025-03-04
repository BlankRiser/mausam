import { Home } from "@/pages/home/home";
import { StationDetailsPage } from "@/pages/station/station";
import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { TokensPage } from "@/pages/add-token/add-tokens-form";
import { StationIndexPage } from "@/pages/station/features/choose-station";
import { NetworksPage } from "@/pages/networks/networks";
import { NetworkDetailsPage } from "@/pages/networks/network-details";
import {
  stationLatestQueryOptions,
  stationMetadataQueryOptions,
} from "@/api/query-factory";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
  staticData: {
    title: "Mausam",
    description:
      "Mausam is a weather app that provides weather information for your location.",
  },
});

export const tokenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "token",
});

export const tokenIndexRoute = createRoute({
  getParentRoute: () => tokenRoute,
  path: "/",
  component: TokensPage,
});

export const stationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "station",
});

export const stationIndexRoute = createRoute({
  getParentRoute: () => stationsRoute,
  path: "/",
  component: StationIndexPage,
});

export const stationRoute = createRoute({
  getParentRoute: () => stationsRoute,
  path: "/$stationId",
  component: StationDetailsPage,
  wrapInSuspense: true,
  loader: ({ params, context }) => {
    const stationId = params.stationId;

    if (!stationId) {
      console.error(`Station ID: ${stationId ?? "N/A"} does not exist`);
      throw redirect({
        to: "/",
      });
    }

    void context.queryClient.ensureQueryData(
      stationMetadataQueryOptions({
        stid: stationId,
      }),
    );

    void context.queryClient.ensureQueryData(
      stationLatestQueryOptions({
        stid: stationId,
      }),
    );
  },
});

export const networksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "networks",
});

export const networksIndexRoute = createRoute({
  getParentRoute: () => networksRoute,
  path: "/",
  component: NetworksPage,
});

export const networkRoute = createRoute({
  getParentRoute: () => networksRoute,
  path: "/$networkId",
  component: NetworkDetailsPage,
  loader: ({ params }) => {
    const networkId = params.networkId;
    if (!networkId) {
      console.error(`Network ID: ${networkId ?? "N/A"} does not exist`);
      throw redirect({
        to: "/",
      });
    }
  },
});
