import DashboardLayout from "@/components/layout/dashboardLayout";
import MainLayout from "@/components/layout/mainLayout";
import ProtectedRoute from "@/components/layout/protectedRoutes";
import About from "@/pages/About";
import ManageDashboardCarTable from "@/pages/admin/allCarsDashboard";
import CreateCar from "@/pages/admin/CreateCar";
import ManageOrders from "@/pages/admin/manageOrders";
import ManageUsers from "@/pages/admin/manageUsers";
import UpdateCar from "@/pages/admin/updateCar";
import CarDetails from "@/pages/CarDetails";
import Cars from "@/pages/Cars";
import Contact from "@/pages/Contact";
import MyOrderPage from "@/pages/dasboard/myOrderPage";
import Profile from "@/pages/dasboard/profile";
import ErrorPage from "@/pages/error/error";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cars",
        element: <Cars />,
      },
      {
        path: "/cars/:carId",
        element: <CarDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/my-orders/:email",
        element: <MyOrderPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "create-cars",
        element: <CreateCar />,
      },
      {
        path: "allCars",
        element: <ManageDashboardCarTable />,
      },
      {
        path: "update-car/:id",
        element: <UpdateCar />,
      },
      {
        path: "manage-user",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "orders",
        element: <ManageOrders />,
      },
    ],
  },
]);
export default router;
