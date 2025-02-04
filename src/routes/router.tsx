import MainLayout from "@/components/layout/mainLayout";
import About from "@/pages/About";
import Cars from "@/pages/Cars";
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
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            // {
            //     path: "/profile",
            //     element: <prtero role="user"><Profile /></ProtectedRoute>,
            // },
        ]
    }
])
export default router