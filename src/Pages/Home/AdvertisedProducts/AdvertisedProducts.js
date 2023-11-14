import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading/Loading';
import BookNowModal from '../../AllProducts/BookNowModal/BookNowModal';
import AdvertisedProduct from './AdvertisedProduct';

const AdvertisedProducts = () => {
    const [bookProduct, setBookProduct] = useState(null)
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const { data: advertisedProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['advertised-products', search],
        queryFn: async () => {
            const res = await fetch(`https://used-phone-server.vercel.app/products/advertise?search=${search}`);
            const data = res.json();
            return data
        }
    })
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
        fetch('https://used-phone-server.vercel.app/booking', {
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

        fetch(`https://used-phone-server.vercel.app/products/${productId}`, {
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
    // handle search
    const handleSearch = () => {
        setSearch(searchRef.current.value.replaceAll('pro', ''))
    }
    // products loading spinner 
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='max-w-[1440px] mx-auto my-16'>
            {

                <div className='my-6 flex justify-between items-center'>
                    <h2 className='font-bold text-4xl'>Advertised Products</h2>
                    <div>
                        <input ref={searchRef} type="text" placeholder="Type here" className="input input-bordered input-primary input-sm max-w-xs" />
                        <button
                            onClick={handleSearch}
                            type="submit"
                            className="ml-3 btn btn-sm btn-primary bg-gradient-to-r from-primary to-secondary text-white hover:shadow-secondary hover:shadow-md"
                        >Search</button>
                    </div>
                </div>

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