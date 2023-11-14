import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from './orderSlice';

export default function Order() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrder())
  }, [])
  const userOrders = useSelector(state => state.order.orders)
  console.log(userOrders)
  return (
    <div style={{minHeight:'80vh'}}>
      <h1 className='text-3xl text-center'>My orders</h1>
      {userOrders && userOrders.map((order) => (
        <div class="my-3 p-3 d-flex justify-center bg-body rounded shadow-sm" >
          <div class="d-flex text-body-secondary mx-auto pt-3">
            <img src={order.items[0].thumbnail} className=''   style={{ objectFit: 'cover', borderRadius: '5px', width: '80px' }} />
            <p class="p-3 mb-0 small lh-sm ">
              <strong class=" fs-5 d-block text-gray-dark">{order.items[0].title}</strong>
              <p className='text-black text-sm'>Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?</p>
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}
