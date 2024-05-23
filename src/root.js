import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import Home from "./pages/Home";
import DashboardPage from "./pages/Dashboard.jsx"; // Ensure this matches your file name
import Profile from "./pages/Profile.jsx"; // Ensure this matches your file name
import Root from "./App";

const rootRoute = createRootRoute({
    component: Root,
});
  
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: DashboardPage,
});

const profilesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/profile",
    component: Profile,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    dashboardRoute,
    profilesRoute,
]);

export const router = createRouter({ routeTree });

export default router;
