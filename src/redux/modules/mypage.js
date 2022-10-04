import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/post");
      console.log(data);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// /api/post/group/${payload}
//create, view, heart 가 들어가야함.

export const getDetailPosts = createAsyncThunk(
  "detailPosts/getDetailPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/api/detail/${payload}`);
      console.log(data);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const onLikePost = createAsyncThunk(
  "like/onLikePost",
  async (payload, thunkApI) => {
    console.log(payload);
    try {
      const data = await instance.post(
        `/api/heart/${payload}`,
        {} //post는 두번째 인자가 데이터가 들어가야해서 {}를 넣어줌 데이터가 없으면 headers를 데이터로 인식
      );
      return payload;
    } catch (error) {
      return thunkApI.rejectWithValue(error);
    }
  }
);

export const onReportPost = createAsyncThunk(
  "report/onReportPost",
  async (payload, thunkApI) => {
    console.log(payload);
    try {
      const data = await instance.post(
        `/api/report/${payload}`,
        {} //post는 두번째 인자가 데이터가 들어가야해서 {}를 넣어줌 데이터가 없으면 headers를 데이터로 인식
      );
      return payload;
    } catch (error) {
      return thunkApI.rejectWithValue(error);
    }
  }
);

const initialState = {};

export const posts = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: {
    //전체게시글 가져오기
    [getPosts.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
  },
});

export default posts.reducer;
