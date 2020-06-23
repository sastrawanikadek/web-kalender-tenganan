import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Text from "../Text";
import { createUseStyles } from "react-jss";
import { renderClassName } from "../../utils/helpers";
import { isSameMonth, differenceInCalendarMonths, setMonth } from "date-fns";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const useStyles = createUseStyles({
  root: {
    maxHeight: 300,
    maxWidth: 312,
    marginTop: 8,
    marginBottom: 8,
  },
  container: {
    height: 300,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 75,
    width: 104,
    padding: 0,
    borderRadius: 0,
  },
  activeMonth: {
    color: (props) => props.color,
  },
  buttonText: {
    transition: "all 0.3s ease-in-out",
  },
  activeMonthText: {
    fontWeight: "500",
    fontSize: "1.75rem",
    lineHeight: 1.15,
    letterSpacing: 0.5,
  },
});

const PickerMonth = (props) => {
  const {
    selectedDate,
    color,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    show,
    onSelect,
  } = props;
  const classes = useStyles({ color });

  const handleRenderMonth = (monthName, index) => {
    const month = setMonth(selectedDate, index);

    return (
      <Button
        key={`month-${index}`}
        className={renderClassName(
          classes.button,
          isSameMonth(selectedDate, month) && classes.activeMonth
        )}
        onClick={() => onSelect(month)}
        disable={
          (disablePast && differenceInCalendarMonths(month, new Date()) < 0) ||
          (minDate && differenceInCalendarMonths(month, minDate) < 0) ||
          (disableFuture &&
            differenceInCalendarMonths(month, new Date()) > 0) ||
          (maxDate && differenceInCalendarMonths(month, maxDate) > 0)
        }
      >
        <Text
          className={renderClassName(
            classes.buttonText,
            isSameMonth(selectedDate, month) && classes.activeMonthText
          )}
          noMargin
        >
          {monthName}
        </Text>
      </Button>
    );
  };

  return show ? (
    <div className={classes.root}>
      <div className={classes.container}>
        {monthNames.map((month, index) => handleRenderMonth(month, index))}
      </div>
    </div>
  ) : null;
};

PickerMonth.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  color: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  show: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default PickerMonth;
