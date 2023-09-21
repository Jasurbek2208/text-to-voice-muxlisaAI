import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Redux Store
import reduxStore from "./store";

// Router
import Router from "./router/Router";

export default function App() {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <div className="bg-dark h-[100dvh]">
          <Router />
        </div>
      </BrowserRouter>
    </Provider>
  );
}