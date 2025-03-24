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

export const postProduct = createAsyncThunk("product/post", async (product) => {
  const response = await axios.post(`${BASE_URL}/product`, product);
  return response.data;
});

export const postMaterial = createAsyncThunk(
  "material/post",
  async (material) => {
    const response = await axios.post(`${BASE_URL}/material`, material);
    return response.data;
  }
);

export const postGrade = createAsyncThunk("grade/post", async (grade) => {
  const response = await axios.post(`${BASE_URL}/grade`, grade);
  return response.data;
});

export const postProductCombination = createAsyncThunk(
  "productCombination/post",
  async ({ productId, materialId, gradeIds }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/productCombination`, {
        productId,
        materialId,
        gradeIds,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
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
      })
      .addCase(postProductCombination.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(postProductCombination.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productCombinationSlice.reducer;
