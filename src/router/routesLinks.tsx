import React from "react";
import { Navigate } from "react-router-dom";

// Lazy-loaded pages
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const TermsConditions = React.lazy(() => import("../pages/auth/TermsConditions"));
const TextToVoice = React.lazy(() => import("../pages/TextToVoice"));
// const VoiceToText = React.lazy(() => import("../pages/VoiceToText"));

export const routes = [
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "terms-and-conditions",
    element: <TermsConditions />,
  },
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