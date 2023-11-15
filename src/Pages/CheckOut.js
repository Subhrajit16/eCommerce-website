import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItems } from '../features/Cart/cartSlice'
import { useForm } from "react-hook-form"
import { updateUserAddress } from '../features/auth/authSlice'
import { createOrder, currentOrder } from '../features/order/orderSlice'
import { Link, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const adresses = [
//     {
//         name: 'User 1',
//         address: 'Address 1',

//     },
//     {
//         name: 'User 2',
//         address: 'Address 2',

//     },
// ]



function CheckOut() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const dispatch = useDispatch()

    const [paymentType, setPaymentType] = useState('')
    const [userAddress, setUserAddress] = useState(null)
    const cartItems = useSelector(state => state.cart.cartItem)
    const currentOrder = useSelector(state => state.order.currentOrder) //??
    const user = useSelector(state => state.user.userLoggesIn)
    console.log(user)
    // console.log(currentOrder)

    function removeFromCart(id) {
        dispatch(deleteCartItems(id))
    }
    const totalAmt = cartItems.reduce((price, item) => {
        return item.quantity * Math.floor(item.price * (1 - Number(item.discountPercentage) / 100)) + price

    }, 0)

    function handleSaveAddress(data) {
        // console.log(data)
        dispatch(updateUserAddress({ ...user, address: [...user.address, data] }))
        reset()
    }

    function handleOrder() {
        if (paymentType && userAddress) {
            let order = { items: cartItems, totalAmt, user, userAddress }
            dispatch(createOrder(order))
        } else {
            toast.error('Please select address & payment method', {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
        }
    }

    function handleUserAddress(e){
        setUserAddress(user.address[e.target.value])
        console.log(user.address[e.target.value])
    }

    function handlePayment(e) {
        // console.log(e.target.value)
        setPaymentType(e.target.value)
    }

    function handleDeleteAddress(e, idx) {
        e.preventDefault();
        let updatedUserAddress = [...user.address] // [{},{}]
        updatedUserAddress.splice(idx, 1)
        dispatch(updateUserAddress({ ...user, address: updatedUserAddress }))
    }

    // if(!user){
    //     return (
    //         <>
    //             <h1>You must login first</h1>
    //             <Link to='/login'>Go to Login</Link>
    //         </>
    //     )
    // }


    return (
        <div className='container  '>
            {!user && <Navigate replace={true} to='/login'/>}
            {currentOrder && <Navigate replace={true} to='/ordersuccess' />}
            <div className=" row d-flex justify-between p-md-5">

                {/* BILLING ADDRESS */}
                <div className="col-lg-7 border-3 rounded bg-gray-100 col-lg-8">
                    <h3 className=" fs-2 mb-3">Billing address</h3>
                    <form className="needs-validation" noValidate="" onSubmit={handleSubmit(handleSaveAddress)}>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="" required="" fdprocessedid="he6zgj"
                                    {...register('firstName', { required: 'First name cant be empty' })}
                                />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="" required="" fdprocessedid="z4lexv"
                                    {...register('lastName', { required: 'Last name cant be empty' })}
                                />
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>



                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" fdprocessedid="lyx06o"
                                    {...register('email', {
                                        required: 'Email cant be empty',
                                        pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: 'Enter a valid email' }
                                    })}
                                />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" fdprocessedid="p26q9"
                                    {...register('address', { required: 'Address cant be empty' })}
                                />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>



                            <div className="col-md-5">
                                <label htmlFor="country" className="form-label">Country</label>
                                <select className="form-select" id="country" {...register('Country', { required: 'Country cant be empty' })}
                                    required="" fdprocessedid="9ts9x7">
                                    <option >Choose...</option>
                                    <option>United States</option>
                                    <option>India</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="state" className="form-label">State</label>
                                <select className="form-select" id="state"                                     {...register('State', { required: 'State cant be empty' })}
                                    required="" fdprocessedid="tg2khd">
                                    <option >Choose...</option>
                                    <option>Delhi</option>
                                    <option>Karnataka</option>
                                    <option>Maharastra</option>
                                    <option>West Bengal</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="zip" className="form-label">Zip</label>
                                <input type='tel' {...register('Pincode', { required: 'Country cant be empty' })}
                                    className="form-control" id="zip" placeholder="" required="" fdprocessedid="675b3r" />
                                <div className="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="same-address" />
                            <label className="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
                        </div>

                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="save-info" />
                            <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                        </div>

                        <button className='btn btn-primary mt-2' >Save Address</button>

                        {/* Existing address */}
                        <h2 className="mt-3">Chose from existing address</h2>
                        <div>
                            <ul role='list'>
                                {user && user.address.map((address, i) => (
                                    <li key={i} className="flex justify-between gap-x-6 py-2">
                                        <div className="flex min-w-0 gap-x-4">
                                            <input
                                                id={`address-`}
                                                name="existingAddress"
                                                type="radio"
                                                className="form-check-input"
                                                onChange={handleUserAddress}
                                                value={i}
                                            />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                                    {address.firstName}
                                                </p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-900">
                                                    {address.address}
                                                </p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-900">
                                                    {address.State}
                                                </p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-900">
                                                    {address.Pincode}
                                                </p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-900">
                                                    {address.Country}
                                                </p>
                                                <button className='btn btn-danger' onClick={(e) => handleDeleteAddress(e, i)}>Delete address</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <hr className="my-4" />

                        <h4 className="mb-3">Payment</h4>

                        <div className="my-3">

                            <div className="form-check">
                                <input id="debit" name="paymentMethod" value='online' onChange={handlePayment} type="radio" className="form-check-input" required="" />
                                <label className="form-check-label" for="debit">Debit card/Online Payment</label>
                            </div>
                            <div className="form-check">
                                <input id="paypal" name="paymentMethod" value='cash' onChange={handlePayment} type="radio" className="form-check-input" required="" />
                                <label className="form-check-label" for="paypal">COD</label>
                            </div>
                        </div>

                        <div className="row gy-3">
                            <div className="col-md-6">
                                <label for="cc-name" className="form-label">Name on card</label>
                                <input type="text" className="form-control" id="cc-name" placeholder="" required="" fdprocessedid="v48wf" />
                                <small className="text-body-secondary">Full name as displayed on card</small>
                                <div className="invalid-feedback">
                                    Name on card is required
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label for="cc-number" className="form-label">Credit card number</label>
                                <input type="text" className="form-control" id="cc-number" placeholder="" required="" fdprocessedid="xz27ao" />
                                <div className="invalid-feedback">
                                    Credit card number is required
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label for="cc-expiration" className="form-label">Expiration</label>
                                <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" fdprocessedid="a8culk" />
                                <div className="invalid-feedback">
                                    Expiration date required
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label for="cc-cvv" className="form-label">CVV</label>
                                <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" fdprocessedid="r0duhg" />
                                <div className="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                        </div>

                        <hr className="my-4" />

                    </form>
                    <button id='orderplace-btn' onClick={handleOrder} className="w-100 btn mb-3 text-black btn-lg" type="submit" fdprocessedid="anvliw">Place your Order</button>
                </div>


                {/* OVER VIEW */}
                <div className=' col-lg-4 order-lg-1'>
                    <div className="mt-8 w-fit mx-auto">
                        <div className="flow-root">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-black">Your cart items</span>
                                <span className=" h-fit w-5 text-center text-white bg-warning rounded-pill">{cartItems.length}</span>
                            </h4>
                            <ul role="list" className="my-6 divide-y divide-gray-400">
                                {cartItems.map((product) => (
                                    <li key={product.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-400">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3 className='text-xl'>
                                                        {product.title}
                                                    </h3>
                                                    <p className="ml-4 text-xl text-black"> Amount : ₹{product.quantity * Math.floor(product.price * (1 - Number(product.discountPercentage) / 100))}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className='flex gap-2'>
                                                    <p className="text-black-500">Qty : </p>
                                                    <input type="number" readOnly value={product.quantity} className="w-16 h-7 rounded-md border-1  py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        className="font-medium text-red-500 flex gap-1 align-items-center"
                                                        onClick={() => removeFromCart(product.id)}
                                                    >
                                                        Remove <i className="fa-solid fa-trash fa-xl" style={{ color: '#d41111' }}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    <div className="border-t mx-auto w-full border-gray-400 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-semibold text-gray-900">
                            <p className='text-black font-medium text-xl'>Amount to pay :</p>
                            <div>
                                <p className='text-black font-medium text-xl'>₹{totalAmt}</p>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
            <ToastContainer />
        </div>
    )
}

export default CheckOut