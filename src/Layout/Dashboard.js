import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Header from '../Pages/Shared/Header/Header';

const Dashboard = () => {
    const { userRole } = useContext(AuthContext)
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
                        {
                            userRole === 'Admin' && <>
                                <li className='mx-auto'>
                                    <Link to='/dashboard'>All User</Link>
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
        </div>
    );
};

export default Dashboard;