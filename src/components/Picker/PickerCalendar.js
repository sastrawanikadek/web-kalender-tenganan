import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton";
import Text from "../Text";
import PickerCalendarHeader from "./PickerCalendarHeader";
import { CSSTransition } from "react-transition-group";
import { renderClassName } from "../../utils/helpers";
import {
  lastDayOfMonth,
  subMonths,
  addMonths,
  isAfter,
  isBefore,
  startOfDay,
  setDate,
  startOfMonth,
  isEqual,
} from "date-fns";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  calendarWeek: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
  },
  calendarDay: {
    width: 36,
    height: 36,
    margin: "0 2px",
    textAlign: "center",
    padding: 0,
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
  },
  selectedCalendarDay: {
    backgroundColor: (props) => props.color,
    color: (props) => props.textColor,
  },
  calendarExit: {
    transform: "translateX(0)",
  },
  leftSlideExit: {
    transform: "translateX(200%)",
    transition: "transform 0.2s ease-in-out",
    willChange: "transform",
  },
  rightSlideExit: {
    transform: "translateX(-200%)",
    transition: "transform 0.2s ease-in-out",
    willChange: "transform",
  },
  leftSlideEnter: {
    transform: "translateX(-100%)",
  },
  rightSlideEnter: {
    transform: "translateX(100%)",
  },
  calendarEnter: {
    transform: "translateX(0)",
    transition: "transform 0.2s ease-in-out",
    willChange: "transform",
  },
});

const PickerCalendar = (props) => {
  const {
    selectedDate,
    color,
    textColor,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    show,
    onSelect,
  } = props;
  const classes = useStyles({ color, textColor });
  const [calendar, setCalendar] = useState(selectedDate);
  const [slide, setSlide] = useState("left");
  const [move, setMove] = useState(true);

  const handlePrevMonth = () => {
    setCalendar((prevState) => subMonths(prevState, 1));
    setSlide("left");
    setMove(false);
  };

  const handleNextMonth = () => {
    setCalendar((prevState) => addMonths(prevState, 1));
    setSlide("right");
    setMove(false);
  };

  const handleRenderDate = (weekIndex, dayIndex) => {
    const index = weekIndex * 7 + dayIndex;
    const firstDay = startOfMonth(calendar).getDay();
    const lastDate = lastDayOfMonth(calendar).getDate();
    const tempSelectedDate = startOfDay(selectedDate);
    const tempCalendarDate = startOfDay(
      setDate(calendar, index + 1 - firstDay)
    );
    const tempCurrentDate = startOfDay(new Date());
    const tempMinDate = minDate ? startOfDay(minDate) : null;
    const tempMaxDate = maxDate ? startOfDay(maxDate) : null;

    if (index < firstDay || index + 1 - firstDay > lastDate) {
      return (
        <div
          key={`date-${weekIndex}${dayIndex}`}
          className={classes.calendarDay}
        />
      );
    }

    return (
      <IconButton
        key={`date-${weekIndex}${dayIndex}`}
        className={renderClassName(
          classes.calendarDay,
          isEqual(tempSelectedDate, tempCalendarDate) &&
            classes.selectedCalendarDay
        )}
        onClick={() => onSelect(tempCalendarDate)}
        disable={
          (disablePast && isBefore(tempCalendarDate, tempCurrentDate)) ||
          (disableFuture && isAfter(tempCalendarDate, tempCurrentDate)) ||
          (tempMinDate && isBefore(tempCalendarDate, tempMinDate)) ||
          (tempMaxDate && isAfter(tempCalendarDate, tempMaxDate))
        }
      >
        <Text variant="paragraph" noMargin>
          {index + 1 - firstDay}
        </Text>
      </IconButton>
    );
  };

  return show ? (
    <div>
      <PickerCalendarHeader
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
          exitActive: classes[`${slide}SlideExit`],
        }}
        onExited={() => setMove(true)}
        unmountOnExit
      >
        <div>
          {[...new Array(6)].map((weekValue, weekIndex) => (
            <div key={`week-${weekIndex}`} className={classes.calendarWeek}>
              {[...new Array(7)].map((dayValue, dayIndex) =>
                handleRenderDate(weekIndex, dayIndex)
              )}
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  ) : null;
};

PickerCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  color: PropTypes.string,
  textColor: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  show: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default PickerCalendar;
