import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../components/Loading/Loading';
import Product from './Product';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';

const MyProducts = () => {
    const { user } = useContext(AuthContext)

    const [deletingProduct, setDeletingProduct] = useState(null)
    const closeModal = () => {
        setDeletingProduct(null);
    }


    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://used-phone-server.vercel.app/products?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('usePhonsToken')}`
                }
            });
            const data = res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    //product advertise handler
    const handleAdvertise = (id) => {
        fetch(`https://used-phone-server.vercel.app/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ advertise: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Start advertising.')
                    refetch()
                }
            })
    }
    // product delete handler 
    const handleDeleteProduct = (product) => {
        console.log(product._id)
        fetch(`https://used-phone-server.vercel.app/products/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`${product.sellerName} ${product.productName} deleted successful`)
                }
            })

    }
    return (
        <div className='max-w-[1440px] min-h-screen mx-auto my-14'>
            <h1 className='text-center text-4xl mt-8 py-4'>Total Products: {products?.length}</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-20  mx-9 lg:mx-0'>
                {products?.length &&
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        setDeletingProduct={setDeletingProduct}
                        handleAdvertise={handleAdvertise}
                    >
                    </Product>)
                }
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct?.productName}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    modalData={deletingProduct}
                    successButtonName='Delete'
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;