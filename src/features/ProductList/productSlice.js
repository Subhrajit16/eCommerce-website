import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './productAPI';

const initialState = {
  allProducts: [],
  selectedProduct:null,
  categories: [],
  brands: [],
  status: 'idle',
};

export const getAllProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const resp = await fetch('http://localhost:8080/products');
    const data = resp.json()
    return data;
  }
);

export const getSelectedProductById = createAsyncThunk(
  'products/fetchSelectedProduct',
  async (id) => {
    // console.log(id)
    const resp = await fetch(`http://localhost:8080/products/${id}`);
    const data = resp.json()
    // console.log(data)
    return data;
  }
);

export const getAllCategoris = createAsyncThunk(
  'products/fetchCategoris',
  async () => {
    const resp = await fetch('http://localhost:8080/categories');
    const data = resp.json()
    return data;
  }
);

export const getAllBrands = createAsyncThunk(
  'products/fetchBrands',
  async () => {
    const resp = await fetch('http://localhost:8080/brand');
    const data = resp.json()
    return data;
  }
);

export const updateCategoryCheckedValue = createAsyncThunk(
  'products/updateCategoryCheckedValue',
  async ({ id, change }) => { 
    // console.log(id)
    // console.log(change)
    const resp = await fetch(`http://localhost:8080/categories/${id}`, {
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



export const getFilteredProduct = createAsyncThunk(
  'products/fetchFilteredProducts',
  async ({ filter, sort, searchedQuarry, pagination }) => {
    //filter={'category': ['smartphone', 'laptop'], 'brand': ['apple', 'samsung'] }

    //sort ={_sort:'price', _order:asc} // for sorting

    //pagination = {_page:1, _limit:10}
    console.log(filter)
    console.log(searchedQuarry)
    
    let quarryStr = '';
    if (searchedQuarry) {
      for (let key in searchedQuarry) {
        quarryStr += `${key}=${searchedQuarry[key]}&`
      }
    }

    for (let key in filter) {
      let categoryValue = filter[key]
      if (categoryValue.length > 0) {

        let lastCategory = categoryValue[categoryValue.length - 1]
        quarryStr += `${key}=${lastCategory}&`
      }
    }


    for (let key in sort) {
      quarryStr += `${key}=${sort[key]}&`
    }

    for (let key in pagination) {
      quarryStr += `${key}=${pagination[key]}&`
    }



    const resp = await fetch('http://localhost:8080/products/?' + quarryStr);
    const data = resp.json()
    return data;
  }
);











export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload
        state.status = 'loading';
      })
      .addCase(getSelectedProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload
      })
      .addCase(getFilteredProduct.fulfilled, (state, action) => {
        state.allProducts = action.payload
        state.status = 'loading';
      })
      .addCase(getAllCategoris.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.brands = action.payload
      })


  },
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export default productSlice.reducer;
