import React, { Fragment } from "react";
import Grid from "../../components/Grid";
import Text from "../../components/Text";
import { DAYS } from "../../utils/constants";
import { createUseStyles } from "react-jss";
import { renderClassName } from "../../utils/helpers";

const useStyles = createUseStyles({
  gridDay: {
    borderBottom: "1px solid #dadce0",
    borderRight: "1px solid #dadce0",
  },
  dayName: {
    fontWeight: "700",
    fontSize: "0.75rem",
    display: "block",
  },
  sunday: {
    color: "red",
  },
});

const CalendarDay = () => {
  const classes = useStyles();

  return (
    <Fragment>
      {DAYS.map((value, index) => (
        <Grid
          type="item"
          className={classes.gridDay}
          xs={12 / 7}
          key={`day-${index}`}
          padding={2}
        >
          <Text
            variant="button"
            align="center"
            className={renderClassName(
              classes.dayName,
              index + 1 === DAYS.length && classes.sunday
            )}
            noMargin
          >
            {value}
          </Text>
        </Grid>
      ))}
    </Fragment>
  );
};

export default CalendarDay;
