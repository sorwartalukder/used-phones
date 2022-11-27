import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PrimaryBtn from '../../../components/AllButton/PrimaryBtn';
import { AuthContext } from '../../../contexts/AuthProvider';
import useUserRole from '../../../hooks/useUserRole';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const [userRole] = useUserRole(user?.email)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(e => console.error(e))
    }

    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        {userRole === 'Seller' && <>
            <li><Link to="/add-product">Add A Product</Link></li>
            <li><Link to="/my-products">My Products</Link></li>
        </>}
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
    </React.Fragment>
    return (
        <div className='bg-base-100'>
            <div className="navbar max-w-[1440px] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-2xl">Used Phones</Link>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <button
                                onClick={handleLogOut}
                                className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Log out</button>
                            :
                            <PrimaryBtn>
                                <Link to='/login'>Log In</Link>
                            </PrimaryBtn>
                    }
                </div>
                <label tabIndex={2}
                    htmlFor="dashboard-drawer"
                    className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Header;