import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Owner from "./Owner/owner.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Home from "./pages/HomePage.jsx";
import CourtPage from "./components/CourtPage/CourtPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "ownerpage",
        element: <Owner />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "courts", 
        element: <CourtPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
