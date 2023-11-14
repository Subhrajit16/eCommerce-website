import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, resetCartItems } from '../features/Cart/cartSlice'
import { resetOrder } from '../features/order/orderSlice'

function OrderSuccess() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetCartItems())
    dispatch(resetOrder())
  }, [])
  return (
    <div>OrderSuccess</div>
  )
}

export default OrderSuccess