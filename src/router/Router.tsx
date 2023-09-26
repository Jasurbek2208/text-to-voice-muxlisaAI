import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { useTypedSelector } from "../hooks/reduxSelector";

// Routes
import { authRoutes, routes } from "./routesLinks";

// Loader
import Loader from "../components/loader/Loader";

export default function Router() {
  const { user: { isAuth } } = useTypedSelector((store) => store?.store);

  const currentRoutes = isAuth ? routes : authRoutes;
  const routers = useRoutes(currentRoutes);

  return <Suspense fallback={<Loader />}>{routers}</Suspense>;
}