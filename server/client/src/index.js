import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./components/App";

import auth from "./reducers/authReducer";
import surveys from "./reducers/surveysReducer";

const store = configureStore({
  reducer: { auth, surveys },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
