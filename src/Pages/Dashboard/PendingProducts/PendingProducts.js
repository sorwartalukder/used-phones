import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading/Loading';
import PendingProduct from './PendingProduct';

const PendingProducts = () => {
    const { data: pendingProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['reported-products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/pending`);
            const data = res.json();
            return data;
        }
    })
    const handleApproved = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ approved: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('approved product')
                    refetch()
                }
            })
    }
    const handleDeleteProduct = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Deleted successful`)
                }
            })

    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='max-w-[1440px] min-h-screen mx-auto my-14'>
            <h1 className='text-center text-4xl mt-8 py-4'>Total Reported Products: {pendingProducts.length}</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-20  mx-9 lg:mx-0'>
                {
                    pendingProducts.map(PProduct => <PendingProduct
                        key={PProduct._id}
                        PProduct={PProduct}
                        handleApproved={handleApproved}
                        handleDeleteProduct={handleDeleteProduct}
                    >

                    </PendingProduct>)
                }
            </div>
        </div>
    );
};

export default PendingProducts;