import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";
import Swal from "sweetalert2";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/api/comment/${payload}`);

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
      const data = await instance.post("/api/comments", payload);

      if (data.data.success) return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeComment = createAsyncThunk(
  "comments/RemoveComments",
  async (payload, thunkAPI) => {
    // console.log(payload.commentId);
    try {
      const data = await instance.delete(`/api/comments/${payload.commentId}`, {
        postId: payload.postId,
      });

      if (data.data.success === true) {
        Swal.fire({
          icon: "info",
          text: "댓글이 삭제되었습니다",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        });
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
      state.comments.push(action.payload.data);
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
        (comment) => comment.id === action.payload.data
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
