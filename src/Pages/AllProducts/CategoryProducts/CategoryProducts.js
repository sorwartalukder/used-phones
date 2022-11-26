import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import CategoryProduct from './CategoryProduct';

const CategoryProducts = () => {
    const categoryProducts = useLoaderData()
    const navigation = useNavigation();
    if (navigation.state === "loading") {
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
                    >
                    </CategoryProduct>)
                }
            </div>
        </div>
    );
};

export default CategoryProducts;