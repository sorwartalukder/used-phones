import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading/Loading';
import { AuthContext } from '../../../contexts/AuthProvider';
import BookNowModal from '../../AllProducts/BookNowModal/BookNowModal';
import AdvertisedProduct from './AdvertisedProduct';

const AdvertisedProducts = () => {
    const { user } = useContext(AuthContext)
    const [bookProduct, setBookProduct] = useState(null)
    const { data: advertisedProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['advertised-products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products/advertise');
            const data = res.json();
            return data
        }
    })

    //booking modal close handle
    const closeModal = () => {
        setBookProduct(null);
    }
    //booking handle
    const handleBooking = event => {
        event.preventDefault()
        const form = event.target;
        const productId = form.productId.value;
        const sellerName = form.sellerName.value;
        const sellerEmail = form.sellerEmail.value;
        const sellerMobile = form.sellerMobile.value;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const productName = form.productName.value;
        const price = form.price.value;
        const buyerMobile = form.buyerMobile.value;
        const meetingLocation = form.meetingLocation.value;

        const booking = {
            sellerName,
            productId,
            sellerEmail,
            sellerMobile,
            buyerName,
            buyerEmail,
            productName,
            price,
            buyerMobile,
            meetingLocation
        }
        setBookProduct(null)
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`${buyerName} Your order confirm`)
            })

        fetch(`http://localhost:5000/products/${productId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ booked: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                }
            })
    }
    // products loading spinner 
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='max-w-[1440px] mx-auto my-16'>
            {
                advertisedProducts.length ? <h2 className='text-center font-bold text-4xl my-6'>Advertised Products</h2>
                    :
                    ''
            }


            {/* advertised products  */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-20  mx-9 lg:mx-0'>
                {
                    advertisedProducts.map(advertisedProduct => <AdvertisedProduct
                        key={advertisedProduct._id}
                        advertisedProduct={advertisedProduct}
                        setBookProduct={setBookProduct}
                    >

                    </AdvertisedProduct>)
                }
            </div>
            {
                bookProduct && <BookNowModal
                    handleBooking={handleBooking}
                    bookProduct={bookProduct}
                    closeModal={closeModal}
                >

                </BookNowModal>
            }
        </div>
    );
};

export default AdvertisedProducts;