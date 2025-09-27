import { QueryClient } from "@tanstack/react-query";
import { createRouter, ErrorComponent } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import {
  compareStationsRoute,
  indexRoute,
  networkRoute,
  networksIndexRoute,
  networksRoute,
  stationIndexRoute,
  stationRoute,
  stationsRoute,
  tokenIndexRoute,
  tokenRoute,
  wallpaperRoute,
} from "./routes";

const queryClient = new QueryClient();

const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([
    stationsRoute.addChildren([stationIndexRoute, stationRoute]),
    tokenRoute.addChildren([tokenIndexRoute]),
    networksRoute.addChildren([networksIndexRoute, networkRoute]),
    wallpaperRoute,
    compareStationsRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  context: {
    queryClient,
  },
  // defaultPendingComponent: () => (
  //   <div className="w-screen h-screen grid place-items-center">
  //     <Loader />
  //   </div>
  // ),
  defaultErrorComponent: ErrorComponent,
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
