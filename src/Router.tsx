import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { OverviewPage } from './pages/Overview.page';
import {LoginPage} from "@/pages/authentication/Login.page";
import {RegisterPage} from "@/pages/authentication/Register.page";
import {ProtectedRoute} from "@/components/ProtectedRoute/ProtectedRoute";
import {AddPillPage} from "@/pages/AddPill.page";
import {ProfilePage} from "@/pages/ProfilePage";

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
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/overview',
    element: <ProtectedRoute><OverviewPage /></ProtectedRoute>
  },
  {
    path: '/add-pill',
    element: <ProtectedRoute><AddPillPage /></ProtectedRoute>
  },
  {
    path: '*',
    element: <ProtectedRoute><OverviewPage /></ProtectedRoute>
  }

]);

export function Router() {
  return <RouterProvider router={router} />;
}
