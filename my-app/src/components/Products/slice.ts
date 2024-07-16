import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductState {
    data: any;
    status: string;
    error: any;
  }
  
  const initialState: ProductState = {
    data: [],
    status: "idle",
    error: null,
  };

  export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products`
      );
      return response.data;
    }
  );

  export const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });

  export default ProductSlice.reducer;