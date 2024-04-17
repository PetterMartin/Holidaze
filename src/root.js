import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import Root from "./App";

const rootRoute = createRootRoute({
    component: Root,
  });
  
  
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/home",
    component: Home,
  });
  
  const venuesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/venues",
    component: Venues,
  });
  
  const routeTree = rootRoute.addChildren([
    indexRoute,
    venuesRoute,
  ]);
  
  export const router = createRouter({ routeTree });
  
  export default router;