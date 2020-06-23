import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import TextInputExtra from "./TextInputExtra";
import TextInputField from "./TextInputField";
import TextInputLabel from "./TextInputLabel";
import TextInputHelper from "./TextInputHelper";
import Datepicker from "../Datepicker";
import { createUseStyles } from "react-jss";
import {
  renderClassName,
  renderStyle,
  validateNotEmptyString,
  validateEmail,
  validatePhoneNumber,
  validateURL,
} from "../../utils/helpers";
import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PHONE_NUMBER_MESSAGE,
  INVALID_REQUIRED_MESSAGE,
  INVALID_ERROR_MESSAGE,
  INVALID_URL_MESSAGE,
} from "../../utils/constants";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  root: {
    position: "relative",
    marginTop: 16,
    marginBottom: 8,
  },
  textInput: {
    position: "relative",
    minHeight: 48,
  },
  inputWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    height: (props) => (props.multiline ? "calc(100% - 25px)" : "100%"),
    width: "100%",
    padding: (props) => (props.multiline ? "16px 0 8px 0" : 0),
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #A7A7A7",
    "&:after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      pointerEvents: "none",
      transform: "scaleX(0)",
      transition: "transform 0.3s ease-in-out",
    },
  },
  inputWrapperFocus: {
    "&:after": {
      borderBottom: (props) => `2px solid ${props.color}`,
      transform: "scaleX(1)",
    },
  },
  inputWrapperError: {
    "&:after": {
      borderBottom: `2px solid ${color.accent}`,
      transform: "scaleX(1)",
    },
  },
  inputWrapperSuccess: {
    "&:after": {
      borderBottom: `2px solid ${color.secondary}`,
      transform: "scaleX(1)",
    },
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  fullWidth: {
    width: "100%",
  },
});

const TextInputDefault = (props) => {
  const {
    label,
    value,
    rows,
    id,
    name,
    color,
    placeholder,
    helperText,
    errorText,
    accept,
    format,
    themeColor,
    textColor,
    modes,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    type,
    extra,
    classNameOptions,
    styleOptions,
    onChange,
    onValidate,
    fullWidth,
    noMargin,
    noValidate,
    required,
    multiple,
    multiline,
    clearable,
    readonly,
  } = props;
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [validationStatus, setValidationStatus] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(0);
  const classes = useStyles({ color, multiline });

  const handleChange = (e) => {
    if (noValidate) {
      return onChange ? onChange(e) : false;
    }

    const value = e.target.value;
    let status = true;
    let message = "";

    if ((multiline && value) || validateNotEmptyString(value)) {
      if (onValidate) {
        status = onValidate(value);
        message = errorText ? errorText : INVALID_ERROR_MESSAGE;
      } else {
        switch (type) {
          case "email":
            status = validateEmail(value);
            message = INVALID_EMAIL_MESSAGE;
            break;
          case "tel":
            status = validatePhoneNumber(value);
            message = INVALID_PHONE_NUMBER_MESSAGE;
            break;
          case "url":
            status = validateURL(value);
            message = INVALID_URL_MESSAGE;
            break;
          default:
            break;
        }
      }
    } else {
      status = !required;
      message = status ? "" : INVALID_REQUIRED_MESSAGE;
    }

    setValidationStatus(status);
    setValidationMessage(status ? "" : message);
    return onChange ? onChange(e, status) : false;
  };

  return (
    <Fragment>
      <div
        className={renderClassName(
          classes.root,
          noMargin && classes.noMargin,
          fullWidth && classes.fullWidth,
          classNameOptions && classNameOptions.root
        )}
        style={renderStyle(styleOptions && styleOptions.root)}
      >
        <div
          className={renderClassName(
            classes.textInput,
            classNameOptions && classNameOptions.textInput
          )}
          style={renderStyle(
            multiline && { height: inputHeight + 25 },
            styleOptions && styleOptions.textInput
          )}
        >
          <div
            className={renderClassName(
              classes.inputWrapper,
              focus && classes.inputWrapperFocus,
              !noValidate && !validationStatus && classes.inputWrapperError,
              !noValidate &&
                (value || value === 0) &&
                validationStatus &&
                classes.inputWrapperSuccess,
              classNameOptions && classNameOptions.inputWrapper
            )}
            style={renderStyle(styleOptions && styleOptions.inputWrapper)}
          >
            <TextInputExtra
              position="start"
              type={type}
              icon={extra}
              className={renderClassName(
                classNameOptions && classNameOptions.extraStart
              )}
              style={renderStyle(styleOptions && styleOptions.extraStart)}
            />
            <TextInputField
              type={type}
              id={id}
              name={name}
              value={value}
              placeholder={placeholder}
              accept={accept}
              label={label}
              format={format}
              rows={rows}
              className={renderClassName(
                classNameOptions && classNameOptions.input
              )}
              style={renderStyle(styleOptions && styleOptions.input)}
              showPassword={showPassword}
              focus={focus}
              multiple={multiple}
              multiline={multiline}
              readonly={readonly}
              onFocus={setFocus}
              onChange={handleChange}
              onChangeHeight={setInputHeight}
              onShowDatepicker={setShowDatepicker}
            />
            <TextInputExtra
              position="end"
              type={type}
              icon={extra}
              className={renderClassName(
                classNameOptions && classNameOptions.extraEnd
              )}
              style={renderStyle(styleOptions && styleOptions.extraEnd)}
              showPassword={showPassword}
              error={!noValidate && !validationStatus}
              success={
                !noValidate && (value || value === 0) && validationStatus
              }
              onChange={setShowPassword}
            />
          </div>
          <TextInputLabel
            id={id}
            type={type}
            color={color}
            value={value}
            extra={extra}
            className={renderClassName(
              classNameOptions && classNameOptions.label
            )}
            style={renderStyle(styleOptions && styleOptions.label)}
            required={required}
            focus={focus}
            error={!noValidate && !validationStatus}
            success={!noValidate && (value || value === 0) && validationStatus}
            disablePadding
          >
            {label}
          </TextInputLabel>
        </div>
        <TextInputHelper
          className={renderClassName(
            classes.helper,
            classNameOptions && classNameOptions.helper
          )}
          style={renderStyle(styleOptions && styleOptions.helper)}
          error={!validationStatus}
        >
          {validationMessage ? validationMessage : helperText ? helperText : ""}
        </TextInputHelper>
      </div>
      {type === "date" && (
        <Datepicker
          show={showDatepicker}
          value={value ? new Date(value) : new Date()}
          themeColor={themeColor}
          textColor={textColor}
          modes={modes}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          clearable={clearable}
          onChange={onChange}
          onClose={() => setShowDatepicker(false)}
        />
      )}
    </Fragment>
  );
};

TextInputDefault.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  rows: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  accept: PropTypes.string,
  format: PropTypes.string,
  themeColor: PropTypes.string,
  textColor: PropTypes.string,
  modes: PropTypes.arrayOf(PropTypes.string),
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
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
  extra: PropTypes.shape({
    start: PropTypes.element,
    end: PropTypes.element,
  }),
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
  onChange: PropTypes.func,
  onValidate: PropTypes.func,
  fullWidth: PropTypes.bool,
  noMargin: PropTypes.bool,
  noValidate: PropTypes.bool,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  multiline: PropTypes.bool,
  clearable: PropTypes.bool,
  readonly: PropTypes.bool,
};

export default TextInputDefault;
