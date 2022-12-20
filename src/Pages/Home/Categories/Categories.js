import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = [{ category: 'iphone' }, { category: 'xiaomi' }, { category: 'oppo' }]

    const categoriesClass = ['bg-white text-black', 'bg-slate-900 text-white', 'bg-white text-black']

    categories.forEach((category, i) => {
        category.class = categoriesClass[i]
    })
    return (
        <div className='max-w-[1440px] mx-auto'>
            <h2 className='text-center font-bold text-4xl my-6'>Products Categories</h2>
            <div className='grid md:grid-cols-3 mx-9 md:mx-0 '>
                {
                    categories.map((category, i) => <div
                        key={i}
                        className={`${category.class} flex justify-center items-center`}>
                        <div className="py-8">
                            <Link to={`/category/${category.category}`} className="font-bold text-2xl hover:text-blue-700 hover:shadow-primary hover:shadow-md hover:px-3 py-1 rounded-md">{category.category} <FaLongArrowAltRight className='inline text-blue-700' /></Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Categories;