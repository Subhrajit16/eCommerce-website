import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AuthRequired() {
    const user = useSelector(state=>state.user.userLoggesIn)
    console.log(user)
    if(!user){
      return  <Navigate to='/login?message=You must login first'/>
    }
    return <Outlet/>
}

export default AuthRequired