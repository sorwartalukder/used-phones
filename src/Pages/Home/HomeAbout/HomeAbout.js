import React from 'react';
import phones from '../../../assets/Images/banner image.jpg'

const HomeAbout = () => {
    return (
        <div className='py-24 my-20 bg-white max-w-[1440px] mx-auto' >
            <div className=" text-black rounded-lg">
                <div className="hero-content flex-col lg:flex-row ">
                    <div>
                        <h2
                            className="font-bold text-3xl">Used Phones
                        </h2>
                        <p className='text-xl font-bold mt-4'>World largest marketplace</p>
                    </div>
                    <img className=" rounded-lg w-1/4  shadow-2xl" src={phones} alt="" />
                </div>
                <hr style={{ border: '2px solid' }} />
                <div className="mt-6 p-5" style={{ textAlign: 'justify' }}>
                    <p className='text-xl'> Used Phone is basically a platform where you can buy and sell used phones! We help users to buy and sell phones. We ensure safe, smart and simple solutions for customers across multiple categories.</p>
                </div>
            </div>
        </div>
    );
};

export default HomeAbout;