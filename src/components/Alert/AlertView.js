import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Paper from "../Paper";
import Text from "../Text";
import Button from "../Button";
import { createUseStyles } from "react-jss";
import { CSSTransition } from "react-transition-group";
import { renderStyle, renderClassName } from "../../utils/helpers";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    zIndex: 350,
    boxSizing: "border-box"
  },
  popupEnter: {
    "& $paper": {
      transform: "scale(1)",
      opacity: 1
    }
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    cursor: "pointer"
  },
  paper: {
    position: "relative",
    zIndex: 100,
    transform: "scale(0)",
    opacity: 0,
    maxWidth: 360,
    padding: "64px 24px 24px 24px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
  },
  image: {
    maxWidth: "80%",
    height: "auto",
    marginBottom: 24
  },
  button: {
    marginTop: 48,
    background: color.primary,
    alignSelf: "center",
    color: "#000"
  }
});

const AlertView = props => {
  const {
    show,
    variant,
    title,
    message,
    onClose,
    classNameOptions,
    styleOptions
  } = props;
  const [alertVariant, setAlertVariant] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if (show) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
      setAlertVariant(variant);
      setAlertTitle(title);
      setAlertMessage(message);
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "";
    }
    return () => (document.getElementsByTagName("html")[0].style.overflow = "");
  }, [show, variant, title, message]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      timeout={300}
      classNames={{
        enterActive: classes.popupEnter,
        enterDone: classes.popupEnter
      }}
      unmountOnExit
    >
      <div className={classes.root}>
        <div className={classes.overlay} onClick={onClose} />

        <Paper
          className={renderClassName(
            classes.paper,
            classNameOptions && classNameOptions.root
          )}
          style={renderStyle(styleOptions && styleOptions.root)}
        >
          <img
            src={`/assets/${alertVariant}.svg`}
            alt={alertVariant}
            className={renderClassName(
              classes.image,
              classNameOptions && classNameOptions.image
            )}
            style={renderStyle(styleOptions && styleOptions.image)}
          />
          <Text
            variant="h4"
            align="center"
            className={renderClassName(
              classNameOptions && classNameOptions.title
            )}
            style={renderStyle(styleOptions && styleOptions.title)}
          >
            {alertTitle}
          </Text>
          <Text
            align="center"
            color="gray"
            className={renderClassName(
              classNameOptions && classNameOptions.message
            )}
            style={renderStyle(styleOptions && styleOptions.message)}
          >
            {alertMessage}
          </Text>
          <Button
            variant="contained"
            className={renderClassName(
              classes.button,
              classNameOptions && classNameOptions.button
            )}
            style={renderStyle(styleOptions && styleOptions.button)}
            onClick={onClose}
          >
            Close
          </Button>
        </Paper>
      </div>
    </CSSTransition>,
    document.getElementsByTagName("body")[0]
  );
};

AlertView.defaultProps = {
  show: false,
  variant: "success"
};

AlertView.propTypes = {
  show: PropTypes.bool,
  variant: PropTypes.oneOf(["success", "info", "warning", "error"]),
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    button: PropTypes.string
  }),
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    image: PropTypes.object,
    title: PropTypes.object,
    message: PropTypes.object,
    button: PropTypes.object
  })
};

export default AlertView;
