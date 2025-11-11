import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/allbooks',
                Component: AllBooks,
            },
            {
                path: '/login',
                Component: Login,
            },
             {
                path: '/register',
                Component: Register,
            },
        ]
    }
])