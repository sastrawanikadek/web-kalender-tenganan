import React from "react";
import PropTypes from "prop-types";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  start: {
    marginRight: 8,
    display: "inline-flex"
  },
  end: {
    marginLeft: 8,
    marginRight: 12,
    display: "inline-flex"
  }
});

const SelectExtra = props => {
  const { position, icon, className, style } = props;
  const classes = useStyles();

  return position === "end" || (icon && icon[position]) ? (
    <div
      className={renderClassName(classes[position], className)}
      style={renderStyle(style)}
    >
      {icon && icon[position] ? (
        icon[position]
      ) : (
        <ChevronDownIcon color="#A7A7A7" />
      )}
    </div>
  ) : null;
};

SelectExtra.propTypes = {
  position: PropTypes.oneOf(["start", "end"]),
  icon: PropTypes.shape({
    start: PropTypes.element,
    end: PropTypes.element
  }),
  className: PropTypes.string,
  style: PropTypes.object
};

export default SelectExtra;
