import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const surveysSlice = createSlice({
  name: "surveys",
  initialState: [],
  reducers: {
    setSurveys: (state, action) => action.payload,
  },
});

export const { setSurveys } = surveysSlice.actions;
export default surveysSlice.reducer;

export const fetchSurveys = () => async (dispatch) => {
  try {
    const response = await axios.get("/surveys/api");
    const surveys = await response.data;
    dispatch(setSurveys(surveys));
  } catch (error) {
    throw new Error(error);
  }
};
