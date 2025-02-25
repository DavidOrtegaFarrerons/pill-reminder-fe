import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import {LoginPage} from "@/pages/authentication/Login.page";
import {RegisterPage} from "@/pages/authentication/Register.page";
import {ProtectedRoute} from "@/components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: '/overview',
    element: <ProtectedRoute><HomePage /></ProtectedRoute>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
