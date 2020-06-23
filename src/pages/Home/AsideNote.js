import React from "react";
import PropTypes from "prop-types";
import Text from "../../components/Text";
import Button from "../../components/Button";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import { createUseStyles } from "react-jss";
import { DISPATCH_SET_VALUE } from "../../utils/constants";

const useStyles = createUseStyles({
  root: {
    marginBottom: 16,
  },
  title: {
    marginTop: 12,
    marginLeft: 24,
    marginRight: 24,
  },
  dateNumber: {
    marginRight: 12,
    width: "auto",
  },
  buttonIcon: {
    marginLeft: 12,
  },
});

const AsideNote = (props) => {
  const { calendar, dispatch } = props;
  const classes = useStyles();

  return calendar.every((item) => item.catatan.length === 0) ? null : (
    <div className={classes.root}>
      <Text variant="title" className={classes.title}>
        Catatan
      </Text>
      {calendar.map((item, index) =>
        item.catatan.length > 0
          ? item.catatan.map((catatan, catatanIndex) => (
              <Button
                key={`calendar-${index}-catatan-${catatanIndex}`}
                onClick={(e) =>
                  dispatch({
                    type: DISPATCH_SET_VALUE,
                    name: "inlineModal",
                    value: {
                      target: e.currentTarget,
                      data: { ...item, ...catatan },
                      mode: "note",
                    },
                  })
                }
                rounded={false}
                fullWidth
              >
                <Text variant="title" className={classes.dateNumber} noMargin>
                  {item.tgl_masehi}
                </Text>
                <Text variant="paragraph" align="left" noMargin noWrap>
                  {catatan.judul}
                </Text>
                <div className={classes.buttonIcon}>
                  <ChevronRightIcon color="#66788A" />
                </div>
              </Button>
            ))
          : null
      )}
    </div>
  );
};

AsideNote.propTypes = {
  calendar: PropTypes.array.isRequired,
  dispatch: PropTypes.any.isRequired,
};

export default AsideNote;
