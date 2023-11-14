import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import BookNowModal from '../BookNowModal/BookNowModal';
import CategoryProduct from './CategoryProduct';
import filterImg from '../../../assets/Icons/filter.svg'

const CategoryProducts = () => {
    const categoryName = useLoaderData()
    const [filter, setFilter] = useState(false)
    const [location, setLocation] = useState('')
    const [bookProduct, setBookProduct] = useState(null)
    const navigation = useNavigation();
    const { data: categoryProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['categoryProducts', categoryName?.category, location],
        queryFn: async () => {
            const res = await fetch(`https://used-phone-server.vercel.app/category/products/${categoryName?.category}?location=${location}`, {
                headers: {
                    //jwt
                    authorization: `bearer ${localStorage.getItem('usePhonsToken')}`
                }
            });
            const data = res.json();
            return data
        }
    })
    console.log(categoryProducts)
    console.log(categoryName)

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
    // handle filter
    const handleFilter = (e) => {
        e.preventDefault()
        setFilter(false)
        setLocation(e.target.location.value)

    }
    //data loading spinner
    if (navigation.state === "loading" || isLoading) {
        return <Loading></Loading>
    }
    const locations = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Rangpur', 'Mymensingh', 'Barishal', 'Khulna']
    return (
        <div className='max-w-[1440px] min-h-screen mx-auto mb-14'>
            <div className='py-4 flex justify-between items-center px-4'>
                <h1 className=' text-3xl'>Total Products: {categoryProducts?.length}</h1>
                <div>
                    {
                        filter ?
                            <form
                                className='flex items-center'
                                onSubmit={handleFilter}>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label"><span className="label-text">Location</span></label>
                                    <select
                                        name='location'
                                        className="select select-bordered select-sm  max-w-xs">
                                        <option></option>
                                        {
                                            locations.map((l, i) => <option
                                                key={i}
                                                defaultValue={l}
                                            >{l}</option>)
                                        }
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="ml-3 mt-9 btn btn-sm btn-primary bg-gradient-to-r from-primary to-secondary text-white hover:shadow-secondary hover:shadow-md"
                                >Search</button>
                            </form>
                            :
                            <img src={filterImg}
                                onClick={() => setFilter(!filter)}
                                className='hover:shadow-md hover:shadow-primary hover:rounded-sm'
                                width="30" height="30"
                                alt="filter" />
                    }
                </div>
            </div>

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