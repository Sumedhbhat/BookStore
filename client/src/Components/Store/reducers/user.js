import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut,
} from "firebase/auth";

export const signInUser = createAsyncThunk(
  "user/signIn",
  async (payload, thunkAPI) => {
    const auth = getAuth(app);
    const { email, password } = payload;
    const user = {};
    await signInWithEmailAndPassword(email, password)
      .then(() => {
        if (auth.currentUser !== null || auth.currentUser !== undefined) {
          user.email = auth.currentUser.email;
        }
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        user.error = error.message;
      });
    return user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isLoggedIn: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [signInUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
