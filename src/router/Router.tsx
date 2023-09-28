import React, { Suspense, useEffect } from "react";
import { useRoutes } from "react-router-dom";

// Redux store
import { useDispatch } from "react-redux";
import { changeLoading } from "../store/store";
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
  const { isLoading, user: { isAuth } } = useTypedSelector((store) => store?.store);

  async function checking() {
    await checkingAuthURL();
    if(!localStorage.getItem("$T$O$K$E$N$")) return;
    await checkTokenValidity(dispatch);
  }
  
  useEffect(() => {
    checking();
    dispatch(changeLoading(false));
    if(window.location.pathname === "/success-registered") return;
  }, [])

  const currentRoutes = isAuth ? routes : authRoutes;
  const routers = useRoutes(currentRoutes);

  return isLoading ? <Loader /> : <Suspense fallback={<Loader />}>{routers}</Suspense>;
}