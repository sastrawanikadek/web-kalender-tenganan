import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import {
  renderClassName,
  renderStyle,
  validateSelectValue,
} from "../../utils/helpers";

const useStyles = createUseStyles({
  legend: {
    height: 3,
    transition: "width 0.3s ease-in-out",
  },
});

const SelectLegend = (props) => {
  const { width, value, className, style, focus, multiple, empty } = props;
  const classes = useStyles();

  return (
    <legend
      className={renderClassName(classes.legend, className)}
      style={renderStyle(
        {
          width:
            focus || empty || validateSelectValue(multiple, value) ? width : 0,
        },
        style
      )}
    />
  );
};

SelectLegend.propTypes = {
  width: PropTypes.number,
  value: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  focus: PropTypes.bool,
  multiple: PropTypes.bool,
  empty: PropTypes.bool,
};

export default SelectLegend;
