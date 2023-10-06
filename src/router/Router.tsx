import React, { Suspense, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Cookies from "js-cookie";

// Redux store
import { useDispatch } from "react-redux";
import { changeLoading } from "@store/store";
import { useTypedSelector } from "@hooks/reduxSelector";

// Routes
import { authRoutes, routes } from "./routesLinks";

// Loader
import Loader from "@components/loader/Loader";

// Helpers
import { checkingAuthURL, checkTokenValidity } from "@helpers/index";

export default function Router() {
  const dispatch = useDispatch();
  const { isLoading, user: { isAuth } } = useTypedSelector((store) => store?.store);

  async function checking() {
    checkingAuthURL();
    if(!Cookies.get("$T$O$K$E$N$")) return;
    await checkTokenValidity(dispatch);
  }

  async function routerInit() {
    await checking();
    dispatch(changeLoading(false));
    if(window.location.pathname === "/success-registered") return;
  }
  
  useEffect(() => {
    routerInit();
  }, [])

  const currentRoutes = isAuth ? routes : authRoutes;
  const routers = useRoutes(currentRoutes);

  return isLoading ? <Loader /> : <Suspense fallback={<Loader />}>{routers}</Suspense>;
}