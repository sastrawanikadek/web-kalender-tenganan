import React from "react";
import PropTypes from "prop-types";
import Ripple from "../Ripple";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { renderClassName } from "../../utils/helpers";

const useStyles = createUseStyles({
  iconButton: {
    display: "inline-flex",
    flex: "0 0 auto",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: 12,
    color: "currentColor",
    borderRadius: "50%",
    cursor: "pointer",
    overflow: "hidden",
    backgroundColor: "transparent",
    outline: "none",
    "-webkit-tap-highlight-color": "transparent",
    "&:focus div:after": {
      backgroundColor: "currentColor"
    }
  },
  disabled: {
    color: "rgba(0, 0, 0, 0.3) !important",
    cursor: "default !important"
  }
});

const IconButtonView = props => {
  const {
    children,
    component,
    className,
    href,
    style,
    onClick,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    disable,
    disableRipple
  } = props;
  const classes = useStyles();
  const classNames = renderClassName(
    classes.iconButton,
    className,
    disable && classes.disabled
  );

  return component === "a" && !disable ? (
    <Link
      to={href}
      className={classNames}
      style={style}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!disable && !disableRipple && <Ripple />}
      {children}
    </Link>
  ) : (
    <button
      type="button"
      className={classNames}
      style={style}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disable}
    >
      {!disable && !disableRipple && <Ripple />}
      {children}
    </button>
  );
};

IconButtonView.defaultProps = {
  disable: false,
  disableRipple: false
};

IconButtonView.propTypes = {
  /**
   * Icon component
   * See https://github.com/levrik/mdi-react
   */
  children: PropTypes.element.isRequired,

  /**
   * Component used by IconButton:
   * 1. button
   * 2. a
   */
  component: PropTypes.oneOf(["button", "a"]),

  /**
   * Override default styles with className
   */
  className: PropTypes.string,

  /**
   * Hyperlink, only work when component props set to a
   */
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Override default styles with inline style
   */
  style: PropTypes.object,

  /**
   * Function that will triggered when Button is clicked
   */
  onClick: PropTypes.func,

  /**
   * Function that will triggered when Button is focused
   */
  onFocus: PropTypes.func,

  /**
   * Function that will triggered when Button lost it's focus
   */
  onBlur: PropTypes.func,

  /**
   * Function that will triggered when mouse entered the Button
   */
  onMouseEnter: PropTypes.func,

  /**
   * Function that will triggered when mouse leaved the Button
   */
  onMouseLeave: PropTypes.func,

  /**
   * Disable icon button
   */
  disable: PropTypes.bool,

  /**
   * Disable ripple effect when clicked
   */
  disableRipple: PropTypes.bool
};

export default IconButtonView;
