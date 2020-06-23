import React from "react";
import PropTypes from "prop-types";
import SelectDefault from "./SelectDefault";
import SelectOutlined from "./SelectOutlined";
import NativeSelectDefault from "./NativeSelectDefault";
import NativeSelectOutlined from "./NativeSelectOutlined";
import { color } from "../../utils/theme";
import { findValueInArray } from "../../utils/helpers";

const SelectView = (props) => {
  const { variant, native, ...selectProps } = props;

  switch (variant) {
    case "default":
      return native ? (
        <NativeSelectDefault {...selectProps} />
      ) : (
        <SelectDefault {...selectProps} />
      );
    case "outlined":
      return native ? (
        <NativeSelectOutlined {...selectProps} />
      ) : (
        <SelectOutlined {...selectProps} />
      );
    default:
      return native ? (
        <NativeSelectDefault {...selectProps} />
      ) : (
        <SelectDefault {...selectProps} />
      );
  }
};

SelectView.defaultProps = {
  fullWidth: false,
  noMargin: false,
  native: false,
  multiple: false,
  checkbox: false,
  empty: false,
  required: false,
  variant: "default",
  emptyText: "None",
  color: color.primary,
  renderValue: (options, values) =>
    values
      .map((value) => findValueInArray(options, value, "value", "label", ""))
      .join(", "),
};

SelectView.propTypes = {
  /**
   * Options of select. isRequired
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.any.isRequired,
    })
  ),

  /**
   * Variant of Select :
   * 1. outlined
   * 2. default
   */
  variant: PropTypes.oneOf(["outlined", "default"]),

  /**
   * Value of option selected
   */
  value: PropTypes.any,

  /**
   * event target option selected
   */
  onChange: PropTypes.func,

  /**
   * Function to adjust how select render the value.
   * Currently only work if native props set to false.
   * @param (options, values)
   */
  renderValue: PropTypes.func,

  /**
   * Custom validation function
   * @param value
   * @returns true, on success and false on failure
   */
  onValidate: PropTypes.func,

  /**
   * fullWidth enabled, default : false
   */
  fullWidth: PropTypes.bool,

  /**
   * Label of Select
   */
  label: PropTypes.string,

  /**
   * Equal to label for enabling clickable
   */
  id: PropTypes.string,

  /**
   * Name of Select component as identifier
   */
  name: PropTypes.string,

  /**
   * Override default styles with className
   */
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    selectInput: PropTypes.string,
    fieldset: PropTypes.string,
    legend: PropTypes.string,
    selectWrapper: PropTypes.string,
    extraStart: PropTypes.string,
    select: PropTypes.string,
    selectText: PropTypes.string,
    extraEnd: PropTypes.string,
    label: PropTypes.string,
    helper: PropTypes.string,
    menu: PropTypes.string,
    option: PropTypes.string,
    checkbox: PropTypes.string,
    optionText: PropTypes.string,
  }),

  /**
   * Color of the Select border
   */
  color: PropTypes.string,

  /**
   * Text that will show when value is empty
   * Currently only work if native props set to false.
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
   * Text displayed in empty option
   */
  emptyText: PropTypes.string,

  /**
   * Override default styles with style
   */
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    selectInput: PropTypes.object,
    fieldset: PropTypes.object,
    legend: PropTypes.object,
    selectWrapper: PropTypes.object,
    extraStart: PropTypes.object,
    select: PropTypes.object,
    selectText: PropTypes.object,
    extraEnd: PropTypes.object,
    label: PropTypes.object,
    helper: PropTypes.object,
    menu: PropTypes.object,
    option: PropTypes.object,
    checkbox: PropTypes.object,
    optionText: PropTypes.object,
  }),

  /**
   * Add object of element in the start and end of Select
   */
  extra: PropTypes.shape({
    start: PropTypes.element,
    end: PropTypes.element,
  }),

  /**
   * Show TextInput without margin-top and margin-bottom
   * @defaultValue false
   */
  noMargin: PropTypes.bool,

  /**
   * Use native select
   * @defaultValue false
   */
  native: PropTypes.bool,

  /**
   * Select multiple option.
   * Currently only work if native props set to false.
   * @defaultValue false
   */
  multiple: PropTypes.bool,

  /**
   * Display checkbox in option menu.
   * Currently only work if native props set to false and multiple props set to true.
   * @defaultValue false
   */
  checkbox: PropTypes.bool,

  /**
   * Display empty option in top of menu
   */
  empty: PropTypes.bool,

  /**
   * Select cannot be empty
   */
  required: PropTypes.bool,

  /**
   * Disable input validation
   */
  noValidate: PropTypes.bool,

  /**
   * Readonly
   */
  readonly: PropTypes.bool,
};

export default SelectView;
