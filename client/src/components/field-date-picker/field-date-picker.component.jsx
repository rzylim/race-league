import React from "react";

import { useField } from "formik";

import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";

import "react-datepicker/dist/react-datepicker.css";
import "./field-date-picker.styles.scss";

registerLocale("en-GB", enGB);

const FieldDatePicker = ({ name }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      name={name}
      className="form-control"
      showTimeSelect
      showMonthDropdown
      showYearDropdown
      locale="en-GB"
      timeIntervals={15}
      timeFormat="HH:mm"
      dateFormat="dd-MM-yyyy HH:mm"
      selected={Date.parse(value)}
      onChange={(value) => setValue(value)}
      popperPlacement="top-center"
    />
  );
};

export default FieldDatePicker;
