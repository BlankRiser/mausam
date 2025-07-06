import { scan } from "react-scan"; // must be imported before React and React DOM

import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";


scan({
  enabled: import.meta.env.DEV, // Enable scanning in development mode
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
