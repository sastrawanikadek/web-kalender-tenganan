import React from "react";
import PropTypes from "prop-types";
import Text from "../../components/Text";
import Button from "../../components/Button";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import { createUseStyles } from "react-jss";
import { DISPATCH_SET_VALUE } from "../../utils/constants";

const useStyles = createUseStyles({
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

const AsideCeremony = (props) => {
  const { calendar, dispatch } = props;
  const classes = useStyles();

  return (
    <div>
      <Text variant="title" className={classes.title}>
        Upacara
      </Text>
      {calendar.map((item, index) =>
        item.upacara.length > 0
          ? item.upacara.map((upacara, upacaraIndex) => (
              <Button
                key={`calendar-${index}-upacara-${upacaraIndex}`}
                onClick={(e) =>
                  dispatch({
                    type: DISPATCH_SET_VALUE,
                    name: "inlineModal",
                    value: {
                      target: e.currentTarget,
                      data: { ...item, ...upacara },
                      mode: "ceremony",
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
                  {upacara.upacara}
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

AsideCeremony.propTypes = {
  calendar: PropTypes.array.isRequired,
  dispatch: PropTypes.any.isRequired,
};

export default AsideCeremony;
