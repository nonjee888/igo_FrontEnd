import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getTags = createAsyncThunk("tags/get", async (_, thunkAPI) => {
  try {
    const data = await instance.get(`/api/member/posts`);
    return data.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
//myinfo 혜림님이 작성하신 put과 get을 참고해서 작성하였습니다.
// export const putTags = createAsyncThunk(
//     "tags/put",
//     async (payload,thunkAPI) => {
//         try {
//             const data = await instance.put(`/api/member/tag`, payload, {
//             });
//             return data.data.data;
//         }catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );

export const tags = createSlice({
  name: "tags",
  initialState: {},
  reducers: {},

  extraReducers: {
    [getTags.pending]: (state) => {
      state.isLoading = true;
    },
    [getTags.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tags = action.payload;
      console.log(action);
    },
    [getTags.rejected]: (state, action) => {
      state.isLoading = false;
      state.tags = action.payLoad;
    },
  },
});

export default tags.reducer;
