import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from './authSlice';
import { googleProvider } from '../../Firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase-config';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const dispatch  = useDispatch()
    const navigate = useNavigate();
    const userData=useSelector(state=>state.user.userLoggesIn)
    // console.log(userData)
    async function googleSignIn(){
       await signInWithPopup(auth, googleProvider)
       navigate('/')
    }
    return (
        <div>
            {/* {user ? <Navigate to='/'/> : null} */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create new account!
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(data => {
                        console.log(data)
                        dispatch(createUser({username: data.name, email:data.email, password:data.password, address:[]}))
                        reset()
                    })}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Your name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    {...register('name', {
                                        required: 'Username cant be empty', minLength: {
                                            value: 3,
                                            message: 'Username must be at least 3 characters long',
                                        }, maxLength: 15
                                    })}
                                    type="name"
                                    autoComplete="name"
                                    className="block w-full rounded-md border-2 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.name && <p className='text-red-800 font-medium'>{errors.name.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register('email', {
                                        required: 'Email cant be empty',
                                        pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: 'Enter a valid email' }
                                    })}
                                    type="email"
                                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                                {errors.email && <p className='text-red-800 font-medium'>{errors.email.message}</p>}

                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register('password', { required: 'Password cant be empty', minLength: {value:5, message: 'Password must be 5 char'}, maxLength: 15 })} type="password"
                                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.password && <p className='text-red-800 font-medium'>{errors.password.message}</p>}

                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="ConfirmPassword"
                                    {...register('ConfirmPassword', {
                                        required: 'Password cant be empty', minLength: 5, maxLength: 15, validate: (value, formValues) => value === formValues.password || 'Password did not match'
                                    })} type="password"
                                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                                {errors.ConfirmPassword && <p className='text-red-800 font-medium'>{errors.ConfirmPassword.message}</p>}

                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div>
                        <p className='text-center mt-3'>or signin with</p>
                        <img onClick={googleSignIn} className='mx-auto cursor-pointer' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" width={'40px'} alt="" />
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Alrady have an account?
                        <Link to='/login' href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp