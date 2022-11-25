import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const Product = ({ product }) => {
    const { sellerName, productName, image, category, originalPrice, phone, location, condition, date, description, relevantInformation, resalePrice, yearOfPurchase, time } = product;
    return (
        <div>
            <div className="card bg-base-100 border shadow-xl" >

                <PhotoProvider >
                    <PhotoView src={image}>
                        <figure>
                            <img className='w-full h-64' src={image} alt="Shoes" />
                        </figure>
                    </PhotoView>
                </PhotoProvider>

                <div className="card-body">
                    <h2 className="card-title">
                        {productName}
                    </h2>
                    <p>{description.slice(0, 97
                    )}...</p>
                    <div>
                        <h4 className="card-title">Resale Price:<span style={{ color: 'darkorange' }}>{resalePrice} TK</span></h4>
                        <h4 className="card-title">Original Price: {originalPrice} TK</h4>
                    </div>
                    <div className="card-actions justify-between">
                        <button className="badge badge-outline px-5 text-blue-900">
                            Details</button>

                        <button className="badge badge-outline px-5 text-blue-900 ">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;