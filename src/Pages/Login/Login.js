import React, { useContext, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logIn, loginWithGoogle } = useContext(AuthContext)
    const [loginError, setLoginError] = useState('')
    const [acTypeError, setAcTypeError] = useState('')
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    // jwt 
    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail)
    if (token) {
        navigate(from, { replace: true });
    }


    //email login handler 
    const handleLogin = data => {
        setLoginError('')
        setAcTypeError('')
        //check user role
        fetch(`https://used-phone-server.vercel.app/user?email=${data.email}`)
            .then(res => res.json())
            .then(user => {
                if (user.role === data.accountType) {
                    // login user 
                    logIn(data.email, data.password)
                        .then((result) => {
                            toast.success('Log In Successfully.')
                            const user = result.user;
                            setLoginUserEmail(user.email)
                        })
                        .catch((error) => {
                            // login error message
                            const errorMessage = error.message;
                            setLoginError(errorMessage)
                            console.error(error)
                        });
                }
                else {
                    //wrong account information message
                    setAcTypeError('wrong account type')
                    toast.error('please select right account type')
                }
            })
    }
    // google login handler
    const handleLoginWithGoogle = () => {
        loginWithGoogle(googleProvider)
            .then((result) => {
                const user = result.user;
                saveUserDatabase('Buyer', user.displayName, user.email, user.photoURL)
                toast.success('Log In Successfully.')
                setLoginUserEmail(user.email)
            }).catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            });
    }
    // user save database function
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
            })
    }

    const accountTypes = ['Buyer', 'Seller', 'Admin']
    return (
        <section className='min-h-screen py-14 flex justify-center items-center'>
            <div className='w-96 p-7 shadow-2xl rounded-lg'>
                <h2 className='text-xl text-center'>Login</h2>
                <h2 className='text-xl text-center'>Admin feature explore</h2>
                <h2 className='text-xl text-center'>	so@1.com</h2>
                <h2 className='text-xl text-center'>	so@1.coM</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
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
                        {acTypeError && <p className='text-red-600'>{acTypeError}</p>}
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
                                required: 'Password is required'
                            })}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        {loginError && <p className='text-red-600'>{loginError}</p>}

                        <label className="label"><span className="label-text">Forget Password</span></label>
                    </div>
                    <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full' value='login' type="submit" />
                </form>
                {/* account create link  */}
                <p className='mt-2'>New to Used Phones <Link className='text-primary pt-2' to='/signup'>Create new Account</Link></p>
                {/* google login  */}
                <div className="divider">OR</div>
                <button
                    onClick={handleLoginWithGoogle}
                    className='btn btn-outline  w-full'
                >CONTINUE WITH GOOGLE</button>
            </div>
        </section>
    );
};

export default Login;