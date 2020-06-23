import React, { Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import {
  renderClassName,
  renderStyle,
  validateSelectValue,
  validateNotEmptyString,
} from "../../utils/helpers";
import SelectExtra from "./SelectExtra";
import SelectField from "./SelectField";
import SelectLabel from "./SelectLabel";
import SelectHelper from "./SelectHelper";
import SelectMenu from "./SelectMenu";
import {
  INVALID_REQUIRED_MESSAGE,
  INVALID_ERROR_MESSAGE,
} from "../../utils/constants";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  root: {
    position: "relative",
    marginTop: 16,
    marginBottom: 8,
  },
  selectInput: {
    position: "relative",
    minHeight: 48,
  },
  selectWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #A7A7A7",
    outline: "none",
    cursor: "pointer",
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
  selectWrapperFocus: {
    "&:after": {
      borderBottom: (props) => `2px solid ${props.color}`,
      transform: "scaleX(1)",
    },
  },
  selectWrapperError: {
    "&:after": {
      borderBottom: `2px solid ${color.accent}`,
      transform: "scaleX(1)",
    },
  },
  selectWrapperSuccess: {
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

const SelectDefault = (props) => {
  const {
    options,
    extra,
    classNameOptions,
    styleOptions,
    value,
    label,
    id,
    name,
    placeholder,
    color,
    helperText,
    errorText,
    emptyText,
    noMargin,
    fullWidth,
    empty,
    multiple,
    checkbox,
    required,
    noValidate,
    readonly,
    renderValue,
    onChange,
    onValidate,
  } = props;
  const [focus, setFocus] = useState(false);
  const [target, setTarget] = useState(undefined);
  const [validationStatus, setValidationStatus] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const selectWrapperRef = useRef(null);
  const classes = useStyles({ color });

  const handleSelectWrapper = (name, focus, currentTarget) => {
    if (name === "focus" && typeof target === "undefined") {
      currentTarget.click();
    } else {
      if (name === "blur" && currentTarget === null) {
        setTarget(undefined);
      } else if (name !== "focus") {
        setTarget(currentTarget);
      }
    }
    setFocus(focus);
  };

  const handleChange = (e) => {
    if (noValidate) {
      return onChange ? onChange(e) : false;
    }

    let status = true;
    let message = "";

    if (validateSelectValue(multiple, e.target.value) && onValidate) {
      status = onValidate(e.target.value);
      message = errorText ? errorText : INVALID_ERROR_MESSAGE;
    } else if (
      required &&
      ((multiple &&
        Array.isArray(e.target.value) &&
        e.target.value.length === 0) ||
        (!multiple &&
          typeof e.target.value === "string" &&
          !validateNotEmptyString(e.target.value)))
    ) {
      status = false;
      message = INVALID_REQUIRED_MESSAGE;
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
            classes.selectInput,
            classNameOptions && classNameOptions.selectInput
          )}
          style={renderStyle(styleOptions && styleOptions.selectInput)}
        >
          <div
            className={renderClassName(
              classes.selectWrapper,
              focus && classes.selectWrapperFocus,
              !noValidate && !validationStatus && classes.selectWrapperError,
              !noValidate &&
                validateSelectValue(multiple, value) &&
                validationStatus &&
                classes.selectWrapperSuccess,
              classNameOptions && classNameOptions.selectWrapper
            )}
            style={renderStyle(styleOptions && styleOptions.selectWrapper)}
            id={id}
            ref={selectWrapperRef}
            tabIndex={0}
            onClick={(e) => handleSelectWrapper("click", true, e.currentTarget)}
            onFocus={(e) => handleSelectWrapper("focus", true, e.currentTarget)}
            onBlur={() => handleSelectWrapper("blur", false, target)}
          >
            <SelectExtra
              position="start"
              icon={extra}
              className={renderClassName(
                classNameOptions && classNameOptions.extraStart
              )}
              style={renderStyle(styleOptions && styleOptions.extraStart)}
            />
            <SelectField
              options={options}
              label={label}
              value={value}
              name={name}
              placeholder={placeholder}
              emptyText={emptyText}
              focus={focus}
              multiple={multiple}
              readonly={readonly}
              renderValue={renderValue}
              classNameOptions={{
                select: classNameOptions && classNameOptions.select,
                selectText: classNameOptions && classNameOptions.selectText,
              }}
              styleOptions={{
                select: styleOptions && styleOptions.select,
                selectText: styleOptions && styleOptions.selectText,
              }}
            />
            <SelectExtra
              position="end"
              icon={extra}
              className={renderClassName(
                classNameOptions && classNameOptions.extraEnd
              )}
              style={renderStyle(styleOptions && styleOptions.extraEnd)}
            />
          </div>
          <SelectLabel
            value={value}
            id={id}
            color={color}
            focus={focus}
            multiple={multiple}
            required={required}
            empty={empty}
            success={
              !noValidate &&
              validateSelectValue(multiple, value) &&
              validationStatus
            }
            error={!noValidate && !validationStatus}
            className={renderClassName(
              classNameOptions && classNameOptions.label
            )}
            style={renderStyle(styleOptions && styleOptions.label)}
            disablePadding
          >
            {label}
          </SelectLabel>
        </div>
        <SelectHelper
          error={!validationStatus}
          className={renderClassName(
            classNameOptions && classNameOptions.helper
          )}
          style={renderStyle(styleOptions && styleOptions.helper)}
        >
          {validationMessage ? validationMessage : helperText ? helperText : ""}
        </SelectHelper>
      </div>
      <SelectMenu
        options={options}
        value={value}
        target={target}
        container={selectWrapperRef}
        emptyText={emptyText}
        onChange={handleChange}
        onClose={() => handleSelectWrapper("close", focus, null)}
        empty={empty}
        multiple={multiple}
        checkbox={checkbox}
        required={required}
        readonly={readonly}
        classNameOptions={{
          menu: classNameOptions && classNameOptions.menu,
          option: classNameOptions && classNameOptions.option,
          checkbox: classNameOptions && classNameOptions.checkbox,
          optionText: classNameOptions && classNameOptions.optionText,
        }}
        styleOptions={{
          menu: styleOptions && styleOptions.menu,
          option: styleOptions && styleOptions.option,
          checkbox: styleOptions && styleOptions.checkbox,
          optionText: styleOptions && styleOptions.optionText,
        }}
      />
    </Fragment>
  );
};

SelectDefault.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.any.isRequired,
    })
  ),
  extra: PropTypes.shape({
    start: PropTypes.element,
    end: PropTypes.element,
  }),
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    selectInput: PropTypes.string,
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
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    selectInput: PropTypes.object,
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
  value: PropTypes.any,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  emptyText: PropTypes.string,
  noMargin: PropTypes.bool,
  fullWidth: PropTypes.bool,
  empty: PropTypes.bool,
  multiple: PropTypes.bool,
  checkbox: PropTypes.bool,
  required: PropTypes.bool,
  noValidate: PropTypes.bool,
  readonly: PropTypes.bool,
  renderValue: PropTypes.func,
  onChange: PropTypes.func,
  onValidate: PropTypes.func,
};

export default SelectDefault;
