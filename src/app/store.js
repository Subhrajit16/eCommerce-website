import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/ProductList/productSlice'
import userReducer from '../features/auth/authSlice'
import cartReducer from '../features/Cart/cartSlice'
import orderReducer from '../features/order/orderSlice'
export const store = configureStore({
  reducer: {
    product: productReducer,
    user:userReducer,
    cart:cartReducer,
    order:orderReducer
  },
});
