import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import MainPage from "./pages/MainPage.tsx";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainPage />,
    },   
  ],
  {
    basename: window.location.hostname === "localhost" ? null : "/backoffice",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
