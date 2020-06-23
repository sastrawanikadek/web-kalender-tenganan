/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import {
  renderClassName,
  renderStyle,
  validateSelectValue,
} from "../../utils/helpers";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  label: {
    position: "absolute",
    bottom: 0,
    left: 0,
    transform: (props) =>
      props.disablePadding ? "translate(0px, -15px)" : "translate(8px, -15px)",
    fontSize: "0.9rem",
    pointerEvents: "none",
    transition:
      "transform 0.3s ease-in-out, font-size 0.3s ease-in-out, color 0.3s ease-in-out",
  },
  labelFocus: {
    transform: (props) =>
      props.disablePadding ? "translate(0px, -39px)" : "translate(13px, -39px)",
    fontSize: "0.8rem",
  },
  labelFocusColor: {
    color: (props) => props.color,
  },
  labelError: {
    color: color.accent,
  },
  labelSuccess: {
    color: color.secondary,
  },
});

const SelectLabel = (props) => {
  const {
    value,
    children,
    id,
    color,
    className,
    style,
    focus,
    multiple,
    required,
    empty,
    error,
    success,
    disablePadding,
    onChange,
  } = props;
  const [floating, setFloating] = useState(false);
  const labelRef = useRef(null);
  const classes = useStyles({ color, disablePadding });

  useEffect(() => {
    if (validateSelectValue(multiple, value)) {
      setFloating(true);
    }
  }, []);

  useEffect(() => {
    if (labelRef.current) {
      if (floating || empty) {
        onChange(labelRef.current.getBoundingClientRect().width + 8);
      } else {
        onChange(labelRef.current.getBoundingClientRect().width * 0.9 + 8);
      }
    }
  }, [labelRef, floating, empty, onChange]);

  return children ? (
    <label
      htmlFor={id}
      ref={onChange ? labelRef : null}
      className={renderClassName(
        classes.label,
        (focus || empty || validateSelectValue(multiple, value)) &&
          classes.labelFocus,
        focus && classes.labelFocusColor,
        error && classes.labelError,
        success && classes.labelSuccess,
        className
      )}
      style={renderStyle(style)}
    >
      {required ? `${children} *` : children}
    </label>
  ) : null;
};

SelectLabel.propTypes = {
  value: PropTypes.any,
  children: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  focus: PropTypes.bool,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  empty: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  disablePadding: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SelectLabel;
