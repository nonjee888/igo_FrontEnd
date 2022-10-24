import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const postStory = createAsyncThunk(
  "story/post",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(`/api/story`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
      });
      if (data.data.success === true) {
        window.location.replace("/story");
      } else if (data.data.success === false) alert(data.data.error.message);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getStory = createAsyncThunk("story/get", async (_, thunkAPI) => {
  try {
    const data = await instance.get("/api/storys", {
      headers: {
        REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
      },
      data: {},
    });
    // console.log(data);
    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//삭제
export const deleteStory = createAsyncThunk(
  "story/delete",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.delete(`/api/story/${payload}`, {
        headers: {
          REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const story = createSlice({
  name: "story",
  initialState: {
    data: {},
    success: true,
    isLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: {
    //전체리스트 가져오기
    [getStory.pending]: (state) => {
      state.isLoading = true;
    },
    [getStory.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.story = action.payload;
    },
    [getStory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //새로고침없이 자동등록
    [postStory.pending]: (state) => {
      state.isLoading = true;
    },
    [postStory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.story.unshift(action.payload.data);
    },
    [postStory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //스토리 삭제
    [deleteStory.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteStory.fulfilled]: (state, action) => {
      state.isLoading = false;
      let index = state.story.findIndex(
        (story) => story.id === action.payload.data
      );
      state.story.splice(index, 1);
    },
  },
});

export default story.reducer;
