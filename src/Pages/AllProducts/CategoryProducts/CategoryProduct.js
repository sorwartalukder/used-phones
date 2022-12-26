import React from 'react';
import { FaCheckCircle, FaUser } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';
const CategoryProduct = ({ product, setBookProduct, handleReport }) => {
    const { _id, sellerName, email, userVerify, sellerImage, productName, image, originalPrice, phone, location, condition, date, description, resalePrice, yearOfPurchase, time } = product;
    // console.log(product)

    return (
        <div className="card bg-base-100 border shadow-xl h-full" >

            <PhotoProvider >
                <PhotoView src={image}>
                    <figure>
                        <img className='w-full h-64' src={image} alt="Shoes" />
                    </figure>
                </PhotoView>
            </PhotoProvider>

            <div className="card-body">
                <Link to={`/User/Details/${email}`}>
                    <div className='flex items-center'>
                        <div className="avatar">
                            <div className="w-8 rounded-full ring ring-primary hover:ring-blue-700 hover:shadow-md hover:shadow-yellow-500">
                                {
                                    sellerImage ?
                                        <img src={sellerImage} alt='' />
                                        :
                                        <p className='text-4xl'><FaUser /></p>
                                }
                            </div>
                            {
                                userVerify && <p className='-ml-1 text-blue-700'><FaCheckCircle></FaCheckCircle></p>
                            }

                        </div>
                        <h4 className='text-xl font-bold ml-1 hover:text-primary'>{sellerName}</h4>
                    </div>
                </Link>
                <p><small>{date} ({time})</small></p>
                <h2 className="card-title">
                    {productName}
                </h2>
                <p className='font-semibold'>Location: {location}</p>
                <p className='font-semibold'>Condition: {condition}</p>
                <p className='font-semibold'>Purchase Year: {yearOfPurchase}</p>
                <p>{description.slice(0, 97
                )}...</p>
                <h4 className="card-title">Resale Price:<span style={{ color: 'darkorange' }}>{resalePrice} TK</span></h4>
                <h4 className="card-title">Original Price: {originalPrice} TK</h4>
                <p className='font-semibold'>Mobile Number: {phone}</p>
                <div className="card-actions justify-between">
                    <button
                        onClick={() => handleReport(_id)}
                        className="badge badge-outline px-5 text-red-500 hover:shadow-red-500 hover:shadow-md">
                        Report</button>

                    <label
                        htmlFor="book-now"
                        onClick={() => setBookProduct(product)}
                        className="badge badge-outline px-5 text-blue-900 hover:shadow-secondary hover:shadow-md">Book now</label>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;