import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { OverviewPage } from './pages/Overview.page';
import {LoginPage} from "@/pages/authentication/Login.page";
import {RegisterPage} from "@/pages/authentication/Register.page";
import {ProtectedRoute} from "@/components/ProtectedRoute/ProtectedRoute";
import {AddPillPage} from "@/pages/AddPill.page";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/overview',
    element: <ProtectedRoute><OverviewPage /></ProtectedRoute>
  },
  {
    path: '/add-pill',
    element: <ProtectedRoute><AddPillPage /></ProtectedRoute>
  },

]);

export function Router() {
  return <RouterProvider router={router} />;
}
