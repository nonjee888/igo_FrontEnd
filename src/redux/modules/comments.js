import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const createComment = createAsyncThunk(
  "comments/CreateComments",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/api/comments", payload);
      console.log(data.data.data);
      if (data.data.success) return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const removeComment = createAsyncThunk(
//   "comments/RemoveComments",
//   async (payload, thunkAPI) => {
//     // console.log(payload.commentId);
//     try {
//       const data = await instance.delete(`/api/comments/${payload.commentId}`, {
//         postId: payload.postId,
//       });
//       return payload;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const comments = createSlice({
  name: "comments",
  initialState: {
    post: [],
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [createComment.pending]: (state) => {
      state.isLoading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.comments.push(action.payload.data);
      console.log(current(state.comments));
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // [removeComment.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [removeComment.fulfilled]: (state, action) => {
    //   console.log(action.payload);
    //   state.isLoading = false;
    //   let index = state.comments.findIndex(
    //     (comment) => comment.id === action.payload
    //   );
    //   console.log(index);
    //   // console.log(index);
    //   state.comments.splice(index, 1);
    // },
    // [removeComment.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export default comments.reducer;
