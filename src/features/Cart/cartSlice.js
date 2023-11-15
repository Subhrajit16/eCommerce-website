import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  cartItem: [],
  status: 'idle',
};


export const getCartItems = createAsyncThunk(
  'cart/fetchCartiems',
  async (user) => {
    const resp = await fetch('http://localhost:8080/cart');
    const data = await resp.json()
    // console.log(data)
    return data;
  }
);

// export const setCartItems = createAsyncThunk(
//   'cart/fetchsetCarttems',
//   async (item) => {
//     const { id, title, price, thumbnail, discountPercentage } = item;
//     const resp = await fetch('http://localhost:800/cart', {
//       method: 'POST',
//       body: JSON.stringify({ id, title, price, thumbnail, discountPercentage, quantity: 1 }),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     });
//     const data = await resp.json();
//     console.log(data)
//     return data;

//   }
// );

//WITH CUSTOM ERROR MESSAGE+++++++++++++++++++++++
export const setCartItems = createAsyncThunk(
  'cart/fetchsetCarttems',
  async ({item}) => {
    try {
      const { id, title, price, thumbnail, discountPercentage } = item;
      // const { id, title, price, thumbnail, discountPercentage } = user;
      // console.log(item)
      // console.log(user)

      const resp = await fetch('http://localhost:8080/cart', {
        method: 'POST',
        body: JSON.stringify({ id, title, price, thumbnail, discountPercentage, quantity: 1}),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error) // it will give Faild to fetch, which is by default error msg
      throw new Error(`Oops! something went wrong`); //This is castom error msg
    }
  }
);



export const updateCartItems = createAsyncThunk(
  'cart/fetchsupdateCarttems',
  async ({ id, change }) => { // { change : {quantity : 1} }
    const resp = await fetch(`http://localhost:8080/cart/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(change),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await resp.json();
    return data;
  }
);

export const deleteCartItems = createAsyncThunk(
  'cart/fetchDeleteCarttems',
  async (id) => {
    const resp = await fetch(`http://localhost:8080/cart/${id}`, {
      method: 'DELETE',

    });
    return id
  }
);


export const resetCartItems = createAsyncThunk(
  'cart/resetCart',
  async (_,thunkAPI) => { 
    const response = await thunkAPI.dispatch(getCartItems());
    const items = response.payload; 
    // console.log(items) // all the cart items [{},{}]
    for(let key of items){
      await thunkAPI.dispatch(deleteCartItems(key.id)) 
      // console.log(key.id)
    }
  }
);



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItem = action.payload
        state.status = 'success';
      })
      .addCase(setCartItems.fulfilled, (state, action) => {
        state.cartItem.push(action.payload)
        state.status = 'success';
      })
      .addCase(setCartItems.rejected, (state, action) => {
        console.log(action.error.message)
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.cartItem = state.cartItem.filter((elm) => elm.id !== action.payload)
        state.status = 'success';
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
       
        let index = state.cartItem.findIndex((elm) => elm.id === action.payload.id)
        state.cartItem[index] = action.payload
      })

  },
});

export default cartSlice.reducer;
