import React from 'react';
import { FaCheckCircle, FaUser } from 'react-icons/fa';
import 'react-photo-view/dist/react-photo-view.css';

const BookNowModal = ({ bookProduct, handleBooking, closeModal }) => {
    const { sellerName, sellerImage, productName, originalPrice, phone, location, condition, date, description, resalePrice, yearOfPurchase, time } = bookProduct;
    return (
        <div>
            <input type="checkbox" id="book-now" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="card bg-base-100 border shadow-xl h-full" >
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
                                    <p className='-ml-1 text-blue-700'><FaCheckCircle></FaCheckCircle></p>
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
                            <p>{description}</p>
                            <h4 className="card-title">Resale Price:<span style={{ color: 'darkorange' }}>{resalePrice} TK</span></h4>
                            <h4 className="card-title">Original Price: {originalPrice} TK</h4>
                            <p className='font-semibold'>Mobile Number: {phone}</p>
                        </div>
                    </div>
                    {/* btns div */}
                    <div className="modal-action">
                        <label
                            onClick={() => handleBooking(bookProduct)}
                            htmlFor="book-now" className="btn">Submit</label>
                        <label onClick={closeModal} className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookNowModal;