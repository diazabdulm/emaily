import React from "react";

export default function SurveyField({
  input,
  label,
  meta: { touched, error },
}) {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {touched && error}
    </div>
  );
}
