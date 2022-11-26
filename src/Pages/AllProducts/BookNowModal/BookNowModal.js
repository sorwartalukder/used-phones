import React, { useContext } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookNowModal = ({ bookProduct, handleBooking, closeModal }) => {
    const { user } = useContext(AuthContext)
    const { productName, resalePrice } = bookProduct;
    return (
        <div>
            <input type="checkbox" id="book-now" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form >
                        {/* name field  */}
                        <div className=" flex  font-bold text-lg">
                            <label className="label"><span className="label-text">Your Name: </span></label>
                            <input disabled
                                defaultValue={user.displayName}
                                type="text"

                            />

                        </div>
                        {/* email field  */}
                        <div className=" flex  mt-4 font-bold text-lg">
                            <label className="label"><span className="label-text">Your Email: </span></label>
                            <input disabled
                                defaultValue={user.email}
                                type="text" />
                        </div>
                        {/* product name field  */}
                        <div className=" flex  mt-4 font-bold text-lg">
                            <label className="label"><span className="label-text">Product Name: </span></label>
                            <input disabled
                                defaultValue={productName}
                                type="text" />
                        </div>
                        {/* price field  */}
                        <div className=" flex  mt-4 font-bold text-lg">
                            <label className="label"><span className="label-text">price: </span></label>
                            <input disabled

                                defaultValue={resalePrice}
                                type="text" />
                        </div>
                        {/* buttons div */}
                        <div className="modal-action">
                            <label
                                type="submit"
                                onClick={() => handleBooking(bookProduct)}
                                htmlFor="book-now" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white "
                            >Submit</label>
                            <label onClick={closeModal} className="btn">Cancel</label>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default BookNowModal;