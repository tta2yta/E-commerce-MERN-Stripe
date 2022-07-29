import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError ";

function Select(props) {
  // this componentt receives props
  const { label, name, options, ...rest } = props; // leave ot the rest
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="select" name={name} id={name} {...rest}>
        {/* as childern we need to have the childen prop to render the options */}
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError}></ErrorMessage>
    </div>
  );
}

export default Select;
