import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null
};

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async () => {
    const resp = await fetch('http://localhost:8080/orders');
    const data = await resp.json()
    // console.log(data)
    return data;
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order) => {
      const resp = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await resp.json();
      return data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder:(state)=>{
      state.currentOrder = null
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(createOrder.fulfilled, (state,action) => {
        // console.log(action.payload)
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(getOrder.fulfilled, (state,action) => {
        state.orders=action.payload;
      })
      
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
