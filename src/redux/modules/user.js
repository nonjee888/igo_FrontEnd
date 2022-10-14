import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//리듀서 -----------------------------------------------------------------------------------------------------

export const user = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    error: null,
  },
  reducers: {},
});

export default user.reducer;
