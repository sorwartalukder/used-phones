import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import BookNowModal from '../BookNowModal/BookNowModal';
import CategoryProduct from './CategoryProduct';

const CategoryProducts = () => {
    const categoryName = useLoaderData()
    const [bookProduct, setBookProduct] = useState(null)
    const navigation = useNavigation();

    const { data: categoryProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['categoryProducts'],
        queryFn: async () => {
            const res = await fetch(`https://used-phone-server.vercel.app/category/products/${categoryName.category}`);
            const data = res.json();
            return data
        }
    })

    //booking modal close handle
    const closeModal = () => {
        setBookProduct(null);
    }
    // booking handle
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

    const handleReport = (id) => {
        console.log(id)
        fetch(`https://used-phone-server.vercel.app/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ report: true })
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`report successful`)
            })
    }
    //data loading spinner
    if (navigation.state === "loading" || isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='max-w-[1440px] min-h-screen mx-auto my-14'>
            <h1 className='text-center text-4xl mt-8 py-4'>Total Products: {categoryProducts.length}</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-20  mx-9 lg:mx-0'>
                {
                    categoryProducts.map(product => <CategoryProduct
                        key={product._id}
                        product={product}
                        setBookProduct={setBookProduct}
                        handleReport={handleReport}
                    >
                    </CategoryProduct>)
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

export default CategoryProducts;