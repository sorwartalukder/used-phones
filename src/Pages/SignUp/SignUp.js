import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';
const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    //jwt
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    if (token) {
        navigate('/')
    }

    // create user handler
    const handleUserCreate = data => {
        setSignUpError('')
        //create user
        createUser(data.email, data.password)
            .then((result) => {
                toast.success('Account Created Successfully.')
                const user = result.user;
                //store image
                const image = data.image[0];
                const formData = new FormData();
                formData.append('image', image);
                const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then((res) => res.json())
                    .then(imgData => {
                        const userInfo = {
                            displayName: data.name,
                            photoURL: imgData.data.url
                        }
                        // update user
                        updateUserProfile(userInfo)
                            .then(() => {
                                // user save database function call
                                saveUserDatabase(data.accountType, user.displayName, user.email, imgData.data.url)
                            })
                            .catch(e => console.error(e))

                    })

            })
            .catch((error) => {
                const errorMessage = error.message;
                setSignUpError(errorMessage)
                console.error(error)
            });

    }
    //user save function
    const saveUserDatabase = (role, name, email, image) => {
        const user = { role, name, email, image }
        fetch('https://used-phone-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
            })
    }
    //account type
    const accountTypes = ['Buyer', 'Seller']
    return (
        <section className='min-h-screen flex justify-center items-center my-12'>
            <div className='w-96 p-7 shadow-2xl rounded-lg'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleUserCreate)}>

                    {/*account type */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Account Type</span></label>
                        <select
                            {...register("accountType", {
                                required: 'Account Type is required'
                            })}
                            className="select select-bordered w-full max-w-xs">
                            {accountTypes.map((type, i) => <option
                                key={i}
                                value={type}
                            >{type}</option>)}

                        </select>
                        {errors.accountType && <p className='text-red-600'>{errors.accountType?.message}</p>}
                    </div>

                    {/* name field  */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: 'Name is required'
                            })}
                        />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>

                    {/* email field  */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input
                            type="email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    {/* password field  */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input
                            type="password"
                            className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 characters long' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.])/, message: 'Password must be strong. one capital letter, one number and one special key word (!@#$%^&*()-__+.)' }
                            })}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
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
                    <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full mt-4' value='sign up' type="submit" />
                </form>
                {/* go to login page  */}
                <p className='mt-2 pb-6'>Already have an account <Link className='text-primary' to='/login'>Please Login</Link></p>
            </div>
        </section>
    );
};

export default SignUp;