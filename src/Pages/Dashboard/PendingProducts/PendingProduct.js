import React from 'react';
import { FaCheckCircle, FaUser } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const PendingProduct = ({ PProduct, handleApproved, handleDeleteProduct }) => {
    const { _id, sellerName, userVerify, sellerImage, productName, image, originalPrice, phone, location, condition, date, description, resalePrice, yearOfPurchase, time } = PProduct;
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
                <div className='flex items-center'>
                    <div className="avatar">
                        <div className="w-8 rounded-full ring ring-primary">
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
                    <h4 className='text-xl font-bold ml-1'>{sellerName}</h4>
                </div>
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
                    <label
                        onClick={() => handleDeleteProduct(_id)}
                        className="badge badge-outline bg-red-500 px-5 text-white">Delete</label>
                    <label
                        onClick={() => handleApproved(_id)}
                        className="badge badge-outline bg-green-500 px-5 text-white">
                        Approved
                    </label>
                </div>
            </div>
        </div>
    );
};

export default PendingProduct;