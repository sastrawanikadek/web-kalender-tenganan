import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Text from "../Text";
import { createUseStyles } from "react-jss";
import { renderClassName } from "../../utils/helpers";
import { isSameMonth, differenceInCalendarMonths } from "date-fns";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Oct",
  "Nov",
  "Des",
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

const DatepickerMonth = (props) => {
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
  return show ? (
    <div className={classes.root}>
      <div className={classes.container}>
        {monthNames.map((month, index) => (
          <Button
            key={`month-${index}`}
            className={renderClassName(
              classes.button,
              isSameMonth(
                selectedDate,
                new Date(selectedDate.getFullYear(), index)
              ) && classes.activeMonth
            )}
            onClick={() => onSelect(new Date(selectedDate.setMonth(index)))}
            disable={
              (disablePast &&
                differenceInCalendarMonths(
                  new Date(selectedDate.getFullYear(), index),
                  new Date()
                ) < 0) ||
              (minDate &&
                differenceInCalendarMonths(
                  new Date(selectedDate.getFullYear(), index),
                  minDate
                ) < 0) ||
              (disableFuture &&
                differenceInCalendarMonths(
                  new Date(selectedDate.getFullYear(), index),
                  new Date()
                ) > 0) ||
              (maxDate &&
                differenceInCalendarMonths(
                  new Date(selectedDate.getFullYear(), index),
                  maxDate
                ) > 0)
            }
          >
            <Text
              className={renderClassName(
                classes.buttonText,
                isSameMonth(
                  selectedDate,
                  new Date(selectedDate.getFullYear(), index)
                ) && classes.activeMonthText
              )}
              noMargin
            >
              {month}
            </Text>
          </Button>
        ))}
      </div>
    </div>
  ) : null;
};

DatepickerMonth.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  color: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  show: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default DatepickerMonth;
