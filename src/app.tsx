import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from './pages/login/index';
import { RegisterUser } from "./pages/register_user";
import { Home } from "./pages/home";
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DateProvider } from '@/context/DateContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { Model } from "./pages/home/model";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <RegisterUser />
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  {
    path: "/models",
    element: (
      <ProtectedRoute>
        <Model />
      </ProtectedRoute>
    )
  },

]);

export function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <DateProvider>
          <RouterProvider router={router} />
        </DateProvider>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  );
}
