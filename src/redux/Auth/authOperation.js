import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerDB, loginDB, logOutApi } from "../../services/firebaseApi";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    const { avatar, login, email, password } = credentials;
    try {
      const res = await registerDB({ avatar, login, email, password });
      //   console.log("RES",res.uid);
      return {
        avatar: res.photoURL,
        login: res.displayName,
        email: res.email,
        uid: res.uid,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    const { email, password } = credentials;
    try {
      const res = await loginDB({ email, password });

      return {
        avatar: res.photoURL,
        login: res.displayName,
        email: res.email,
        uid: res.uid,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue}) => {
    try {
      await logOutApi()
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);