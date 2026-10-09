import { createRouter, ErrorComponent } from '@tanstack/react-router';
import { rootRoute } from './root-route';
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
  tokenValidationLayoutRoute,
  toolsIndexRoute,
  toolsRoute,
  wallpaperRoute,
} from './routes';
import { queryClient } from '@/lib/query-client';

const routeTree = rootRoute.addChildren([
  tokenValidationLayoutRoute.addChildren([
    indexRoute,
    stationsRoute.addChildren([stationIndexRoute, stationRoute]),
    networksRoute.addChildren([networksIndexRoute, networkRoute]),
    compareStationsRoute,
  ]),
  tokenRoute.addChildren([tokenIndexRoute]),
  toolsRoute.addChildren([toolsIndexRoute, wallpaperRoute]),
]);

export const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  context: {
    queryClient,
  },
  defaultErrorComponent: ErrorComponent,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
