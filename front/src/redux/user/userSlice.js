import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import {
  getUserDetails,
  logoutUserApi,
  refreshToken as refreshTokenApi,
} from "../../api/apiService";
import { getCartItem } from "../cart/userCartSlice";

const initialState = {
  isLogin: localStorage.getItem("isLogin") || false,
  user: null,
};

export const userData = createAsyncThunk("fetchUserData", getUserDetails);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/user/login", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk("logoutUser", logoutUserApi);
export const refreshToken = createAsyncThunk(
  "refreshActionToken",
  refreshTokenApi
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoggedIn: (state) => {
      state.isLogin = true;
    },
    LoggedOut: (state) => {
      state.isLogin = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userData.fulfilled, (state, action) => {
        state.isLogin = true;
        state.user = action.payload.user;
      })
      .addCase(userData.rejected, (state) => {
        state.isLogin = false;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        getCartItem();
        state.isLogin = true;
        state.user = action.payload.user;
        toast.success("Login Successfull", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          containerId: "loginpage",
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLogin = false;
        state.user = null;
        toast.success(action.payload.message, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          containerId: "loginpage",
        });
      })
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("isLogin");
        toast.success("Logout Successfully", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        state.isLogin = false;
        state.user = null;
        redirect("/login");
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLogin = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLogin = true;
        localStorage.setItem("isLogin", true);
      });
  },
});

export const { LoggedIn, LoggedOut } = userSlice.actions;
export default userSlice.reducer;
