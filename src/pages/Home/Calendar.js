import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "../../components/Grid";
import Text from "../../components/Text";
import IconButton from "../../components/IconButton";
import Tooltip from "../../components/Tooltip";
import { renderClassName } from "../../utils/helpers";
import { createUseStyles } from "react-jss";
import { format, lastDayOfMonth } from "date-fns";
import { id } from "date-fns/locale";
import CalendarDay from "./CalendarDay";
import { SASIH_DATE_TYPE, SASIH } from "../../utils/constants";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  gridItem: {
    position: "relative",
    borderBottom: "1px solid #dadce0",
    borderRight: "1px solid #dadce0",
    minHeight: (window.innerHeight - 64 - 34.6) / 6,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dateSasih: {
    fontSize: "0.75rem",
  },
  dateButton: {
    height: 48,
    width: 48,
    padding: 0,
    marginBottom: 8,
  },
  dateNumber: {
    textAlign: "center",
    fontWeight: "500",
  },
  inactiveDate: {
    color: "gray",
  },
  sundayDate: {
    color: "red",
  },
  datePurnama: {
    position: "absolute",
    top: "calc(50% - 20px)",
    left: "calc(50% + 16px)",
    height: 12,
    width: 12,
    backgroundColor: color.accent,
    borderRadius: "50%",
  },
  dateTilem: {
    position: "absolute",
    top: "calc(50% - 20px)",
    left: "calc(50% + 16px)",
    height: 12,
    width: 12,
    backgroundColor: "black",
    borderRadius: "50%",
  },
});

const Calendar = (props) => {
  const { calendar, date, onClick, isLoggedIn } = props;
  const classes = useStyles();
  const prevMonthDay =
    (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  const currentMonthDate = lastDayOfMonth(date).getDate();
  const nextMonthDay = 42 - prevMonthDay - currentMonthDate;

  return (
    <Grid type="container" padding={0}>
      <Fragment>
        <CalendarDay />
        {[...Array(prevMonthDay)].map((value, index, array) => (
          <Grid
            type="item"
            className={classes.gridItem}
            xs={12 / 7}
            key={`prev-item-${index}`}
            padding={2}
          >
            <div />
          </Grid>
        ))}
        {[...Array(currentMonthDate)].map((value, index) => (
          <Grid
            type="item"
            className={classes.gridItem}
            xs={12 / 7}
            key={`item-${index}`}
            padding={2}
          >
            {calendar[index] && (
              <Text
                variant="caption"
                align="center"
                className={classes.dateSasih}
              >
                {`${
                  SASIH_DATE_TYPE[parseInt(calendar[index].jenis_tgl_sasih)]
                } ${calendar[index].tgl_sasih}`}
              </Text>
            )}
            <Tooltip
              content={format(
                new Date(date.getFullYear(), date.getMonth(), index + 1),
                "dd MMMM yyyy",
                { locale: id }
              )}
            >
              <IconButton
                onClick={() => (isLoggedIn ? onClick(calendar[index]) : null)}
                className={classes.dateButton}
              >
                <Text
                  variant="h6"
                  className={renderClassName(
                    classes.dateNumber,
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      index + 1
                    ).getDay() === 0 && classes.sundayDate
                  )}
                  noMargin
                >
                  {index + 1}
                </Text>
              </IconButton>
            </Tooltip>
            {calendar[index] && (
              <Text
                variant="caption"
                align="center"
                className={classes.dateSasih}
                noMargin
              >
                {`${SASIH[parseInt(calendar[index].id_sasih)]} ${
                  calendar[index].saka
                }`}
              </Text>
            )}
            {calendar[index] &&
              (calendar[index].purnama || calendar[index].tilem) && (
                <Tooltip
                  content={calendar[index].purnama ? "Purnama" : "Tilem"}
                >
                  <div
                    className={
                      calendar[index].purnama
                        ? classes.datePurnama
                        : classes.dateTilem
                    }
                  />
                </Tooltip>
              )}
          </Grid>
        ))}
        {[...Array(nextMonthDay)].map((value, index) => (
          <Grid
            type="item"
            className={classes.gridItem}
            xs={12 / 7}
            key={`next-item-${index}`}
            padding={2}
          >
            <div />
          </Grid>
        ))}
      </Fragment>
    </Grid>
  );
};

Calendar.propTypes = {
  calendar: PropTypes.array.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Calendar;
