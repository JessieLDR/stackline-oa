import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductData } from '../types/productTypes';

// State interface
interface ProductState {
  productData: ProductData[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  productData: null,
  status: 'idle',
  error: null,
};

// Asynchronous thunk for fetching product data
export const fetchProductData = createAsyncThunk(
  'product/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/data');
      // data transformation here if necessary
      return response.data;
    } catch (error) {
      // Use rejectWithValue to return a custom error payload
      return rejectWithValue('Failed to fetch product data');
    }
  }
);

// Slice definition
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Define any synchronous reducers here if necessary
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productData = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export the reducer as default
export default productSlice.reducer;