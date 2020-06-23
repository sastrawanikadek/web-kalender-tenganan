import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  legend: {
    height: 3,
    transition: "width 0.3s ease-in-out"
  }
});

const TextInputLegend = props => {
  const { focus, value, extra, type, className, style, width } = props;
  const classes = useStyles();

  return (
    <legend
      className={renderClassName(classes.legend, className)}
      style={renderStyle(
        {
          width:
            focus ||
            value ||
            value === 0 ||
            type === "file" ||
            (extra && extra.start)
              ? width
              : 0
        },
        style
      )}
    />
  );
};

TextInputLegend.propTypes = {
  focus: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
  extra: PropTypes.shape({
    start: PropTypes.element,
    end: PropTypes.element
  }),
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "tel",
    "date",
    "file",
    "currency",
    "url"
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number
};

export default TextInputLegend;
