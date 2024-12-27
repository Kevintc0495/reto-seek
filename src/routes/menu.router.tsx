import React from "react";
import { Navigate } from "react-router-dom";
import { authenticationRouter } from "@/util";
import { homeRoutes } from "./paths";
import { taskRoute } from "./task.router";

export const menuRoute = {
  path: "",
  async lazy() {
    const { Dashboard } = await import(
      /* webpackChunkName: "LazyDasboard" */ "@/pages"
    );
    return { Component: Dashboard };
  },
  loader: () => authenticationRouter(true),
  children: [
    {
      path: "/menu",
      async lazy() {
        const { Welcome } = await import(
          /* webpackChunkName: "LazyWelcome" */ "@/pages"
        );
        return { Component: Welcome };
      },
      loader: () => authenticationRouter(true),
    },
    ...taskRoute,
    {
      path: "*",
      element: <Navigate to={homeRoutes.home} replace />,
    },
  ],
};
