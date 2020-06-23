import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  drawerHeader: {
    height: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const DrawerHeader = props => {
  const { children, className, style } = props;
  const classes = useStyles();

  return (
    <div
      className={renderClassName(classes.drawerHeader, className)}
      style={renderStyle(style)}
    >
      {children}
    </div>
  );
};

DrawerHeader.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
};

export default DrawerHeader;
