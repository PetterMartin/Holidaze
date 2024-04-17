import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import SingleVenue from "./pages/SingleVenue";
import Root from "./App";

const rootRoute = createRootRoute({
    component: Root,
  });
  
  
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
  });
  
  const venuesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/venues",
    component: Venues,
  });

  const singleVenuesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/singlevenue",
    component: SingleVenue,
  });
  
  const routeTree = rootRoute.addChildren([
    indexRoute,
    venuesRoute,
    singleVenuesRoute,
  ]);
  
  export const router = createRouter({ routeTree });
  
  export default router;