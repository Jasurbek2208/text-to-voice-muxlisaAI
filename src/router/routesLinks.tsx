import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

// Types
import { IRoute } from "../types/types";

// Lazy-loaded pages
// ===Not autorized Routes
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const TermsConditions = lazy(() => import("../pages/auth/TermsConditions"));
// ===Autorized Routes
const TextToVoice = lazy(() => import("../pages/AIChats/TextToVoice"));
// const VoiceToText = lazy(() => import("../pages//AIChats/VoiceToText"));


export const authRoutes: IRoute[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "terms-and-conditions",
    element: <TermsConditions />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]

export const routes: IRoute[] = [
  {
    path: "text-to-voice",
    element: <TextToVoice />,
  },
  // {
  //   path: "/voice-to-text",
  //   element: <VoiceToText />,
  // },
  {
    path: "*",
    element: <Navigate to="/text-to-voice" />,
  },
];