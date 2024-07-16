import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  term: string;
}

const initialState: SearchState = {
  term: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.term = action.payload;
    },
    clearSearch: (state) => {
      state.term = "";
    },
  },
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
