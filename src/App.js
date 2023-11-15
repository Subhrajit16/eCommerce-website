import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Store from './Pages/Store';
import About from './Pages/About';
import Contact from './Pages/Contact';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Cart from './features/Cart/Cart';
import CheckOut from './Pages/CheckOut';
import ProductDetails from './features/ProductList/ProductDetails';
import AuthRequired from './features/auth/AuthRequired';
import AdminPanel from './features/Admin/adminPanel';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './features/auth/authSlice';
import OrderSuccess from './Pages/OrderSuccess';
import { getCartItems } from './features/Cart/cartSlice';
import Order from './features/order/Order';
function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userLoggesIn)
  // console.log(user)
  useEffect(() => {
    dispatch(getUser())
    dispatch(getCartItems())

  }, [dispatch])
  // console.log(user.id)
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='productdetails/:id' element={<ProductDetails />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />

          <Route element={<AuthRequired />}>
            <Route path='/admin' element={<AdminPanel />} />
          </Route>

          <Route path='cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckOut />} />


          <Route path='store' element={<Store />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />


          <Route path='myorder' element={<Order/>}/>


          <Route path='/ordersuccess' element={<OrderSuccess />} />


        </Route>
      </Routes>
    </>
  );
}

export default App;
