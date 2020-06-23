/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Paper from "../Paper";
import Button from "../Button";
import PickerHeaderDate from "./PickerHeaderDate";
import PickerHeaderTime from "./PickerHeaderTime";
import PickerHeaderDatetime from "./PickerHeaderDatetime";
import PickerCalendar from "./PickerCalendar";
import PickerYear from "./PickerYear";
import PickerMonth from "./PickerMonth";
import PickerTime from "./PickerTime";
import { createUseStyles } from "react-jss";
import { color } from "../../utils/theme";
import { isBefore, isAfter, startOfDay } from "date-fns";
import { CSSTransition } from "react-transition-group";
import { renderClassName } from "../../utils/helpers";

const useStyles = createUseStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 300,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modal: {
    position: "relative",
    minWidth: 312,
    maxHeight: "calc(100% - 32px)",
  },
  modalEnter: {
    opacity: 1,
    visibility: "visible",
  },
  modalHeader: {
    padding: "20px 24px",
    backgroundColor: (props) => props.themeColor,
  },
  modalTopHeader: {
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
    "&:last-child": {
      marginTop: 4,
    },
  },
  modalFooter: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
  },
  footerButton: {
    color: (props) => props.themeColor,
    padding: "8px 12px",
  },
  divider: {
    flex: 1,
  },
  marginLeft: {
    marginLeft: 12,
  },
  disableButton: {
    color: "rgba(0, 0, 0, 0.3) !important",
  },
});

const PickerView = (props) => {
  const {
    themeColor,
    textColor,
    variant,
    value,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    disableYearAnimation,
    disableSecond,
    show,
    clearable,
    onChange,
    onClose,
  } = props;
  const modes =
    variant === "date" ? [...new Set(props.modes)] : ["year", "date"];
  const timeModes = disableSecond
    ? ["hour", "minute"]
    : ["hour", "minute", "second"];
  const classes = useStyles({ themeColor, textColor });
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : minDate ? new Date(minDate) : new Date()
  );
  const [mode, setMode] = useState(modes.length > 0 ? modes[0] : "date");
  const [timeMode, setTimeMode] = useState(timeModes[0]);
  const [display, setDisplay] = useState(variant === "time" ? "time" : "date");

  const handleDisablePick = () => {
    const tempSelectedDate = startOfDay(selectedDate);
    const tempCurrentDate = startOfDay(new Date());
    const tempMinDate = minDate ? startOfDay(minDate) : null;
    const tempMaxDate = maxDate ? startOfDay(maxDate) : null;
    return (
      (disablePast && isBefore(tempSelectedDate, tempCurrentDate)) ||
      (disableFuture && isAfter(tempSelectedDate, tempCurrentDate)) ||
      (tempMinDate && isBefore(tempSelectedDate, tempMinDate)) ||
      (tempMaxDate && isAfter(tempSelectedDate, tempMaxDate))
    );
  };

  const findMode = (modeValue) => {
    return modes.reduce(
      (result, value, index) => (modeValue === value ? index : result),
      -1
    );
  };

  const handleSelect = (date) => {
    const modeIndex = findMode(mode);
    if (modeIndex !== -1 && modeIndex < modes.length - 1) {
      setMode(modes[modeIndex + 1]);
    }

    return setSelectedDate(date);
  };

  const handlePick = () => {
    onChange(new Date(selectedDate));
    onClose();
  };

  useEffect(() => {
    setMode(modes[0]);
    setTimeMode(timeModes[0]);
  }, [display]);

  useEffect(() => {
    if (
      modes.length > 3 ||
      modes.filter(
        (value) => value !== "year" && value !== "month" && value !== "date"
      ).length > 0
    ) {
      throw new Error(
        "Invalid mode value. Only 'year', 'month', 'date' or combination of it"
      );
    }
  }, [modes]);

  useEffect(() => {
    if (show) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "";
    }
    return () => (document.getElementsByTagName("html")[0].style.overflow = "");
  }, [show]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      timeout={300}
      classNames={{
        enterActive: classes.modalEnter,
        enterDone: classes.modalEnter,
      }}
      unmountOnExit
    >
      <div className={classes.root}>
        <div className={classes.overlay} onClick={() => onClose()} />

        <Paper className={classes.modal}>
          <PickerHeaderDate
            themeColor={themeColor}
            totalMode={modes.length}
            mode={mode}
            selectedDate={selectedDate}
            onChangeMode={setMode}
            disableYear={findMode("year") === -1}
            disableMonth={findMode("month") === -1}
            disableDate={findMode("date") === -1}
            show={variant === "date"}
          />
          <PickerHeaderTime
            themeColor={themeColor}
            mode={timeMode}
            selectedDate={selectedDate}
            onChangeMode={setTimeMode}
            disableSecond={disableSecond}
            show={variant === "time"}
          />
          <PickerHeaderDatetime
            themeColor={themeColor}
            mode={mode}
            timeMode={timeMode}
            display={display}
            selectedDate={selectedDate}
            onChangeMode={setMode}
            onChangeTimeMode={setTimeMode}
            onChangeDisplay={setDisplay}
            disableSecond={disableSecond}
            show={variant === "datetime"}
          />
          <div>
            <PickerYear
              selectedDate={selectedDate}
              color={themeColor}
              minDate={minDate}
              maxDate={maxDate}
              disablePast={disablePast}
              disableFuture={disableFuture}
              disableYearAnimation={disableYearAnimation}
              show={
                mode === "year" &&
                (variant === "date" ||
                  (variant === "datetime" && display === "date"))
              }
              onSelect={handleSelect}
            />
            <PickerMonth
              selectedDate={selectedDate}
              color={themeColor}
              minDate={minDate}
              maxDate={maxDate}
              disablePast={disablePast}
              disableFuture={disableFuture}
              show={mode === "month" && variant === "date"}
              onSelect={handleSelect}
            />
            <PickerCalendar
              key={mode}
              show={
                mode === "date" &&
                (variant === "date" ||
                  (variant === "datetime" && display === "date"))
              }
              selectedDate={selectedDate}
              color={themeColor}
              textColor={textColor}
              minDate={minDate}
              maxDate={maxDate}
              onSelect={handleSelect}
              disablePast={disablePast}
              disableFuture={disableFuture}
            />
            <PickerTime
              themeColor={themeColor}
              show={
                variant === "time" ||
                (variant === "datetime" && display === "time")
              }
            />
          </div>
          <div className={classes.modalFooter}>
            {clearable && (
              <Button
                className={classes.footerButton}
                onClick={() => {
                  onChange("");
                  return onClose();
                }}
              >
                Clear
              </Button>
            )}
            <div className={classes.divider} />
            <Button
              className={renderClassName(
                classes.footerButton,
                classes.marginLeft
              )}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className={renderClassName(
                classes.footerButton,
                classes.marginLeft,
                handleDisablePick() && classes.disableButton
              )}
              onClick={handlePick}
              disable={handleDisablePick()}
            >
              Pick
            </Button>
          </div>
        </Paper>
      </div>
    </CSSTransition>,
    document.getElementsByTagName("body")[0]
  );
};

PickerView.defaultProps = {
  themeColor: color.primary,
  textColor: "white",
  variant: "date",
  modes: ["year", "date"],
  disableYearAnimation: true,
  clearable: false,
};

PickerView.propTypes = {
  themeColor: PropTypes.string,
  textColor: PropTypes.string,
  variant: PropTypes.oneOf(["date", "time", "datetime"]),
  modes: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  disableYearAnimation: PropTypes.bool,
  disableSecond: PropTypes.bool,
  show: PropTypes.bool,
  clearable: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default PickerView;
