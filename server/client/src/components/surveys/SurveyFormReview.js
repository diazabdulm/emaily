import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import formFields from "./formFields";
import { submitSurvey } from "../../reducers/authReducer";

export default function SurveyFormReview({ onCancel }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const formValues = useSelector((state) => state.form.surveyForm.values);

  const renderFields = () =>
    formFields.map(({ name, label }) => (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    ));

  return (
    <div>
      <h5>Please review your survey:</h5>
      {renderFields()}
      <button onClick={onCancel}>Go back</button>
      <button onClick={() => dispatch(submitSurvey(formValues, history))}>
        Send Survey
      </button>
    </div>
  );
}
