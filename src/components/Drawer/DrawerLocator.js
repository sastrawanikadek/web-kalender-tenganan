import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { color } from "../../utils/theme";
import { renderClassName, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  drawerLocator: {
    position: "absolute",
    width: props => (props.show ? 4 : 2),
    right: props => (props.show ? 16 : 0),
    backgroundColor: color.primary,
    zIndex: 1,
    transition:
      "top 0.3s ease-in-out, height 0.3s ease-in-out, width 0.3s ease-in-out, right 0.3s ease-in-out"
  }
});

const DrawerLocator = props => {
  const { show, location, style, className, pathname } = props;
  const classes = useStyles({ show });

  return pathname ? (
    <div
      className={renderClassName(classes.drawerLocator, className)}
      style={renderStyle(
        {
          top: location.top,
          height: location.height
        },
        style
      )}
    />
  ) : null;
};

DrawerLocator.propTypes = {
  show: PropTypes.bool.isRequired,
  location: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  pathname: PropTypes.string
};

export default DrawerLocator;
