import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

export const map = createSlice({
  name: "map",
  initialState: {
    overlayData: { marker: [], polyline: [] },
  },
  reducers: {
    overlayData: (state) => {
      [...state].push(state);
    },
  },
});
export const { overlayData } = map.actions;
export default map.reducer;
