import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  isLoading: boolean;
  token: string;
};

const initialState: InitialStateType = {
  isLoading: true,
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
    },
    clearToken: (state) => {
      state.token = '';
      state.isLoading = false;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setToken, clearToken, finishLoading } = authSlice.actions;
export default authSlice.reducer;