import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useUserRole from '../hooks/useUserRole';
const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [role] = useUserRole(user?.email)
    let activeClass = {
        color: "blue",
        background: "none",
    };
    return (
        <div>
            <label tabIndex={2}
                htmlFor="dashboard-drawer"
                className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-slate-900 text-white text-lg">
                        <li className='mx-auto'>
                            <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/">Home</NavLink>
                        </li>
                        <li className='mx-auto'>
                            <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/dashboard/">Profile</NavLink>
                        </li>
                        <li className='mx-auto'>
                            <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/dashboard/my-orders">My Order</NavLink>
                        </li>
                        {role === 'Seller' &&
                            <>
                                <li className='mx-auto'>
                                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/dashboard/add-product">Add A Product</NavLink>
                                </li>
                                <li className='mx-auto'>
                                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/dashboard/my-products">My Products</NavLink>
                                </li>
                                <li className='mx-auto'>
                                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/dashboard/my-buyers">My Buyer</NavLink>
                                </li>
                            </>
                        }
                        {role === 'Admin' &&
                            <>
                                <li className='mx-auto'>
                                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to='/dashboard/all-user'>All User</NavLink>
                                </li>
                                <li className='mx-auto'>
                                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to='/dashboard/all-seller'>All Seller</NavLink>
                                </li>
                                <li className='mx-auto'>
                                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to='/dashboard/all-buyer'>All Buyer</NavLink>
                                </li>
                                <li className='mx-auto'>
                                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to='/dashboard/reported-products'>Reported Products</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;