import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/post");

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
    detail: {
      content: "",
      createdAt: "",
      heartNum: 0,
      id: "",
      modifiedAt: "",
      title: "",
      viewCount: 0,
    },
    isLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: {
    //전체게시글 가져오기
    [getPosts.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [getPosts.fulfilled]: (state, action) => {
      // console.log(action)
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //상세게시글 가져오기
    [getDetailPosts.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [getDetailPosts.fulfilled]: (state, action) => {
      // console.log(action)
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.detail = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [getDetailPosts.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //관심 게시글
    [onLikePost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [onLikePost.fulfilled]: (state, action) => {
      // console.log(action)
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.detail = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [onLikePost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //게시글 신고
    [onReportPost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [onReportPost.fulfilled]: (state, action) => {
      // console.log(action)
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.detail = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [onReportPost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default posts.reducer;
