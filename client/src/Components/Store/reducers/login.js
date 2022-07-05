import { createSlice } from "@reduxjs/toolkit";
import { app } from "../../../firebase";

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    isLoading: false,
    isLoggedIn: false,
    user: null,
    error: null,
    admin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});
