import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    error: null,
  },
  reducers: {
    setUserSuccess(state, action) {
      state.currentUser = action.payload;
    },
    setUserFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUserSuccess, setUserFailure } = authSlice.actions;

export default authSlice.reducer;

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get("/auth/api/current-user");
    const user = await response.data;
    dispatch(setUserSuccess(user));
  } catch (error) {
    dispatch(setUserFailure(error));
  }
};

export const handleToken = (token) => async (dispatch) => {
  try {
    const response = await axios.post("/billing/api/stripe", token);
    const user = await response.data;
    dispatch(setUserSuccess(user));
  } catch (error) {
    dispatch(setUserFailure(error));
  }
};
