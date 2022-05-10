import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
  getAuth,
  browserSessionPersistence,
} from "firebase/auth";
import { app } from "../../../firebase";

const auth = getAuth(app);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, thunkAPI) => {
    const { email, password } = credentials;
    const user = { name: "", email: "", userId: "" };
    await setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            user.name = auth.currentUser.displayName;
            user.email = auth.currentUser.email;
            user.userId = auth.currentUser.uid;
          })
          .catch((error) => {
            return thunkAPI.rejectWithValue(error.message);
          });
      })
      .catch((error) => (user.error = error.message));
    console.log(user);
    return user;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials, thunkAPI) => {
    const { email, password, name } = credentials;
    const user = {
      name: "",
      email: "",
      userId: "",
    };
    await setPersistence(auth, browserSessionPersistence).then(async () => {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
          console.log(auth.currentUser);
          if (auth.currentUser !== null) {
            await updateProfile(auth.currentUser, {
              displayName: name,
            }).then(() => {
              user.name = auth.currentUser.displayName;
              user.email = auth.currentUser.email;
              user.userId = auth.currentUser.uid;
            });
          }
        })
        .catch((error) => {
          user.error = error.message;
        });
    });
    return user;
  }
);

const initialState = {
  userEmail: "",
  userName: "",
  userId: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log(action.payload);
      const { email, name, userId } = action.payload;
      state.userEmail = email;
      state.userName = name;
      state.userId = userId;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log(action);
      const { email, name, userId } = action.payload;
      state.userEmail = email;
      state.userName = name;
      state.userId = userId;
    });
  },
});

export default userSlice.reducer;
