import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import { createUseStyles } from "react-jss";
import { offset } from "../../utils/helpers";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 300,
    marginTop: 24,
    marginBottom: 24,
  },
  container: {
    position: "relative",
    height: 268,
    width: 268,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    pointerEvents: "none",
  },
  clock: {
    position: "absolute",
    height: "100%",
    width: "100%",
    outline: "none",
    pointerEvents: "auto",
    cursor: "pointer",
    "&:active": {
      cursor: "grabbing",
    },
  },
  clockPin: {
    position: "absolute",
    top: "calc(50% - 3px)",
    left: "calc(50% - 3px)",
    height: 6,
    width: 6,
    borderRadius: "50%",
    backgroundColor: (props) => props.themeColor,
  },
  clockNumber: {
    position: "absolute",
    top: 4,
    left: "calc(50% - 16px)",
    height: 32,
    width: 32,
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const PickerTime = (props) => {
  const { show, themeColor } = props;
  const classes = useStyles({ themeColor });

  const handleStartDrag = (e) => {
    const element = e.currentTarget;
    const { height, width, top, left } = offset(element);

    const handleDrag = (e) => {
      if (
        e.clientX < left ||
        e.clientX > left + width ||
        e.clientY < top ||
        e.clientY > top + height
      ) {
        document.removeEventListener("mousemove", handleDrag);
        return;
      }

      const posX = e.clientX - left;
      const posY = e.clientY - top;
    };

    document.addEventListener("mousemove", handleDrag);

    element.onmouseup = () => {
      document.removeEventListener("mousemove", handleDrag);
      element.onmouseup = null;
    };
  };

  return show ? (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.clock} onMouseDown={handleStartDrag} />
        <div className={classes.clockPin} />
        <Text className={classes.clockNumber} noMargin>
          12
        </Text>
      </div>
    </div>
  ) : null;
};

PickerTime.propTypes = {
  themeColor: PropTypes.string,
  show: PropTypes.bool,
};

export default PickerTime;
