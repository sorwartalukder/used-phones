import React from 'react';
import { Link } from 'react-router-dom';
import phones from '../../../assets/Images/banner image.jpg'

const HomeHeader = () => {
    return (
        <div className="hero my-14 py-20 bg-slate-900 min-h-[80vh] ">
            <div className="hero-content flex-col lg:flex-row-reverse  ">
                <img src={phones} className=" rounded-lg w-full  shadow-2xl" alt='' />
                <div className='text-white w-full lg:mr-20'>
                    <h1 className="text-5xl font-bold ">USED PHONES</h1>
                    <p className="py-6 text-xl">Keep looking and maybe you will get your favorite mobile.</p>
                    <Link to='signup'>  <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white hover:shadow-white hover:shadow-md">start</button></Link>
                </div>
            </div>
        </div >
    );
};

export default HomeHeader;