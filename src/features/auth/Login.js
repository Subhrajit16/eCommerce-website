import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { auth, googleProvider } from '../../Firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  // console.log(errors)
  const [searchParams, setSearchParams] = useSearchParams()
  const [checkUser, setCheckUser] = useState('')
  const [checkUserSuccess, setcheckUserSuccess] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate();

  let querryMsg = searchParams.get('message')
  const userData = useSelector(state => state.user.userLoggesIn)
  // console.log(userData)

  function handleLogin(data) {

    console.log(data)
    toast.loading('Waiting...');
    if (data.email != userData.email || data.password != userData.password) {
      setCheckUser('Email or Password is wrong')
      console.log(1)
      toast.dismiss()
    } else {
      setCheckUser('')
      setcheckUserSuccess('Successfull')
      // console.log(2)
      toast.dismiss()

    }

    reset();
  }

  async function googleLogIn(){
    await signInWithPopup(auth, googleProvider)
    navigate('/')
  }
  return (
    <>
      {checkUserSuccess ? <Navigate to='/' /> : null}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          {querryMsg ? <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
            {querryMsg}!!
          </h2> : <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>}
          {checkUser ? <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
            {checkUser}!!
          </h2> : null}
          {checkUserSuccess ? <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-500">
            {checkUserSuccess}!!
          </h2> : null}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', { required: 'Email cant be empty' })}
                  type="email"
                  // autoComplete="email"
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
                  {...register('password', { required: "Password cant be empty" })}
                  type="password"
                  // autoComplete="current-password"

                  className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className='text-red-800 font-medium'>{errors.password.message}</p>}
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
            <p className='text-center mt-3'>or Login with</p>
            <img onClick={googleLogIn} className='mx-auto cursor-pointer' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" width={'40px'} alt="" />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            New here?{' '}
            <Link to='/signup' href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              SignUp
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
}
