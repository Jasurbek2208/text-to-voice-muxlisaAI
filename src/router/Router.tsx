import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useTypedSelector } from "../hooks/reduxSelector";

import { IRoute } from "../types/types";
import { authRoutes, routes } from "./routesLinks";

export default function Router() {
  const { user: { isAuth } } = useTypedSelector((store) => store?.store);

  const renderRoutes = (routes: IRoute[]) => routes?.map((route: IRoute, idx: number) => <Route key={String(`${route?.path}-${idx}`)} path={route?.path} element={route?.element} />)

  return (
    <Suspense fallback={<></>}>
      <Routes>{isAuth ? renderRoutes(routes) : renderRoutes(authRoutes)}</Routes>
    </Suspense>
  );
}