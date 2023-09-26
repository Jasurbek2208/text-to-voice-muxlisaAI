import React from "react";
import { Navigate } from "react-router-dom";

// Types
import { IRoute } from "../types/types";

// Lazy-loaded pages
//   Auth Routes
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const TermsConditions = React.lazy(() => import("../pages/auth/TermsConditions"));
//   Autorized Routes
const TextToVoice = React.lazy(() => import("../pages/AIChats/TextToVoice"));
// const VoiceToText = React.lazy(() => import("../pages//AIChats/VoiceToText"));


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