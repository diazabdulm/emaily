import React from "react";
import { reduxForm, Field } from "redux-form";

import SurveyField from "./SurveyField";

import validateEmails from "../../utilities/validateEmails";
import formFields from "./formFields";

function SurveyForm({ handleSubmit, onSurveySubmit }) {
  const renderFields = () =>
    formFields.map((fieldProps) => (
      <Field
        key={fieldProps.name}
        component={SurveyField}
        type="text"
        {...fieldProps}
      />
    ));

  return (
    <div>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {renderFields()}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients);

  for (const { name } of formFields) {
    if (values[name]) continue;
    errors[name] = `${name} field is required`;
  }

  return errors;
};

export default reduxForm({
  form: "surveyForm",
  destroyOnUnmount: false,
  validate,
})(SurveyForm);
