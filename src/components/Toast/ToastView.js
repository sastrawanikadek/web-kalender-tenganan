/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Paper from "../Paper";
import Text from "../Text";
import IconButton from "../IconButton";
import CheckIcon from "mdi-react/CheckIcon";
import AlertOutlineIcon from "mdi-react/AlertOutlineIcon";
import AlertCircleOutlineIcon from "mdi-react/AlertCircleOutlineIcon";
import CloseIcon from "mdi-react/CloseIcon";
import { CSSTransition } from "react-transition-group";
import { createUseStyles } from "react-jss";
import { color } from "../../utils/theme";
import { renderStyle } from "../../utils/helpers";

const variants = {
  normal: { icon: null, backgroundColor: "white" },
  success: {
    icon: <CheckIcon size={20} />,
    backgroundColor: "#4caf50",
  },
  warning: {
    icon: <AlertOutlineIcon size={20} />,
    backgroundColor: "#ff9800",
  },
  error: {
    icon: <AlertCircleOutlineIcon size={20} />,
    backgroundColor: color.accent,
  },
};

const useStyles = createUseStyles({
  root: {
    position: "fixed",
    width: "calc(100% - 48px)",
    margin: 24,
    display: "flex",
    alignItems: "center",
    zIndex: 300,
  },
  toastEnter: {
    "& $paper": {
      transform: "scale(1)",
    },
  },
  toastExit: {
    "& $paper": {
      transform: "scale(0)",
    },
  },
  paper: {
    maxWidth: (props) => props.maxWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    backgroundColor: (props) => variants[props.variant].backgroundColor,
    color: (props) => (props.variant === "normal" ? "black" : "white"),
    borderRadius: 3,
    transform: "scale(0)",
    transition:
      "transform 0.2s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out",
  },
  text: {
    marginLeft: (props) => (props.variant === "normal" ? 0 : 12),
    marginRight: (props) => (props.disableCloseButton ? 0 : 12),
    flex: 1,
    fontWeight: "500",
  },
  iconButton: {
    padding: 4,
  },
});

const ToastView = (props) => {
  const {
    variant,
    position,
    hideTimeout,
    maxWidth,
    children,
    show,
    disableAutoHide,
    disableCloseButton,
    onClose,
  } = props;
  const [timeoutId, setTimeoutId] = useState(null);
  const classes = useStyles({ variant, maxWidth, disableCloseButton });
  const toastPosition = renderStyle(
    { vertical: "bottom", horizontal: "right" },
    position
  );
  const toastStyle = {
    [toastPosition.vertical]: 0,
    justifyContent:
      toastPosition.horizontal === "left"
        ? "flex-start"
        : toastPosition.horizontal === "right"
        ? "flex-end"
        : "center",
  };

  const handleSetTimeout = () => {
    if (show && !disableAutoHide) {
      const timeoutId = setTimeout(onClose, hideTimeout);
      setTimeoutId(timeoutId);
    }
  };

  const handleClearTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    handleSetTimeout();
  }, [show, disableAutoHide]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      timeout={200}
      classNames={{
        enterActive: classes.toastEnter,
        enterDone: classes.toastEnter,
        exit: classes.toastExit,
        exitActive: classes.toastExit,
      }}
      unmountOnExit
    >
      <div className={classes.root} style={toastStyle}>
        <Paper
          className={classes.paper}
          elevation="low"
          onMouseEnter={handleClearTimeout}
          onMouseLeave={handleSetTimeout}
        >
          {variants[variant].icon}
          <Text variant="paragraph" className={classes.text} noMargin>
            {children}
          </Text>
          {!disableCloseButton && (
            <IconButton className={classes.iconButton} onClick={onClose}>
              <CloseIcon size={20} />
            </IconButton>
          )}
        </Paper>
      </div>
    </CSSTransition>,
    document.getElementsByTagName("body")[0]
  );
};

ToastView.defaultProps = {
  variant: "normal",
  hideTimeout: 3000,
  maxWidth: 400,
  disableAutoHide: false,
  disableCloseButton: false,
};

ToastView.propTypes = {
  variant: PropTypes.oneOf(["normal", "success", "warning", "error"]),
  position: PropTypes.shape({
    vertical: PropTypes.oneOf(["top", "bottom"]),
    horizontal: PropTypes.oneOf(["left", "center", "right"]),
  }),
  hideTimeout: PropTypes.number,
  maxWidth: PropTypes.number,
  children: PropTypes.string,
  show: PropTypes.bool,
  disableAutoHide: PropTypes.bool,
  disableCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ToastView;
