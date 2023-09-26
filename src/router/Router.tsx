import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/reduxSelector";

import { IRoute } from "../types/types";
import { authRoutes, routes } from "./routesLinks";
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));

export default function Router() {
  const { user: { isAuth } } = useTypedSelector((store) => store?.store);

  // const renderRoutes = (routes: IRoute[]) => routes?.map((route: IRoute, idx: number) => <Route key={String(`${route?.path}-${idx}`)} path={route?.path} element={route?.element} />)

  return (
    <Suspense fallback={<></>}>
      <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      {/* <Routes>{isAuth ? renderRoutes(routes) : renderRoutes(authRoutes)}</Routes> */}
    </Suspense>
  );
}