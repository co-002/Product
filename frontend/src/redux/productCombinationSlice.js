import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config.js";

export const fetchProductCombinations = createAsyncThunk(
  "productCombination/fetch",
  async () => {
    const response = await axios.get(`${BASE_URL}/productCombination`);
    return response.data.combinations;
  }
);

const productCombinationSlice = createSlice({
  name: "productCombination",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCombinations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductCombinations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductCombinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productCombinationSlice.reducer;
