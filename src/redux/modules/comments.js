import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/api/comments/${payload}`);
      console.log(data.data.data);
      if (data.data.success) return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createComment = createAsyncThunk(
  "comments/CreateComments",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/api/comment", payload);

      if (data.data.success) return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeComment = createAsyncThunk(
  "comments/RemoveComments",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await instance.delete(`/api/comment/${payload.commentId}`, {
        postId: payload.postId,
      });

      if (data.data.success === true) {
      }
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const comments = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createComment.pending]: (state) => {
      state.isLoading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments.unshift(action.payload.data);
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [removeComment.pending]: (state) => {
      state.isLoading = true;
    },
    [removeComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      let index = state.comments.findIndex(
        (comment) => comment.id === action.payload.commentId
      );
      state.comments.splice(index, 1);
    },
    [removeComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default comments.reducer;
