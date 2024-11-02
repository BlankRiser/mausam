import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { Home } from "@/pages/home/home";

export const childRoutes = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
  staticData: {
    title: "Mausam",
    description:
      "Mausam is a weather app that provides weather information for your location.",
  },
});
