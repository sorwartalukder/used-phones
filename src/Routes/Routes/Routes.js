import { createBrowserRouter } from "react-router-dom"
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
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
                element: <AddProduct></AddProduct>
            },

        ]
    }
])

export default router;