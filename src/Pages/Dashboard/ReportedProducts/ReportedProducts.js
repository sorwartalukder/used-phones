import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading/Loading';
import ReportedProduct from './ReportedProduct';

const ReportedProducts = () => {
    const { data: reportedProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['reported-products'],
        queryFn: async () => {
            const res = await fetch(`https://used-phone-server.vercel.app/reported/products`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('usePhonsToken')}`
                }
            });
            const data = res.json();
            return data;
        }
    })
    const handleDelete = (id) => {
        fetch(`https://used-phone-server.vercel.app/products/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`deleted successful`)
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='max-w-[1440px] min-h-screen mx-auto my-14'>
            <h1 className='text-center text-4xl mt-8 py-4'>Total Reported Products: {reportedProducts?.length}</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-20  mx-9 lg:mx-0'>
                {reportedProducts?.length &&
                    reportedProducts.map(RProduct => <ReportedProduct
                        key={RProduct._id}
                        RProduct={RProduct}
                        handleDelete={handleDelete}
                    >
                    </ReportedProduct>)
                }
            </div>
        </div>
    );
};

export default ReportedProducts;