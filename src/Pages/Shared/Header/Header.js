import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PrimaryBtn from '../../../components/AllButton/PrimaryBtn';
import { AuthContext } from '../../../contexts/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(e => console.error(e))
    }

    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        <li tabIndex={0}>
            <Link
                className="justify-between">
                Categories
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </Link>
            <ul className="p-2 text-white bg-slate-900">
                <li><Link to='category/iphone'>Iphone</Link></li>
                <li><Link to='category/xiaomi'>Xiaomi</Link></li>
                <li><Link to='category/oppo'>Oppo</Link></li>
            </ul>
        </li>
        <li><Link to="/blogs">blogs</Link></li>
        {
            user && <li><Link to="/dashboard">Dashboard</Link></li>
        }
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
                            <Link to='/login'>
                                <PrimaryBtn>
                                    Log In
                                </PrimaryBtn>
                            </Link>
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