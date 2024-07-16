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

  export const fetchProductDetail = createAsyncThunk(
    "detail",
    async (id: number) => {
      const response = await axios.get(
        (`https://fakestoreapi.com/products/${id}`)
      );
      return response.data;
    }
  );

  export const ProductDetailSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductDetail.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchProductDetail.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
        })
        .addCase(fetchProductDetail.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });

  export default ProductDetailSlice.reducer;