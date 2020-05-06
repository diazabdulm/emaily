import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchSurveys } from "../reducers/surveysReducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.surveys);

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  const renderSurveys = () =>
    surveys
      .slice()
      .reverse()
      .map(({ _id, title, subject, yes, no, dateSent }) => (
        <div key={_id}>
          <p>{title}</p>
          <p>{subject}</p>
          <p>yes: {yes}</p>
          <p>no: {no}</p>
          <p>sent: {new Date(dateSent).toLocaleDateString()}</p>
        </div>
      ));

  return (
    <div>
      Dashboard
      {renderSurveys()}
      <Link to="/surveys/new">+ Add Survey</Link>
    </div>
  );
}
