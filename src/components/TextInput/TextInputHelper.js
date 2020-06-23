import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import { createUseStyles } from "react-jss";
import { color } from "../../utils/theme";
import { renderClassName, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  helper: {
    fontWeight: "500",
    fontSize: "0.8rem",
    lineHeight: 1.5,
    letterSpacing: 0.1,
    marginTop: 8,
    boxSizing: "border-box"
  },
  error: {
    color: color.accent
  }
});

const TextInputHelper = props => {
  const { children, className, style, error } = props;
  const classes = useStyles();

  return children ? (
    <Text
      className={renderClassName(
        classes.helper,
        className,
        error && classes.error
      )}
      style={renderStyle(style)}
      noMargin
    >
      {children}
    </Text>
  ) : null;
};

TextInputHelper.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  error: PropTypes.bool
};

export default TextInputHelper;
