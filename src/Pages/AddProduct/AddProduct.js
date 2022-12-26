import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    //date and time
    const currentDate = new Date();
    const time = (currentDate.getHours() + ':' + currentDate.getMinutes())
    const date = format(currentDate, 'PP');
    const navigate = useNavigate()

    //add product
    const handleAddProduct = data => {
        //image hosting
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((imgData) => {
                console.log(imgData)
                if (imgData.success) {
                    const { productName, resalePrice, originalPrice, yearOfPurchase, category, condition, location, phone, description, relevantInformation } = data;

                    // product data 
                    const product = {
                        sellerName: user.displayName,
                        sellerImage: user.photoURL,
                        email: user.email,
                        productName,
                        image: imgData.data.url,
                        resalePrice: parseFloat(resalePrice.replaceAll(',', '')),
                        originalPrice: parseFloat(originalPrice.replaceAll(',', '')),
                        yearOfPurchase,
                        category,
                        condition,
                        location,
                        phone,
                        description,
                        relevantInformation,
                        time,
                        date
                    }
                    console.log(product)
                    fetch('https://used-phone-server.vercel.app/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            if (result.acknowledged) {
                                toast.success(`${user.displayName} product added successfully.`)
                                navigate('/dashboard/my-products')
                            }
                        })

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const categories = ['iphone', 'xiaomi', 'oppo']
    const condition = ['excellent', 'good', 'fair']
    const locations = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Rangpur', 'Mymensingh', 'Barishal', 'Khulna']
    return (
        <div className='max-w-[1440px] min-h-screen mx-auto my-14'>
            <div className='p-7'>
                <h2 className="text-4xl">Add A Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                        {/* product name  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Product Name</span></label>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                {...register("productName", {
                                    required: 'Product name is required'
                                })}
                            />
                            {errors.productName && <p className='text-red-600'>{errors.productName?.message}</p>}

                        </div>

                        {/* resale price  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Resale price</span></label>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                {...register("resalePrice", {
                                    required: 'resale price is required'

                                })}
                            />
                            {errors.resalePrice && <p className='text-red-600'>{errors.resalePrice?.message}</p>}
                        </div>
                        {/*  original price  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text"> Original price</span></label>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                {...register("originalPrice", {
                                    required: ' original price is required'

                                })}
                            />
                            {errors.originalPrice && <p className='text-red-600'>{errors.originalPrice?.message}</p>}
                        </div>

                        {/* Year of purchase  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Year of purchase</span></label>
                            <select
                                {...register("yearOfPurchase")}
                                className="select select-bordered w-full max-w-xs">
                                {
                                    [...Array(30).keys()].map(number => <option
                                        key={number}
                                        defaultValue={2022 - number}
                                    >
                                        {2022 - number}
                                    </option>)
                                }
                            </select>
                        </div>

                        {/* category  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Category</span></label>
                            <select
                                {...register("category")}
                                className="select select-bordered w-full max-w-xs">
                                {
                                    categories.map((category, i) => <option
                                        key={i}
                                        defaultValue={category}
                                    >{category}</option>)
                                }
                            </select>
                        </div>

                        {/* condition  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Condition</span></label>
                            <select
                                {...register("condition")}
                                className="select select-bordered w-full max-w-xs">
                                {
                                    condition.map((con, i) => <option
                                        key={i}
                                        defaultValue={con}
                                    >{con}</option>)
                                }
                            </select>
                        </div>

                        {/* location  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Location</span></label>
                            <select
                                {...register("location")}
                                className="select select-bordered w-full max-w-xs">
                                {
                                    locations.map((location, i) => <option
                                        key={i}
                                        defaultValue={location}
                                    >{location}</option>)
                                }
                            </select>
                        </div>

                        {/* Mobile number  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Mobile Number</span></label>
                            <input
                                type="phone"
                                className="input input-bordered w-full max-w-xs"
                                {...register("phone", {
                                    required: 'Mobile number is required'

                                })}
                            />
                            {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                        </div>

                        {/* Description */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Description</span></label>
                            <textarea
                                className="textarea textarea-bordered"
                                placeholder="description"
                                {...register("description", {
                                    required: 'description is required'

                                })}
                            ></textarea>
                            {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}
                        </div>

                        {/* Relevant information */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Relevant information</span></label>
                            <textarea
                                className="textarea textarea-bordered"
                                placeholder="relevant information"
                                {...register("relevantInformation", {
                                    required: 'relevant information is required'
                                })}
                            ></textarea>
                            {errors.relevantInformation && <p className='text-red-600'>{errors.relevantInformation?.message}</p>}
                        </div>
                        {/* image  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Photo</span></label>
                            <input
                                type="file"
                                className="input input-bordered w-full max-w-xs"
                                {...register("image", {
                                    required: 'image is required'
                                })}
                            />
                            {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}

                        </div>
                    </div>
                    <input className='btn btn-accent max-w-xs mt-4' value='Add Product' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;