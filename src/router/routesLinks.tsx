import React from "react";
import { Navigate } from "react-router-dom";

// Lazy-loaded pages
const TextToVoice = React.lazy(() => import("../pages/TextToVoice"));
// const VoiceToText = React.lazy(() => import("../pages/VoiceToText"));

export const routes = [
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