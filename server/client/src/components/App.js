import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./Header";
import Landing from "./Landing";

import { fetchUser } from "../reducers/authReducer";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}
