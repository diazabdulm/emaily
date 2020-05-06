import React, { useState } from "react";
import { reduxForm } from "redux-form";

import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

function SurveyNew() {
  const [showFormReview, setShowFormReview] = useState(false);

  const renderContent = showFormReview ? (
    <SurveyFormReview onCancel={() => setShowFormReview(false)} />
  ) : (
    <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />
  );

  return <div>{renderContent}</div>;
}

export default reduxForm({ form: "surveyForm" })(SurveyNew);
