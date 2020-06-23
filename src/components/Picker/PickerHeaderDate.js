import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/ButtonView";
import Text from "../Text/TextView";
import { createUseStyles } from "react-jss";
import { format } from "date-fns";

const useStyles = createUseStyles({
  modalHeader: {
    padding: "20px 24px",
    backgroundColor: (props) => props.themeColor,
  },
  headerButton: {
    padding: 0,
    color: "white",
    "&:last-child": {
      marginTop: 4,
    },
  },
});

const PickerHeaderDate = (props) => {
  const {
    themeColor,
    totalMode,
    mode,
    selectedDate,
    onChangeMode,
    disableYear,
    disableMonth,
    disableDate,
    show,
  } = props;
  const classes = useStyles({ themeColor });

  return show ? (
    <div className={classes.modalHeader}>
      {!disableYear && (
        <Button
          className={classes.headerButton}
          onClick={() => onChangeMode("year")}
          fullWidth={totalMode === 1}
        >
          <Text
            variant={totalMode === 1 ? "h3" : "body"}
            color={mode === "year" ? "white" : "rgba(255, 255, 255, 0.7)"}
            noMargin
          >
            {format(selectedDate, "yyyy")}
          </Text>
        </Button>
      )}
      {disableDate && !disableMonth && (
        <Button
          className={classes.headerButton}
          onClick={() => onChangeMode("month")}
          fullWidth={totalMode === 1}
        >
          <Text
            color={mode === "month" ? "white" : "rgba(255, 255, 255, 0.7)"}
            variant="h3"
            noMargin
          >
            {format(selectedDate, "MMMM")}
          </Text>
        </Button>
      )}
      {!disableDate && (
        <Button
          className={classes.headerButton}
          onClick={() => onChangeMode("date")}
          fullWidth={totalMode === 1}
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
    </div>
  ) : null;
};

PickerHeaderDate.propTypes = {
  themeColor: PropTypes.string,
  totalMode: PropTypes.number,
  mode: PropTypes.oneOf(["year", "month", "date"]),
  selectedDate: PropTypes.instanceOf(Date),
  onChangeMode: PropTypes.func,
  disableYear: PropTypes.bool,
  disableMonth: PropTypes.bool,
  disableDate: PropTypes.bool,
  show: PropTypes.bool,
};

export default PickerHeaderDate;
