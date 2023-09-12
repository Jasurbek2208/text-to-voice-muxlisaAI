import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routesLinks";

export default function Router() {
  const route = useRoutes(routes);

  return <>{route}</>;
}