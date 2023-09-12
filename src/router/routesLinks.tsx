import React from "react";
import { Navigate } from "react-router-dom";

// Pages
import TextToVoice from "../pages/TextToVoice";

const routes = [
  {
    path: "/",
    element: <TextToVoice />,
  },
  // {
  //   path: "/",
  //   element: <VoiceToText />,
  // },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export { routes };