import React from "react";

import { Field } from "formik";

// to allow Formik's Field to be used in conjunction with Bootstrap's Form.Control styling
const FieldSelect = ({ options, ...otherProps }) => (
  <Field as="select" {...otherProps}>
    {options.map(({ value, text, selected }) => (
      <option key={value} value={value}>
        {text}
      </option>
    ))}
  </Field>
);

export default FieldSelect;
