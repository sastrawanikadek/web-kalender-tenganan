import React from "react";
import PropTypes from "prop-types";
import icons from "./icons";
import { isExistInArray } from "../../utils/helpers";

const IconView = props => {
  const { name, color, fillColor, strokeColor, strokeWidth, size } = props;

  return icons[name] ? (
    <svg
      height={size ? size : icons[name].height}
      width={size ? size : icons[name].width}
      viewBox={icons[name].viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[name].paths.map((path, index) => (
        <path
          key={index}
          d={path}
          fill={
            icons[name].disableFill &&
            isExistInArray(icons[name].disableFill, index)
              ? "transparent"
              : fillColor
              ? fillColor
              : color
              ? color
              : icons[name].fill
              ? icons[name].fill
              : "transparent"
          }
          stroke={
            strokeColor
              ? strokeColor
              : color
              ? color
              : icons[name].strokeColor
              ? icons[name].strokeColor
              : "transparent"
          }
          strokeWidth={
            icons[name].disableStrokeWidth &&
            isExistInArray(icons[name].disableStrokeWidth, index)
              ? 0
              : strokeWidth
              ? strokeWidth
              : icons[name].strokeWidth
              ? icons[name].strokeWidth
              : ""
          }
        />
      ))}
    </svg>
  ) : null;
};

IconView.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  size: PropTypes.number
};

export default IconView;
