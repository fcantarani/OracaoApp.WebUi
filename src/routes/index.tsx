import ProtectedRoute from "@/components/ProtectedRoute";
import LoginCallbackPage from "@/pages/Auth/LoginCallbackPage";
import LoginPage from "@/pages/Auth/LoginPage";
import LogoutCallbackPage from "@/pages/Auth/LogoutCallbackPage";
import TestePage from "@/pages/Auth/teste";
import HomePage from "@/pages/Home";
import MyPrayersPage from "@/pages/MyPrayers";
// import HomePage from "@/pages/Home";
// import MyPrayersPage from "@/pages/MyPrayers";
import RootPage from "@/pages/RootPage";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/teste",
    element: (
      <ProtectedRoute>
        <TestePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login-callback",
    element: <LoginCallbackPage />,
  },
  {
    path: "/logout-callback",
    element: <LogoutCallbackPage />,
  },

  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/my-prayers", element: <MyPrayersPage /> },
    ],
  },
]);
