import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { useTypedSelector } from "../hooks/reduxSelector";

import { authRoutes, routes } from "./routesLinks";

export default function Router() {
  const { user: { isAuth } } = useTypedSelector((store) => store?.store);

  const currentRoutes = isAuth ? routes : authRoutes;
  const routers = useRoutes(currentRoutes);
  
  return <Suspense fallback={<h1 className="text-center">Loading...</h1>}>{routers}</Suspense>;
}