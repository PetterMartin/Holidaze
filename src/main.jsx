import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../src/index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "../src/root.js";
import { AuthProvider } from "./context/auth/Auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
