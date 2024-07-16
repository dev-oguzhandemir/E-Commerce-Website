import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductCategoryState {
  data: any;
  status: string;
  error: any;
}

const initialState: ProductCategoryState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchProductCategory = createAsyncThunk(
  "products/category",
  async (category: string) => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`  
    );

    return response.data;
  }
);

export const ProductCategorySlice = createSlice({
  name: "productsCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ProductCategorySlice.reducer;
