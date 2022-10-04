import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getMyplans = createAsyncThunk(
  "myplans/getMyplans",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/mypost");
      console.log(data);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postMyplans = createAsyncThunk(
  "/api/mypost",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await instance.post(`/api/mypost`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.data.success === false) alert(data.data.error.message);
      else alert(data.data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const myplans = createSlice({
  name: "myplans",
  initialState: {
    data: {
      title: "",
      content: "",
      time: "",
      imgurl: "",
    },
    isLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: {
    //전체내일정 가져오기
    [getMyplans.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyplans.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [getMyplans.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default myplans.reducer;
