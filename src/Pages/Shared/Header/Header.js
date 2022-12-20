import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PrimaryBtn from '../../../components/AllButton/PrimaryBtn';
import { AuthContext } from '../../../contexts/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    let activeClass = {
        color: "blue",
        background: "none",
    };
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(e => console.error(e))
    }

    const menuItems = <React.Fragment>
        <li>
            <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/">Home</NavLink>
        </li>
        <li tabIndex={0}>
            <Link to='/category/iphone'
                className="justify-between">
                Categories
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </Link>
            <ul className="p-2 text-white bg-slate-900">
                <li>
                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to='/category/iphone'>Iphone</NavLink>
                </li>
                <li>
                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to='/category/xiaomi'>Xiaomi</NavLink>
                </li>
                <li>
                    <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to='/category/oppo'>Oppo</NavLink>
                </li>
            </ul>
        </li>
        <li>
            <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/blogs">blogs</NavLink>
        </li>
        <li>
            <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)}
                to="/support">Support</NavLink>
        </li>
        <li>
            <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)}
                to="/developer">Developer</NavLink>
        </li>
        {
            user && <li>
                <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/dashboard">Dashboard</NavLink>
            </li>
        }
    </React.Fragment>
    return (
        <div className='bg-base-100'>
            <div className="navbar max-w-[1440px] mx-auto">
                <div className="navbar-start">
                    {/* mobile */}
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
                                className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white hover:shadow-secondary hover:shadow-md">Log out</button>
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