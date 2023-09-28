import React, { Suspense, useEffect } from "react";
import { useRoutes } from "react-router-dom";

// Redux store
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/reduxSelector";

// Routes
import { authRoutes, routes } from "./routesLinks";

// Loader
import Loader from "../components/loader/Loader";

// Helpers
import { checkingAuthURL } from "../helpers/checkingAuthURL";
import { checkTokenValidity } from "../helpers/checkTokenValidity";

export default function Router() {
  const dispatch = useDispatch();
  const { user: { isAuth } } = useTypedSelector((store) => store?.store);

  useEffect(() => {
    checkingAuthURL();
    if(!localStorage.getItem("$T$O$K$E$N$")) return;
    checkTokenValidity(dispatch);
  }, [])

  const currentRoutes = isAuth ? routes : authRoutes;
  const routers = useRoutes(currentRoutes);

  return <Suspense fallback={<Loader />}>{routers}</Suspense>;
}