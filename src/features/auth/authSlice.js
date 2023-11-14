import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './authAPI';

const initialState = {
  userLoggesIn: null,
  status: 'idle',
};



export const getUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const resp = await fetch('http://localhost:8080/users');;
    const data = await resp.json();
    // console.log(data[0])
    return data[0];
  }
);

export const createUser = createAsyncThunk(
  'user/fetchCreateUser',
  async (update) => {
    const resp = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await resp.json();
    // console.log(data)
    return data;
  }
);

export const updateUserAddress = createAsyncThunk(
  'user/fetchUpdateUserAddress',
  async (update) => {
    // console.log(update)
    const resp = await fetch('http://localhost:8080/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json'
      },
    });;
    const data = await resp.json();
    // console.log(data)
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.userLoggesIn = action.payload
        // console.log(state)
      })
      .addCase(getUser.fulfilled,(state, action)=>{
        state.userLoggesIn = action.payload
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.userLoggesIn = action.payload
      })

  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default userSlice.reducer;
