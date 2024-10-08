import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OwnerPage from "./pages/OwnerPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Home from "./pages/HomePage.jsx";
import AccountSettings from "./components/UserProfile/AccountSettings.jsx";
import ChangePassword from "./components/UserProfile/ChangePassword.jsx";
import YourReservations from "./components/UserProfile/YourReservations.jsx";
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
        element: <OwnerPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          {
            path: "accountsettings",
            element: <AccountSettings />,
          },
          {
            path: "changepassword",
            element: <ChangePassword />,
          },
          {
            path: "reservations",
            element: <YourReservations />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
