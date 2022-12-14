import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/posts");

      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDetailPosts = createAsyncThunk(
  "detailPosts/getDetailPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/api/detail/${payload}`);

      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRecommendPosts = createAsyncThunk(
  "recommendPosts/getRecommendPosts",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/member/posts");

      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const onLikePost = createAsyncThunk(
  "like/onLikePost",
  async (payload, thunkApI) => {
    try {
      const data = await instance.post(
        `/api/heart/${payload}`,
        {} //post는 두번째 인자로 데이터가 들어가야해서 {}를 넣어줌 데이터가 없으면 headers를 데이터로 인식
      );

      return data.data.data;
    } catch (error) {
      return thunkApI.rejectWithValue(error);
    }
  }
);

export const searchPosts = createAsyncThunk(
  "search/searchPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/api/search?content=${payload}`, {});

      return data?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const posts = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    recommend: [],
    detail: {
      commentResponseDtoList: [],
      content: "",
      createdAt: "",
      heartNum: 0,
      id: "",
      mapData: {
        marker: [],
        polyline: [],
      },
      modifiedAt: "",
      nickname: "",
      profile: null,
      reportNum: 0,
      searchPlace: "",
      tags: [""],
      thumnail: "",
      title: "",
      viewCount: 0,
    },
    success: true,
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
      // console.log(action.payload);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.detail = action.payload;
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
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
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      if (action.payload === "false") {
        state.detail.heartNum -= 1;
      } else {
        state.detail.heartNum += 1;
      }
    },
    [onLikePost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [searchPosts.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [searchPosts.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload;

      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [searchPosts.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [getRecommendPosts.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [getRecommendPosts.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.recommend = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [getRecommendPosts.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const { numberCheck } = posts.actions;
export default posts.reducer;
