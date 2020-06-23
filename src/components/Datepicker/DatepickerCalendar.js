import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton";
import Text from "../Text";
import DatepickerCalendarHeader from "./DatepickerCalendarHeader";
import { CSSTransition } from "react-transition-group";
import { renderClassName } from "../../utils/helpers";
import {
  lastDayOfMonth,
  subMonths,
  addMonths,
  compareAsc,
  isAfter,
  isBefore
} from "date-fns";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
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
    padding: 0,
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out"
  },
  selectedCalendarDay: {
    backgroundColor: props => props.color,
    color: props => props.textColor
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

const DatepickerCalendar = props => {
  const {
    selectedDate,
    color,
    textColor,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    show,
    onSelect
  } = props;
  const classes = useStyles({ color, textColor });
  const [calendar, setCalendar] = useState(selectedDate);
  const [slide, setSlide] = useState("left");
  const [move, setMove] = useState(true);
  const dayOfLastDayPrevMonth = lastDayOfMonth(subMonths(calendar, 1)).getDay();

  const handlePrevMonth = () => {
    setCalendar(prevState => subMonths(prevState, 1));
    setSlide("left");
    setMove(false);
  };

  const handleNextMonth = () => {
    setCalendar(prevState => addMonths(prevState, 1));
    setSlide("right");
    setMove(false);
  };

  return show ? (
    <div>
      <DatepickerCalendarHeader
        calendar={calendar}
        slide={slide}
        minDate={minDate}
        maxDate={maxDate}
        disablePast={disablePast}
        disableFuture={disableFuture}
        move={move}
        onPrevious={handlePrevMonth}
        onNext={handleNextMonth}
        onMove={setMove}
      />
      <CSSTransition
        in={move}
        timeout={200}
        classNames={{
          enter: classes[`${slide}SlideEnter`],
          enterActive: classes.calendarEnter,
          exit: classes.calendarExit,
          exitActive: classes[`${slide}SlideExit`]
        }}
        onExited={() => setMove(true)}
        unmountOnExit
      >
        <div>
          {[...new Array(6)].map((weekValue, weekIndex) => (
            <div key={`week-${weekIndex}`} className={classes.calendarWeek}>
              {[...new Array(7)].map((dayValue, dayIndex) => {
                const dateNumber = weekIndex * 7 + (dayIndex + 1);
                const tempSelectedDate = new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate()
                );
                const tempCalendarWithPrevMonth = new Date(
                  calendar.getFullYear(),
                  calendar.getMonth(),
                  dateNumber - (dayOfLastDayPrevMonth + 1)
                );
                const tempCalendarWithoutPrevMonth = new Date(
                  calendar.getFullYear(),
                  calendar.getMonth(),
                  dateNumber
                );
                const currentDate = new Date();
                const tempCurrentDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  currentDate.getDate()
                );
                const tempMinDate = minDate
                  ? typeof minDate === "number"
                    ? new Date(
                        new Date(minDate).getFullYear(),
                        new Date(minDate).getMonth(),
                        new Date(minDate).getDate()
                      )
                    : new Date(
                        minDate.getFullYear(),
                        minDate.getMonth(),
                        minDate.getDate()
                      )
                  : null;
                const tempMaxDate = maxDate
                  ? typeof maxDate === "number"
                    ? new Date(
                        new Date(maxDate).getFullYear(),
                        new Date(maxDate).getMonth(),
                        new Date(maxDate).getDate()
                      )
                    : new Date(
                        maxDate.getFullYear(),
                        maxDate.getMonth(),
                        maxDate.getDate()
                      )
                  : null;

                if (dayOfLastDayPrevMonth < 6) {
                  if (
                    dateNumber - (dayOfLastDayPrevMonth + 1) > 0 &&
                    dateNumber - (dayOfLastDayPrevMonth + 1) <=
                      lastDayOfMonth(calendar).getDate()
                  ) {
                    return (
                      <IconButton
                        key={`date-${weekIndex}${dayIndex}`}
                        className={renderClassName(
                          classes.calendarDay,
                          compareAsc(
                            tempSelectedDate,
                            tempCalendarWithPrevMonth
                          ) === 0 && classes.selectedCalendarDay
                        )}
                        onClick={() => onSelect(tempCalendarWithPrevMonth)}
                        disable={
                          (disablePast &&
                            isBefore(
                              tempCalendarWithPrevMonth,
                              tempCurrentDate
                            )) ||
                          (disableFuture &&
                            isAfter(
                              tempCalendarWithPrevMonth,
                              tempCurrentDate
                            )) ||
                          (tempMinDate &&
                            isBefore(tempCalendarWithPrevMonth, tempMinDate)) ||
                          (tempMaxDate &&
                            isAfter(tempCalendarWithPrevMonth, tempMaxDate))
                        }
                      >
                        <Text variant="paragraph" noMargin>
                          {dateNumber - (dayOfLastDayPrevMonth + 1)}
                        </Text>
                      </IconButton>
                    );
                  }

                  return (
                    <div
                      key={`date-${weekIndex}${dayIndex}`}
                      className={classes.calendarDay}
                    />
                  );
                }

                if (dateNumber <= lastDayOfMonth(calendar).getDate()) {
                  return (
                    <IconButton
                      key={`date-${weekIndex}${dayIndex}`}
                      className={renderClassName(
                        classes.calendarDay,
                        compareAsc(
                          tempSelectedDate,
                          tempCalendarWithoutPrevMonth
                        ) === 0 && classes.selectedCalendarDay
                      )}
                      onClick={() => onSelect(tempCalendarWithoutPrevMonth)}
                      disable={
                        (disablePast &&
                          isBefore(
                            tempCalendarWithoutPrevMonth,
                            tempCurrentDate
                          )) ||
                        (disableFuture &&
                          isAfter(
                            tempCalendarWithoutPrevMonth,
                            tempCurrentDate
                          )) ||
                        (tempMinDate &&
                          isBefore(
                            tempCalendarWithoutPrevMonth,
                            tempMinDate
                          )) ||
                        (tempMaxDate &&
                          isAfter(tempCalendarWithoutPrevMonth, tempMaxDate))
                      }
                    >
                      <Text variant="paragraph" noMargin>
                        {dateNumber}
                      </Text>
                    </IconButton>
                  );
                }

                return (
                  <div
                    key={`date-${weekIndex}${dayIndex}`}
                    className={classes.calendarDay}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  ) : null;
};

DatepickerCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  color: PropTypes.string,
  textColor: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  show: PropTypes.bool,
  onSelect: PropTypes.func
};

export default DatepickerCalendar;
