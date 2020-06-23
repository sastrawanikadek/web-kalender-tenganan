import React, { Fragment, useState, useRef } from "react";
import PropTypes from "prop-types";
import SelectExtra from "./SelectExtra";
import SelectLegend from "./SelectLegend";
import SelectLabel from "./SelectLabel";
import SelectField from "./SelectField";
import SelectHelper from "./SelectHelper";
import { createUseStyles } from "react-jss";
import {
  renderClassName,
  validateNotEmptyString,
  validateSelectValue,
  renderStyle,
} from "../../utils/helpers";
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
  fieldset: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    padding: "2px 8px",
    border: "1px solid #A7A7A7",
    borderRadius: 4,
    cursor: "pointer",
    outline: "none",
    transition: "border 0.3s ease-in-out",
  },
  fieldsetFocus: {
    border: (props) => `2px solid ${props.color}`,
  },
  fieldsetError: {
    border: `2px solid ${color.accent}`,
  },
  fieldsetSuccess: {
    border: `2px solid ${color.secondary}`,
  },
  selectWrapper: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  fullWidth: {
    width: "100%",
  },
});

const SelectOutlined = (props) => {
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
  const [labelWidth, setLabelWidth] = useState(0);
  const fieldsetRef = useRef(null);
  const classes = useStyles({ color });

  const handleFieldset = (name, focus, currentTarget) => {
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
          <fieldset
            className={renderClassName(
              classes.fieldset,
              focus && classes.fieldsetFocus,
              !noValidate && !validationStatus && classes.fieldsetError,
              !noValidate &&
                validateSelectValue(multiple, value) &&
                validationStatus &&
                classes.fieldsetSuccess,
              classNameOptions && classNameOptions.fieldset
            )}
            style={renderStyle(styleOptions && styleOptions.fieldset)}
            id={id}
            ref={fieldsetRef}
            tabIndex={0}
            onClick={(e) => handleFieldset("click", true, e.currentTarget)}
            onFocus={(e) => handleFieldset("focus", true, e.currentTarget)}
            onBlur={() => handleFieldset("blur", false, target)}
          >
            <SelectLegend
              width={labelWidth}
              value={value}
              focus={focus}
              multiple={multiple}
              empty={empty}
              className={renderClassName(
                classNameOptions && classNameOptions.legend
              )}
              style={renderStyle(styleOptions && styleOptions.legend)}
            />
            <div
              className={renderClassName(
                classes.selectWrapper,
                classNameOptions && classNameOptions.selectWrapper
              )}
              style={renderStyle(styleOptions && styleOptions.selectWrapper)}
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
          </fieldset>
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
            onChange={setLabelWidth}
            className={renderClassName(
              classNameOptions && classNameOptions.label
            )}
            style={renderStyle(styleOptions && styleOptions.label)}
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
        container={fieldsetRef}
        emptyText={emptyText}
        onChange={handleChange}
        onClose={() => handleFieldset("close", focus, null)}
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

SelectOutlined.propTypes = {
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

export default SelectOutlined;
