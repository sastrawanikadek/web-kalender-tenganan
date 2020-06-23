import React from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton";
import Text from "../Text";
import ChevronLeftIcon from "mdi-react/ChevronLeftIcon";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import { createUseStyles } from "react-jss";
import { CSSTransition } from "react-transition-group";
import { format, differenceInCalendarMonths } from "date-fns";

const weeksName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const useStyles = createUseStyles({
  calendarHeader: {
    display: "flex",
    alignItems: "center",
    margin: "8px 0"
  },
  calendarHeaderText: {
    flex: 1,
    overflow: "hidden"
  },
  calendarWeek: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px"
  },
  calendarDay: {
    width: 36,
    height: 36,
    margin: "0 2px",
    textAlign: "center",
    padding: 0
  },
  calendarExit: {
    transform: "translateX(0)"
  },
  leftSlideExit: {
    transform: "translateX(200%)",
    transition: "transform 0.2s ease-in-out",
    willChange: "transform"
  },
  rightSlideExit: {
    transform: "translateX(-200%)",
    transition: "transform 0.2s ease-in-out",
    willChange: "transform"
  },
  leftSlideEnter: {
    transform: "translateX(-100%)"
  },
  rightSlideEnter: {
    transform: "translateX(100%)"
  },
  calendarEnter: {
    transform: "translateX(0)",
    transition: "transform 0.2s ease-in-out",
    willChange: "transform"
  }
});

const DatepickerCalendarHeader = props => {
  const {
    calendar,
    slide,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    move,
    onPrevious,
    onNext,
    onMove
  } = props;
  const classes = useStyles();
  return (
    <div>
      <div className={classes.calendarHeader}>
        <IconButton
          disable={
            (disablePast &&
              differenceInCalendarMonths(calendar, new Date()) <= 0) ||
            (minDate && differenceInCalendarMonths(calendar, minDate) <= 0)
          }
          onClick={onPrevious}
        >
          <ChevronLeftIcon color="rgba(0, 0, 0, 0.55)" />
        </IconButton>
        <div className={classes.calendarHeaderText}>
          <CSSTransition
            in={move}
            timeout={200}
            classNames={{
              enter: classes[`${slide}SlideEnter`],
              enterActive: classes.calendarEnter,
              exit: classes.calendarExit,
              exitActive: classes[`${slide}SlideExit`]
            }}
            onExited={() => onMove(true)}
            unmountOnExit
          >
            <Text align="center" noMargin>
              {format(calendar, "MMMM yyyy")}
            </Text>
          </CSSTransition>
        </div>
        <IconButton
          disable={
            (disableFuture &&
              differenceInCalendarMonths(calendar, new Date()) >= 0) ||
            (maxDate && differenceInCalendarMonths(calendar, maxDate) >= 0)
          }
          onClick={onNext}
        >
          <ChevronRightIcon color="rgba(0, 0, 0, 0.55)" />
        </IconButton>
      </div>
      <div className={classes.calendarWeek}>
        {weeksName.map((week, index) => (
          <Text
            key={`${week}-${index}`}
            className={classes.calendarDay}
            color="rgba(0, 0, 0, 0.55)"
            variant="caption"
            noMargin
          >
            {week}
          </Text>
        ))}
      </div>
    </div>
  );
};

DatepickerCalendarHeader.propTypes = {
  calendar: PropTypes.instanceOf(Date),
  slide: PropTypes.oneOf(["left", "right"]),
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  move: PropTypes.bool,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onMove: PropTypes.func
};

export default DatepickerCalendarHeader;
