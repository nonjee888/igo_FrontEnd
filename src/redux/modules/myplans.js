import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";
import Swal from "sweetalert2";

export const postMyplans = createAsyncThunk(
  "myplans/post",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(`/api/mypost`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
      });
      if (data.data.success === true) {
        window.location.replace("/myplan");
      } else if (data.data.success === false) {
        Swal.fire({
          icon: "info",
          text: "오류가 있어요! 관리자에게 문의해주세요😿",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        });
        return thunkAPI.fulfillWithValue(data.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyplans = createAsyncThunk(
  "myplans/get",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/mypost", {
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
  }
);

//삭제
export const deleteMyplans = createAsyncThunk(
  "myplans/delete",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.delete(`/api/mypost/${payload}`, {
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

//일정 완료 포스트
export const postMyplanDone = createAsyncThunk(
  "myplan/done/post",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(`/api/mypost/done/${payload}`, {
        headers: {
          REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
      });
      if (data.data.success === false) alert(data.data.error.message);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//일정 완료취소 포스트
export const postMyplanCancel = createAsyncThunk(
  "myplan/cancel/post",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(`/api/mypost/cancel/${payload}`, {
        headers: {
          REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
      });
      if (data.data.success === false) alert(data.data.error.message);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const myplans = createSlice({
  name: "myplans",
  initialState: {
    myplan: {},
    success: true,
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
      // console.log(action);
      state.isLoading = false;
      state.myplans = action.payload;
    },
    [getMyplans.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //일정 새로고침없이 자동등록
    [postMyplans.pending]: (state) => {
      state.isLoading = true;
    },
    [postMyplans.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myplans.push(action.payload.data);
    },
    [postMyplans.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //일정삭제
    [deleteMyplans.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteMyplans.fulfilled]: (state, action) => {
      state.isLoading = false;
      let index = state.myplans.findIndex(
        (myplan) => myplan.id === action.payload.data
      );
      state.myplans.splice(index, 1);
    },
    //완료상태변경
    [postMyplanDone.pending]: (state) => {
      state.isLoading = true;
    },
    [postMyplanDone.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload.data.id);
      // console.log(current(state.myplans));
      let MyplanDone = state?.myplans?.map((MyplanDone) => {
        if (MyplanDone.id === action.payload.data.id) {
          return {
            ...MyplanDone,
            done: +1,
          };
        } else {
          return { ...MyplanDone };
        }
      });
      state.myplans = MyplanDone;
      // console.log(MyplanDone);
    },
    [postMyplanDone.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //취소상태변경
    [postMyplanCancel.pending]: (state) => {
      state.isLoading = true;
    },
    [postMyplanCancel.fulfilled]: (state, action) => {
      state.isLoading = false;
      let MyplanCancel = state?.myplans?.map((MyplanCancel) => {
        if (MyplanCancel.id === action.payload.data.id) {
          return {
            ...MyplanCancel,
            done: 0,
          };
        } else {
          return { ...MyplanCancel };
        }
      });
      state.myplans = MyplanCancel;
      // console.log(MyplanCancel);
    },
    [postMyplanCancel.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default myplans.reducer;
