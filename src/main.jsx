import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
import "../src/index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "../src/root.js";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
