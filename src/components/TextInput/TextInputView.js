import React from "react";
import PropTypes from "prop-types";
import TextInputDefault from "./TextInputDefault";
import TextInputOutlined from "./TextInputOutlined";
import { color } from "../../utils/theme";

const TextInputView = (props) => {
  const { variant, ...inputProps } = props;

  switch (variant) {
    case "default":
      return <TextInputDefault {...inputProps} />;
    case "outlined":
      return <TextInputOutlined {...inputProps} />;
    default:
      return <TextInputDefault {...inputProps} />;
  }
};

TextInputView.defaultProps = {
  variant: "default",
  fullWidth: false,
  noMargin: false,
  noValidate: false,
  required: false,
  multiline: false,
  clearable: false,
  type: "text",
  format: "dd MMMM yyyy",
  color: color.primary,
  rows: 1,
};

TextInputView.propTypes = {
  /**
   * Label of TextInput
   */
  label: PropTypes.string,

  /**
   * value of TextInput
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),

  /**
   * Id of TextInput component as identifier
   */
  id: PropTypes.string,

  /**
   * Name of TextInput component as identifier
   */
  name: PropTypes.string,

  /**
   * File type accepted by input type file
   */
  accept: PropTypes.string,

  /**
   * Color of the TextInput border
   */
  color: PropTypes.string,

  /**
   * Placeholder of TextInput
   */
  placeholder: PropTypes.string,

  /**
   * Set helper text
   */
  helperText: PropTypes.string,

  /**
   * Set Custom Error Text
   */
  errorText: PropTypes.string,

  /**
   * Variant of TextInput :
   * 1. outlined
   * 2. default
   */
  variant: PropTypes.oneOf(["outlined", "default"]),

  /**
   * Variant of TextInput :
   * 1. text
   * 2. email
   * 3. password
   * 4. number,
   * 5. tel
   * 6. date
   * 7. file
   */
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "tel",
    "date",
    "file",
    "currency",
    "url",
  ]),

  /**
   * Add object of element in the start and end of TextInput
   */
  extra: PropTypes.shape({
    start: PropTypes.element,
    end: PropTypes.element,
  }),

  /**
   * Override default styles with className
   */
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    textInput: PropTypes.string,
    fieldset: PropTypes.string,
    legend: PropTypes.string,
    inputWrapper: PropTypes.string,
    extraStart: PropTypes.string,
    input: PropTypes.string,
    extraEnd: PropTypes.string,
    label: PropTypes.string,
    helper: PropTypes.string,
  }),

  /**
   * Override default styles with style
   */
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    textInput: PropTypes.object,
    fieldset: PropTypes.object,
    legend: PropTypes.object,
    inputWrapper: PropTypes.object,
    extraStart: PropTypes.object,
    input: PropTypes.object,
    extraEnd: PropTypes.object,
    label: PropTypes.object,
    helper: PropTypes.object,
  }),

  /**
   * Date format
   * @see https://date-fns.org/v2.6.0/docs/format
   */
  format: PropTypes.string,

  /**
   * Theme Color for the Datepicker
   */
  themeColor: PropTypes.string,

  /**
   * Color of the text in Datepicker
   */
  textColor: PropTypes.string,

  /**
   * Total rows of multiline input
   */
  rows: PropTypes.number,

  /**
   * Array with value of "year", "month", "date", or combination of it
   */
  modes: PropTypes.arrayOf(PropTypes.string),

  /**
   * Minimal date allowed in Datepicker
   */
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),

  /**
   * Maximum date allowed in Datepicker
   */
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),

  /**
   * Disable all past date
   */
  disablePast: PropTypes.bool,

  /**
   * Disable all future date
   */
  disableFuture: PropTypes.bool,

  /**
   * Event handler onChange value as function
   */
  onChange: PropTypes.func,

  /**
   * Custom validation function
   * @param value
   * @returns true, on success and false on failure
   */
  onValidate: PropTypes.func,

  /**
   * Event handler onfocus value as function
   */
  onFocus: PropTypes.func,

  /**
   * FullWidth enabled
   * @defaultValue false
   */
  fullWidth: PropTypes.bool,

  /**
   * Show TextInput without margin-top and margin-bottom
   * @defaultValue false
   */
  noMargin: PropTypes.bool,

  /**
   * Disable input validation
   */
  noValidate: PropTypes.bool,

  /**
   * TextInput value cannot be empty
   */
  required: PropTypes.bool,

  /**
   * Allow select multiple file
   * @defaultValue false
   */
  multiple: PropTypes.bool,

  /**
   * Allow TextInput to be multiline
   */
  multiline: PropTypes.bool,

  /**
   * Allow Datepicker clearable
   */
  clearable: PropTypes.bool,

  /**
   * Readonly
   */
  readonly: PropTypes.bool,
};

export default TextInputView;
