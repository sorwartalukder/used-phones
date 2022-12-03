import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useUserRole from '../hooks/useUserRole';
import Header from '../Pages/Shared/Header/Header';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [role] = useUserRole(user?.email)
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-slate-900 text-white text-lg">
                        <li className='mx-auto'>
                            <Link to="/dashboard">Profile</Link>
                        </li>
                        <li className='mx-auto'>
                            <Link to="/dashboard/my-orders">My Order</Link>
                        </li>
                        {role === 'Seller' &&
                            <>
                                <li className='mx-auto'>
                                    <Link to="/dashboard/add-product">Add A Product</Link>
                                </li>
                                <li className='mx-auto'>
                                    <Link to="/dashboard/my-products">My Products</Link>
                                </li>
                                <li className='mx-auto'>
                                    <Link to="/dashboard/my-buyers">My Buyer</Link>
                                </li>
                            </>
                        }
                        {role === 'Admin' &&
                            <>
                                <li className='mx-auto'>
                                    <Link to='/dashboard/all-user'>All User</Link>
                                </li>
                                <li className='mx-auto'>
                                    <Link to='/dashboard/all-seller'>All Seller</Link>
                                </li>
                                <li className='mx-auto'>
                                    <Link to='/dashboard/all-buyer'>All Buyer</Link>
                                </li>
                                <li className='mx-auto'>
                                    <Link to='/dashboard/reported-products'>Reported Products</Link>
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