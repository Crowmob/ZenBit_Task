import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  isLoading: boolean;
  isAuthenticated: boolean;
};

const initialState: InitialStateType = {
  isLoading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setUnauthenticated: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuthenticated, setUnauthenticated, finishLoading } = authSlice.actions;
export default authSlice.reducer;