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
import { AuthProvider } from "./Contexts/AuthContext.jsx";

import ProfilePage from "./pages/ProfilePage.jsx";
import AccountSettings from "./components/UserProfile/AccountSettings.jsx";
import ChangePassword from "./components/UserProfile/ChangePassword.jsx";
import YourReservations from "./components/UserProfile/YourReservations.jsx";
import Bookk from "./components/Home/bookk.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home  />,
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
      {
        path: "court/:id",
        element: <Bookk />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        children: [
          {
            index:true , 
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
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
