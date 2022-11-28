import { createBrowserRouter } from "react-router-dom"
import Dashboard from "../../Layout/Dashboard";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import CategoryProducts from "../../Pages/AllProducts/CategoryProducts/CategoryProducts";
import Blog from "../../Pages/Blog/Blog";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import ReportedProducts from "../../Pages/Dashboard/ReportedProducts/ReportedProducts";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import MyBuyers from "../../Pages/MyBuyers/MyBuyers";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import MyProducts from "../../Pages/MyProducts/MyProducts";
import ErrorElement from "../../Pages/Shared/ErrorElement/ErrorElement";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import AdminRoute from "./AdminRoute/AdminRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/my-buyers',
                element: <MyBuyers></MyBuyers>
            },
            {
                path: '/my-orders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/blogs',
                element: <Blog></Blog>
            },
            {
                path: '/add-product',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/my-products',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/category/:category',
                element: <PrivateRoute><CategoryProducts></CategoryProducts></PrivateRoute>,
                loader: ({ params }) => fetch(`https://used-phone-server.vercel.app/category/${params.category}`)
            },

        ]
    },
    {
        path: '/dashboard',
        element: <AdminRoute> <Dashboard></Dashboard></AdminRoute>,
        ErrorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '/dashboard',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/all-seller',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/all-buyer',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/reported-products',
                element: <AdminRoute><ReportedProducts></ReportedProducts></AdminRoute>
            },
        ]
    },
])

export default router;