import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = [{ category: 'iphone' }, { category: 'xiaomi' }, { category: 'oppo' }]

    const categoriesClass = ['bg-white text-black', 'bg-black text-white', 'bg-white text-black']

    categories.forEach((category, i) => {
        category.class = categoriesClass[i]
    })
    return (
        <div className='max-w-[1440px] mx-auto'>
            <h2 className='text-center font-bold text-4xl my-6'>Service Specialty</h2>
            <div className='grid md:grid-cols-3 mx-9 md:mx-0 '>
                {
                    categories.map((category, i) => <div
                        key={i}
                        className={`${category.class} flex justify-center items-center`}>
                        <div className="py-8" style={{ textAlign: 'justify' }}>
                            <Link to={`/category/${category.category}`} className="font-bold text-2xl">{category.category}</Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Categories;