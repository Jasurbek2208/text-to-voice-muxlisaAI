import React from "react";
import { Navigate } from "react-router-dom";

// Pages
import TextToVoice from "../pages/TextToVoice";

const routes = [
  {
    path: "/text-to-voice",
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

export { routes };