import { createHashRouter, RouterProvider } from "react-router-dom";
import AuthGuard from "./components/AuthGuard.tsx";
import { lazyLoad } from "@/utils/index.ts";

import type { RouteObject } from "react-router-dom";

const LoginRoute: RouteObject = {
  path: "/login",
  element: lazyLoad(lazy(() => import("@/pages/login/login.tsx"))),
};

const adminRoutes: RouteObject = {
  path: "/",
  element: (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      index: true,
      element: lazyLoad(lazy(() => import("@/pages/home/home.tsx"))),
    },
    // ... permissionRoutes
  ],
};

const PAGE_NOT_FOUND_ROUTE: RouteObject = {
  path: "*",
  element: <div>Not Found</div>,
};

export default function Router() {
  const routes: RouteObject[] = [adminRoutes, LoginRoute, PAGE_NOT_FOUND_ROUTE];
  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
}
