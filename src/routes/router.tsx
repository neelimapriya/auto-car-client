import DashboardLayout from "@/components/layout/dashboardLayout";
import MainLayout from "@/components/layout/mainLayout";
import ProtectedRoute from "@/components/layout/protectedRoutes";
import About from "@/pages/About";
import CreateCar from "@/pages/admin/CreateCar";
import UpdateCar from "@/pages/admin/updateCar";
import CarDetails from "@/pages/CarDetails";
import Cars from "@/pages/Cars";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";


const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        // errorElement: <NotFound />,
        children:[
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
        ]
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
                path: "cars",
                element: <Cars />,
            },
            {
                path: "update-car/:id",
                element: <UpdateCar/>,
            },
            // {
            //     path: "users",
            //     element: <ManageUsers />,
            // },
            // {
            //     path: "profile",
            //     element: <DashProfile />,
            // },
            // {
            //     path: "orders",
            //     element: <ManageRentals />,
            // },
        ],
    },
])
export default router