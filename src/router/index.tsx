import { createHashRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { lazyLoad } from "@/utils/index.tsx";

export default function Router() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: lazyLoad(lazy(() => import("@/pages/home/home.tsx"))),
    },
    {
      path: "/login",
      element: lazyLoad(lazy(() => import("@/pages/login/login.tsx"))),
    },
  ];

  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
}
