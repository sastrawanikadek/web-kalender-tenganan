import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "../Button/ButtonView";
import IconButton from "../IconButton/IconButtonView";
import Text from "../Text/TextView";
import CalendarIcon from "mdi-react/CalendarIcon";
import ClockOutlineIcon from "mdi-react/ClockOutlineIcon";
import { createUseStyles } from "react-jss";
import { format } from "date-fns";

const useStyles = createUseStyles({
  modalHeader: {
    padding: "20px 24px",
    backgroundColor: (props) => props.themeColor,
  },
  modalFlexHeader: {
    display: "flex",
    alignItems: "center",
  },
  expand: {
    flex: 1,
  },
  iconButton: {
    color: "white",
  },
  headerButton: {
    padding: 0,
    color: "white",
  },
});

const PickerHeaderDatetime = (props) => {
  const {
    themeColor,
    mode,
    timeMode,
    display,
    selectedDate,
    onChangeMode,
    onChangeTimeMode,
    onChangeDisplay,
    disableSecond,
    show,
  } = props;
  const classes = useStyles({ themeColor });

  return show ? (
    <div className={classes.modalHeader}>
      <div className={classes.modalFlexHeader}>
        {display === "date" && (
          <Button
            className={classes.headerButton}
            onClick={() => onChangeMode("year")}
          >
            <Text
              variant="body"
              color={mode === "year" ? "white" : "rgba(255, 255, 255, 0.7)"}
              noMargin
            >
              {format(selectedDate, "yyyy")}
            </Text>
          </Button>
        )}
        {display === "time" && (
          <Button
            className={classes.headerButton}
            onClick={() => onChangeDisplay("date")}
          >
            <Text variant="body" color="rgba(255, 255, 255, 0.7)" noMargin>
              {format(selectedDate, "EEE, d LLL yyyy")}
            </Text>
          </Button>
        )}
        <div className={classes.expand} />
        <IconButton
          className={classes.iconButton}
          onClick={() => onChangeDisplay(display === "date" ? "time" : "date")}
        >
          {display === "date" ? <ClockOutlineIcon /> : <CalendarIcon />}
        </IconButton>
      </div>
      <div className={classes.modalFlexHeader}>
        {display === "date" && (
          <Button
            className={classes.headerButton}
            onClick={() => onChangeMode("date")}
          >
            <Text
              color={mode === "date" ? "white" : "rgba(255, 255, 255, 0.7)"}
              variant="h3"
              noMargin
            >
              {format(selectedDate, "EEE, d LLL")}
            </Text>
          </Button>
        )}
        {display === "time" && (
          <Fragment>
            <Button
              className={classes.headerButton}
              onClick={() => onChangeTimeMode("hour")}
            >
              <Text
                variant="h3"
                color={
                  timeMode === "hour" ? "white" : "rgba(255, 255, 255, 0.7)"
                }
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
              onClick={() => onChangeTimeMode("minute")}
            >
              <Text
                variant="h3"
                color={
                  timeMode === "minute" ? "white" : "rgba(255, 255, 255, 0.7)"
                }
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
                  onClick={() => onChangeTimeMode("second")}
                >
                  <Text
                    variant="h3"
                    color={
                      timeMode === "second"
                        ? "white"
                        : "rgba(255, 255, 255, 0.7)"
                    }
                    noMargin
                  >
                    {format(selectedDate, "ss")}
                  </Text>
                </Button>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  ) : null;
};

PickerHeaderDatetime.propTypes = {
  themeColor: PropTypes.string,
  mode: PropTypes.oneOf(["year", "month", "date"]),
  timeMode: PropTypes.oneOf(["hour", "minute", "second"]),
  display: PropTypes.oneOf(["date", "time"]),
  selectedDate: PropTypes.instanceOf(Date),
  onChangeMode: PropTypes.func,
  onChangeTimeMode: PropTypes.func,
  onChangeDisplay: PropTypes.func,
  disableSecond: PropTypes.bool,
  show: PropTypes.bool,
};

export default PickerHeaderDatetime;
