import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { AuthContext } from '../../../contexts/AuthProvider';
import BookNowModal from '../BookNowModal/BookNowModal';
import CategoryProduct from './CategoryProduct';

const CategoryProducts = () => {

    const categoryProducts = useLoaderData()
    const [allCategoryProducts, setAllCategoryProducts] = useState(categoryProducts)
    const [bookProduct, setBookProduct] = useState(null)
    const { user } = useContext(AuthContext)
    const navigation = useNavigation();


    //booking modal close handle
    const closeModal = () => {
        setBookProduct(null);
    }
    //booking handle
    const handleBooking = data => {

        console.log(data)

        fetch(`http://localhost:5000/products/advertise/${bookProduct._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ booked: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`${user.displayName} ${bookProduct.productName} is booked for you`)
                    const remaining = categoryProducts.filter(categoryProduct => categoryProduct._id !== bookProduct._id)
                    setAllCategoryProducts(remaining)

                }
            })
    }
    //data loading spinner
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }

    return (
        <div className='max-w-[1440px] min-h-screen mx-auto my-14'>
            <h1 className='text-center text-4xl mt-8 py-4'>Total Products: {categoryProducts.length}</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-20  mx-9 lg:mx-0'>
                {
                    allCategoryProducts.map(product => <CategoryProduct
                        key={product._id}
                        product={product}
                        setBookProduct={setBookProduct}
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