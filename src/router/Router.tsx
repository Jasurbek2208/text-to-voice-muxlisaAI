import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { useTypedSelector } from "../hooks/reduxSelector";

import { authRoutes, routes } from "./routesLinks";

export default function Router() {
  const { user: { isAuth } } = useTypedSelector((store) => store?.store);

  const routers = useRoutes(isAuth ? routes : authRoutes);
  return <Suspense fallback={<></>}>{routers}</Suspense>;
}