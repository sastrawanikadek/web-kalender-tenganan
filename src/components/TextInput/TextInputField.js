import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import { createUseStyles } from "react-jss";
import { format as formatDate } from "date-fns";
import {
  renderClassName,
  renderStyle,
  validateNotEmptyString,
} from "../../utils/helpers";

const useStyles = createUseStyles({
  input: {
    width: "100%",
    height: "100%",
    outline: "none",
    background: "transparent",
  },
  textarea: {
    width: "100%",
    height: "100%",
    outline: "none",
    resize: "none",
    overflow: "hidden",
    background: "transparent",
  },
  fileInput: {
    display: "none",
  },
  fileInputLabel: {
    display: "flex",
    alignItems: "center",
  },
});

const TextInputField = (props) => {
  const {
    type,
    rows,
    id,
    name,
    placeholder,
    label,
    accept,
    format,
    className,
    style,
    value,
    showPassword,
    focus,
    multiple,
    multiline,
    readonly,
    onFocus,
    onChange,
    onChangeHeight,
    onShowDatepicker,
  } = props;
  const inputRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (inputRef.current) {
      onChangeHeight(value ? inputRef.current.scrollHeight : 0);
    }
  }, [inputRef, onChangeHeight, value]);

  const handleShowCurrency = (value) => {
    if (validateNotEmptyString(value)) {
      const currency = String(value).replace(/[^0-9.]/g, "");
      return Number(currency).toLocaleString("id");
    }
    return "";
  };

  const handleChangeFile = (e) =>
    onChange({
      ...e,
      currentTarget: {
        ...e.currentTarget,
        files: e.currentTarget.files,
        value: [...e.currentTarget.files]
          .reduce((result, value) => [...result, value.name], [])
          .join(", "),
      },
      target: {
        ...e.target,
        files: e.target.files,
        value: [...e.target.files]
          .reduce((result, value) => [...result, value.name], [])
          .join(", "),
      },
    });

  const handleChangeCurrency = (e) =>
    onChange({
      ...e,
      currentTarget: {
        ...e.currentTarget,
        value: e.currentTarget.value.replace(/[^0-9,]/g, "").replace(",", "."),
      },
      target: {
        ...e.target,
        value: e.target.value.replace(/[^0-9,]/g, "").replace(",", "."),
      },
    });

  const handleFocus = () => {
    onFocus(true);
    if (type === "date") {
      onShowDatepicker(true);
    }
  };

  return type === "file" ? (
    <label
      className={renderClassName(
        classes.input,
        classes.fileInputLabel,
        className
      )}
      style={renderStyle(style)}
    >
      <Text variant="caption" color="gray" noMargin>
        {value ? value : placeholder ? placeholder : "Choose File"}
      </Text>
      <input
        type={type}
        id={id}
        name={name}
        accept={accept}
        className={classes.fileInput}
        onChange={handleChangeFile}
        multiple={multiple}
      />
    </label>
  ) : multiline ? (
    <textarea
      rows={rows}
      ref={inputRef}
      id={id}
      name={name}
      placeholder={(focus && label) || !label ? placeholder : ""}
      value={value}
      className={renderClassName(classes.textarea, className)}
      style={renderStyle(style)}
      onFocus={handleFocus}
      onBlur={() => onFocus(false)}
      onChange={onChange}
    />
  ) : (
    <input
      type={
        (type === "password" && showPassword) ||
        type === "currency" ||
        type === "date"
          ? "text"
          : type
      }
      id={id}
      name={name}
      placeholder={(focus && label) || !label ? placeholder : ""}
      className={renderClassName(classes.input, className)}
      style={renderStyle(style)}
      value={
        type === "currency"
          ? handleShowCurrency(value)
          : type === "date" && value
          ? formatDate(new Date(value), format)
          : value
      }
      onFocus={handleFocus}
      onBlur={() => onFocus(false)}
      onChange={
        type === "currency"
          ? handleChangeCurrency
          : type === "date"
          ? null
          : onChange
      }
      readOnly={readonly || type === "date"}
    />
  );
};

TextInputField.propTypes = {
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
  rows: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  label: PropTypes.string,
  accept: PropTypes.string,
  format: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  showPassword: PropTypes.bool,
  focus: PropTypes.bool,
  multiple: PropTypes.bool,
  multiline: PropTypes.bool,
  readOnly: PropTypes.bool,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onChangeHeight: PropTypes.func,
  onShowDatepicker: PropTypes.func,
};

export default TextInputField;
