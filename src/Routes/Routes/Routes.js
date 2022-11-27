import { createBrowserRouter } from "react-router-dom"
import Dashboard from "../../Layout/Dashboard";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import CategoryProducts from "../../Pages/AllProducts/CategoryProducts/CategoryProducts";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import MyProducts from "../../Pages/MyProducts/MyProducts";
import ErrorElement from "../../Pages/Shared/ErrorElement/ErrorElement";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

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
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.category}`)
            },

        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        ErrorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '/dashboard',
                element: <AllUsers></AllUsers>
            }
        ]
    },
])

export default router;