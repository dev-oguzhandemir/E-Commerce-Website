import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CategoryState {
  data: string[];
  status: string;
  error: string;
}

const initialState: CategoryState = {
  data: [],
  status: "idle",
  error: "",
};

export const fetchCategory = createAsyncThunk(
  "products/fetchCategory",
  async () => {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    return response.data;
  }
);

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default CategorySlice.reducer;
