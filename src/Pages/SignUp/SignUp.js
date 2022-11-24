import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    // create user
    const handleUserCreate = data => {
        setSignUpError('')
        createUser(data.email, data.password)
            .then((result) => {
                toast.success('Account Created Successfully.')
                const user = result.user;
                const userInfo = {
                    displayName: data.name
                }
                // update user
                updateUserProfile(userInfo)
                    .then(() => {
                        // user save database function call
                        saveUserDatabase(data.accountType, user.displayName, user.email)
                    })
                    .catch(e => console.error(e))
            })
            .catch((error) => {
                const errorMessage = error.message;
                setSignUpError(errorMessage)
                console.error(error)
            });

    }
    //user save function
    const saveUserDatabase = (role, name, email) => {
        const user = { role, name, email }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/')
            })
    }
    //account type
    const accountTypes = ['Seller', 'Buyer']
    return (
        <section className='min-h-screen flex justify-center items-center my-12'>
            <div className='w-96 p-7 shadow-2xl rounded-lg'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <h2 className='text-xl text-center'>mD.talukdeR2.0</h2>
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
                                pattern: { value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.])/, message: 'Password must be strong' }
                            })}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </div>

                    {/* Photo field */}
                    {/* <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Upload profile picture</span></label>
                        <input
                            type="file"
                            className="input input-bordered w-full max-w-xs"
                            {...register("photoURL", {
                                required: 'photo is required'
                            })}
                        />
                        {errors.photoURL && <p className='text-red-600'>{errors.photoURL?.message}</p>}
                    </div> */}
                    <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full mt-4' value='sign up' type="submit" />
                </form>
                {/* go to login page  */}
                <p className='mt-2 pb-6'>Already have an account <Link className='text-primary' to='/login'>Please Login</Link></p>
            </div>
        </section>
    );
};

export default SignUp;