/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import {
  renderClassName,
  renderStyle,
  validateNotEmptyString
} from "../../utils/helpers";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  label: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: props =>
      props.disablePadding ? "translate(0px, 16px)" : "translate(8px, 16px)",
    fontSize: "0.9rem",
    pointerEvents: "none",
    transition:
      "transform 0.3s ease-in-out, font-size 0.3s ease-in-out, color 0.3s ease-in-out"
  },
  labelFocus: {
    transform: props =>
      props.disablePadding ? "translate(0px, -6px)" : "translate(14px, -6px)",
    fontSize: "0.8rem"
  },
  labelFocusColor: {
    color: props => props.color
  },
  error: {
    color: color.accent
  },
  success: {
    color: color.secondary
  }
});

const TextInputLabel = props => {
  const {
    children,
    id,
    color,
    value,
    extra,
    type,
    className,
    style,
    required,
    focus,
    error,
    success,
    disablePadding,
    onChange
  } = props;
  const classes = useStyles({ color, disablePadding });
  const [floating, setFloating] = useState(false);
  const labelRef = useRef(null);

  useEffect(() => {
    if (value || value === 0 || type === "file") {
      setFloating(true);
    }
  }, []);

  useEffect(() => {
    if (labelRef.current) {
      if (floating) {
        onChange(labelRef.current.getBoundingClientRect().width + 8);
      } else {
        onChange(labelRef.current.getBoundingClientRect().width * 0.9 + 8);
      }
    }
  }, [labelRef, floating, onChange]);

  return children && validateNotEmptyString(children) ? (
    <label
      htmlFor={id}
      className={renderClassName(
        classes.label,
        focus && classes.labelFocusColor,
        (focus ||
          value ||
          value === 0 ||
          type === "file" ||
          (extra && extra.start)) &&
          classes.labelFocus,
        error && classes.error,
        success && classes.success,
        className
      )}
      style={renderStyle(style)}
      ref={onChange ? labelRef : null}
    >
      {required ? `${children} *` : children}
    </label>
  ) : null;
};

TextInputLabel.defaultProps = {
  disablePadding: false
};

TextInputLabel.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
  extra: PropTypes.shape({
    start: PropTypes.element,
    end: PropTypes.element
  }),
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "tel",
    "date",
    "file",
    "currency",
    "url"
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  required: PropTypes.bool,
  disablePadding: PropTypes.bool,
  focus: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  onChange: PropTypes.func
};

export default TextInputLabel;
