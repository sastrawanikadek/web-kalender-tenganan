import React from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton";
import Tooltip from "../Tooltip";
import EyeIcon from "mdi-react/EyeIcon";
import EyeOffIcon from "mdi-react/EyeOffIcon";
import AlertIcon from "mdi-react/AlertIcon";
import CheckCircleIcon from "mdi-react/CheckCircleIcon";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  start: {
    marginRight: 8,
    display: "inline-flex",
  },
  end: {
    marginLeft: 8,
    marginRight: 12,
    display: "inline-flex",
  },
  password: {
    color: "#A7A7A7",
  },
  error: {
    color: color.accent,
  },
  success: {
    color: color.secondary,
  },
});

const TextInputExtra = (props) => {
  const {
    position,
    type,
    icon,
    className,
    style,
    showPassword,
    error,
    success,
    onChange,
  } = props;
  const classes = useStyles();

  return icon && icon[position] ? (
    <div
      className={renderClassName(classes[position], className)}
      style={renderStyle(style)}
    >
      {icon[position]}
    </div>
  ) : position === "end" && type === "password" ? (
    <Tooltip
      content={showPassword ? "Sembunyikan Kata Sandi" : "Tampilkan Kata Sandi"}
    >
      <IconButton
        onClick={() => onChange(!showPassword)}
        className={renderClassName(classes.password, className)}
        style={renderStyle(style)}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </IconButton>
    </Tooltip>
  ) : error || success ? (
    <div
      className={renderClassName(
        classes[position],
        error && classes.error,
        success && classes.success,
        className
      )}
      style={renderStyle(style)}
    >
      {error ? <AlertIcon /> : <CheckCircleIcon />}
    </div>
  ) : null;
};

TextInputExtra.propTypes = {
  position: PropTypes.oneOf(["start", "end"]),
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
  icon: PropTypes.shape({
    start: PropTypes.element,
    end: PropTypes.element,
  }),
  className: PropTypes.string,
  style: PropTypes.object,
  showPassword: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TextInputExtra;
