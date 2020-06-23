import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "../Button/ButtonView";
import Text from "../Text/TextView";
import { createUseStyles } from "react-jss";
import { format } from "date-fns";

const useStyles = createUseStyles({
  modalHeader: {
    padding: "20px 24px",
    backgroundColor: (props) => props.themeColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButton: {
    padding: 0,
    color: "white",
  },
});

const PickerHeaderTime = (props) => {
  const {
    themeColor,
    mode,
    selectedDate,
    onChangeMode,
    disableSecond,
    show,
  } = props;
  const classes = useStyles({ themeColor });

  return show ? (
    <div className={classes.modalHeader}>
      <Button
        className={classes.headerButton}
        onClick={() => onChangeMode("hour")}
      >
        <Text
          variant="h3"
          color={mode === "hour" ? "white" : "rgba(255, 255, 255, 0.7)"}
          noMargin
        >
          {format(selectedDate, "HH")}
        </Text>
      </Button>
      <Text variant="h3" color="rgba(255, 255, 255, 0.7)" noMargin>
        :
      </Text>
      <Button
        className={classes.headerButton}
        onClick={() => onChangeMode("minute")}
      >
        <Text
          variant="h3"
          color={mode === "minute" ? "white" : "rgba(255, 255, 255, 0.7)"}
          noMargin
        >
          {format(selectedDate, "mm")}
        </Text>
      </Button>
      {!disableSecond && (
        <Fragment>
          <Text variant="h3" color="rgba(255, 255, 255, 0.7)" noMargin>
            :
          </Text>
          <Button
            className={classes.headerButton}
            onClick={() => onChangeMode("second")}
          >
            <Text
              variant="h3"
              color={mode === "second" ? "white" : "rgba(255, 255, 255, 0.7)"}
              noMargin
            >
              {format(selectedDate, "ss")}
            </Text>
          </Button>
        </Fragment>
      )}
    </div>
  ) : null;
};

PickerHeaderTime.propTypes = {
  themeColor: PropTypes.string,
  mode: PropTypes.oneOf(["hour", "minute", "second"]),
  selectedDate: PropTypes.instanceOf(Date),
  onChangeMode: PropTypes.func,
  disableSecond: PropTypes.bool,
  show: PropTypes.bool,
};

export default PickerHeaderTime;
