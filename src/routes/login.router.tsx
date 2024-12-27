import React from 'react';
import { loginRoutes } from "./paths";
import { authenticationRouter } from "@/util";
import { LoginPage } from "@/pages/login";
import { RouteObject } from "react-router-dom";

export const logindRoute: RouteObject[] = [
  {
    path: loginRoutes.signIn,
    loader: () => authenticationRouter(false),
    element: <LoginPage />,
  }
];
