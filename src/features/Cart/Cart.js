import React, { useState, Fragment, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, deleteCartItems, updateCartItems } from './cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuarryContext } from '../../Context/quarryContext';

export default function Cart() {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    
  },[])
  const cartItems = useSelector(state => state.cart.cartItem)
  console.log(cartItems)
  const { setTotalAmt } = useContext(QuarryContext)
  let user = useSelector(state => state.user.userLoggesIn)
  // console.log(user)

  const totalPriceWithoutDiscount = cartItems.reduce((amount, item) => {
    return item.price * item.quantity + amount
  }, 0)

  const totalAmt = cartItems.reduce((price, item) => {

    return item.quantity * Math.floor(item.price * (1 - Number(item.discountPercentage) / 100)) + price

  }, 0)
  // setTotalAmt(totalAmt)

  function removeFromCart(id) {
    dispatch(deleteCartItems(id))
    toast.success('Removed from cart!', {
      position: "top-center",
      autoClose: 1000,
      theme: "colored",
    });

  }

  function handleIncrement(id, quantity) {
    if (quantity < 10) {

      dispatch(updateCartItems({ id, change: { quantity: quantity + 1 } }))
    }
  }

  function handleDecrement(id, quantity) {
    if (quantity > 1) {

      dispatch(updateCartItems({ id, change: { quantity: quantity - 1 } }))
    }
    else {
      dispatch(deleteCartItems(id))
    }
  }



  if (!cartItems.length) {
    return <div style={{ minHeight: '80vh' }}>
      <ToastContainer position="top-center" />
      <h2 className='text-center py-3 text-4xl text-orange-600' >Your cart is empty!!</h2>
      <img className='mx-auto' src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp" alt="emptycart" />
    </div>
  }

  return (
    <>

      <div className="mt-8 w-75 mx-auto">
        <div className="flow-root">
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
                        <Link to=''>{product.title}</Link>
                      </h3>
                      <p className="ml-4 text-xl text-black"> Amount : ₹{product.quantity * Math.floor(product.price * (1 - Number(product.discountPercentage) / 100))}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className='flex gap-2'>
                      <p className="text-black-500">Qty : </p>
                      <button className='px-2 fs-4' onClick={() => handleDecrement(product.id, product.quantity)}>-</button>
                      <input type="number" readOnly value={product.quantity} className="w-16 h-7 rounded-md border-1  py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <button className='px-2 fs-5' onClick={() => handleIncrement(product.id, product.quantity)}>+</button>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-red-500 flex gap-1 align-items-center"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove <i class="fa-solid fa-trash fa-xl" style={{ color: '#d41111' }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="border-t mx-auto w-50 border-gray-400 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-semibold text-gray-900">
          <p className='text-black font-medium text-xl'>Total Amount :</p>
          <div>
            <p className='text-gray-500 font-medium text-decoration-line-through'>₹{totalPriceWithoutDiscount}</p>
            <p className='text-black font-medium text-xl'>₹{totalAmt}</p>
            <p>Your Total saving : ₹{totalPriceWithoutDiscount - totalAmt}</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
            to='/checkout'
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
}
