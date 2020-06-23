import React from "react";
import PropTypes from "prop-types";
import Ripple from "../Ripple";
import Text from "../Text";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { renderClassName } from "../../utils/helpers";

const useStyles = createUseStyles({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "12px 24px",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    color: "currentColor",
    backgroundColor: "transparent",
    borderRadius: props => (props.rounded ? 4 : 0),
    "-webkit-tap-highlight-color": "transparent",
    "&:focus div:after": {
      backgroundColor: "currentColor"
    }
  },
  outlined: {
    border: "1px solid currentColor"
  },
  contained: {
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
  },
  fullWidth: {
    width: "100%"
  },
  disabled: {
    color: "rgba(0, 0, 0, 0.3) !important",
    cursor: "default !important"
  }
});

const ButtonView = props => {
  const {
    children,
    type,
    variant,
    component,
    value,
    tabIndex,
    href,
    fullWidth,
    rounded,
    className,
    disable,
    disableRipple,
    style,
    onClick,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave
  } = props;
  const classes = useStyles({ rounded });
  const classNames = renderClassName(
    classes.button,
    classes[variant],
    fullWidth && component === "button" && classes.fullWidth,
    className,
    disable && classes.disabled
  );

  return component === "a" ? (
    <Link
      to={href}
      tabIndex={tabIndex}
      className={classNames}
      style={style}
      onClick={!disable ? onClick : null}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!disable && !disableRipple && <Ripple />}
      {typeof children === "string" ? (
        <Text variant="button" color="currentColor" noMargin>
          {children}
        </Text>
      ) : (
        children
      )}
    </Link>
  ) : (
    <button
      type={type}
      className={classNames}
      style={style}
      value={value}
      tabIndex={tabIndex}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disable}
    >
      {!disable && !disableRipple && <Ripple />}
      {typeof children === "string" ? (
        <Text variant="button" color="currentColor" noMargin>
          {children}
        </Text>
      ) : (
        children
      )}
    </button>
  );
};

ButtonView.defaultProps = {
  type: "button",
  variant: "text",
  component: "button",
  fullWidth: false,
  rounded: true
};

ButtonView.propTypes = {
  children: PropTypes.any.isRequired,

  /**
   * Type of the Button:
   * 1. button
   * 2. submit
   * 3. reset
   */
  type: PropTypes.oneOf(["button", "submit", "reset"]),

  /**
   * Variant of the Button:
   * 1. contained
   * 2. outlined
   * 3. text
   */
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),

  /**
   * Component used by Button:
   * 1. button
   * 2. a
   */
  component: PropTypes.oneOf(["button", "a"]),

  /**
   * Value of the Button
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Tab Index
   */
  tabIndex: PropTypes.number,

  /**
   * Override default styles with className
   */
  className: PropTypes.string,

  /**
   * Hyperlink, only work when component props set to a
   */
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * If set to true, the Button will have 100% width
   */
  fullWidth: PropTypes.bool,

  /**
   * If set to true, the Button will have border-radius
   */
  rounded: PropTypes.bool,

  /**
   * Disable button
   */
  disable: PropTypes.bool,

  /**
   * Disable ripple effect when clicked
   */
  disableRipple: PropTypes.bool,

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
  onMouseLeave: PropTypes.func
};

export default ButtonView;
