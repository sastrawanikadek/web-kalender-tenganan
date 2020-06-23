import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Text from "../Text";
import { createUseStyles } from "react-jss";
import { isSameYear, differenceInCalendarYears } from "date-fns";
import { renderClassName } from "../../utils/helpers";

const startYear = 1900;
const intervalYear = 201;

const useStyles = createUseStyles({
  root: {
    maxHeight: 300,
    marginTop: 8,
    marginBottom: 8
  },
  container: {
    height: 300,
    overflowY: "auto"
  },
  button: {
    borderRadius: 0,
    transition: "color 0.3s ease-in-out"
  },
  activeYear: {
    color: props => props.color
  },
  buttonText: {
    transition: "all 0.3s ease-in-out"
  },
  activeYearText: {
    fontWeight: "500",
    fontSize: "1.75rem",
    lineHeight: 1.15,
    letterSpacing: 0.5
  }
});

const DatepickerYear = props => {
  const {
    selectedDate,
    color,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    disableYearAnimation,
    show,
    onSelect
  } = props;
  const classes = useStyles({ color });
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({
        behavior: disableYearAnimation ? "auto" : "smooth",
        block: "center"
      });
    }
  }, [show, disableYearAnimation]);

  return show ? (
    <div className={classes.root}>
      <div className={classes.container}>
        {[...new Array(intervalYear)].map((value, index) => (
          <div
            key={`year-${index}`}
            ref={
              isSameYear(selectedDate, new Date(startYear + index, 0))
                ? buttonRef
                : null
            }
          >
            {(disablePast &&
              differenceInCalendarYears(
                new Date(startYear + index, 0),
                new Date()
              ) < 0) ||
            (minDate &&
              differenceInCalendarYears(
                new Date(startYear + index, 0),
                minDate
              ) < 0) ||
            (disableFuture &&
              differenceInCalendarYears(
                new Date(startYear + index, 0),
                new Date()
              ) > 0) ||
            (maxDate &&
              differenceInCalendarYears(
                new Date(startYear + index, 0),
                maxDate
              ) > 0) ? null : (
              <Button
                className={renderClassName(
                  classes.button,
                  isSameYear(selectedDate, new Date(startYear + index, 0)) &&
                    classes.activeYear
                )}
                onClick={() =>
                  onSelect(
                    new Date(selectedDate.setFullYear(startYear + index))
                  )
                }
                fullWidth
              >
                <Text
                  className={renderClassName(
                    classes.buttonText,
                    isSameYear(selectedDate, new Date(startYear + index, 0)) &&
                      classes.activeYearText
                  )}
                  noMargin
                >
                  {startYear + index}
                </Text>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

DatepickerYear.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  color: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  disableYearAnimation: PropTypes.bool,
  show: PropTypes.bool,
  onSelect: PropTypes.func
};

export default DatepickerYear;
