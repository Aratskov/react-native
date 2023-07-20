import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser} from "./authOperation";

const initialState = {
  user: { login: null, email: null, avatar: "", uid: null },
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  //   reducers: {
  //     logOut() {
  //       return { ...initialState };
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.user = { ...payload };
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.user = { ...payload };
      })
        .addCase(logoutUser.fulfilled, state => {
          return initialState;
        })
      //   .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      //     state.error = null;
      //     state.isLoading = false;
      //     state.user = { ...payload.user };
      //     state.isLoggedIn = true;
      //   })
      //   .addCase(getBalanceUser.fulfilled, (state, { payload }) => {
      //     state.user.balance = payload;
      //   })
      .addMatcher(
        (action) =>
          action.type.startsWith("user") && action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("user") && action.type.endsWith("/rejected"),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export default authSlice.reducer;
