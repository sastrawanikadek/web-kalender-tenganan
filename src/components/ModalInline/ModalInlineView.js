import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Paper from "../Paper/PaperView";
import { createUseStyles } from "react-jss";
import { CSSTransition } from "react-transition-group";

const useStyles = createUseStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 300,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  paper: {
    position: "absolute",
    top: 64,
    left: 276,
    maxWidth: 400,
    height: "calc(100% - 64px)",
    transform: "translateX(-100%)",
    opacity: 0,
    borderRadius: 0,
    borderRight: "1px solid #dadce0",
    boxShadow: "none",
    transition: "transform 0.3s ease-in-out, opacity 0.15s ease-in-out 0.25s",
  },
  popupEnter: {
    "& $paper": {
      transform: "translateX(0)",
      opacity: 1,
    },
  },
  popupExit: {
    "& $paper": {
      transform: "translateX(-100%)",
      opacity: 0,
    },
  },
});

const ModalInlineView = (props) => {
  const { target, children, onClose } = props;
  const classes = useStyles();

  useEffect(() => {
    if (target) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }

    return () => (document.getElementsByTagName("html")[0].style.overflow = "");
  }, [target]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={Boolean(target)}
      timeout={300}
      classNames={{
        enterActive: classes.popupEnter,
        enterDone: classes.popupEnter,
        exitActive: classes.popupExit,
        exitDone: classes.popupExit,
      }}
      unmountOnExit
    >
      <div className={classes.root}>
        <div className={classes.overlay} onClick={onClose} />
        <Paper className={classes.paper}>{children}</Paper>
      </div>
    </CSSTransition>,

    document.getElementsByTagName("body")[0]
  );
};

ModalInlineView.propTypes = {
  target: PropTypes.object,
  children: PropTypes.any,
  onClose: PropTypes.func,
};

export default ModalInlineView;
