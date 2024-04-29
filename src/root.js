import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import Home from "./pages/Home";
import ProfilePage from "./pages/Profile";
import Venues from "./pages/Venues";
import Root from "./App";

const rootRoute = createRootRoute({
    component: Root,
  });
  
  
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
  });

  const profilesRoute = new createRoute({
    getParentRoute: () => rootRoute,
    path: "/profile",
    component: ProfilePage,
  });
  
  const venuesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/venues",
    component: Venues,
  });
  
  const routeTree = rootRoute.addChildren([
    indexRoute,
    profilesRoute,
    venuesRoute,
  ]);
  
  export const router = createRouter({ routeTree });
  
  export default router;