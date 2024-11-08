import { Home } from "@/pages/home/home";
import { StationDetails } from "@/pages/station/station";
import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { AddTokensForm } from "@/pages/add-token/features/add-tokens-form";

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
  component: AddTokensForm,
});

export const stationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "station",
});

export const stationIndexRoute = createRoute({
  getParentRoute: () => stationsRoute,
  path: "/",
  component: () => {
    return (
      <div className="w-full h-full grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-7xl font-semibold">Select a station</h3>
          <span className="text-blue-600 dark:text-blue-400 underline underline-offset-4">
            Go back to the home page and select a station to view its details.
          </span>
        </div>
      </div>
    );
  },
});

export const stationRoute = createRoute({
  getParentRoute: () => stationsRoute,
  path: "/$stationId",
  component: StationDetails,
  loader: (opts) => {
    const stationId = opts.params.stationId;
    if (!stationId) {
      console.error(`Station ID: ${stationId ?? "N/A"} does not exist`);
      throw redirect({
        to: "/",
      });
    }
  },
});
