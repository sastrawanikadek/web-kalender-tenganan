import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Text from "../Text";
import { createUseStyles } from "react-jss";
import { color } from "../../utils/theme";
import { renderClassName, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  drawerItemLink: {
    padding: "12px 6px",
    paddingLeft: props =>
      props.show ? props.nestNumber * 8 : props.nestNumber * 2,
    paddingRight: props => (props.show ? 6 : 24),
    justifyContent: "flex-start",
    width: "100%",
    boxSizing: "border-box"
  },
  drawerItemIcon: {
    display: "inline-flex",
    marginLeft: 8,
    marginRight: 24
  },
  drawerItemText: {
    fontWeight: "500",
    textAlign: "left"
  },
  activeNav: {
    color: color.primary,
    backgroundColor: "#FAFAFA"
  },
  inactiveNav: {
    color: "#66788A"
  }
});

const DrawerItemLink = props => {
  const {
    classNameOptions,
    styleOptions,
    icon,
    nestNumber,
    label,
    to,
    active,
    show
  } = props;
  const classes = useStyles({ nestNumber, show });

  return (
    <Button
      component="a"
      href={to}
      className={renderClassName(
        classes.drawerItemLink,
        active ? classes.activeNav : classes.inactiveNav,
        classNameOptions && classNameOptions.drawerItemLink
      )}
      style={renderStyle(styleOptions && styleOptions.drawerItemLink)}
      rounded={false}
    >
      <div
        className={renderClassName(
          classes.drawerItemIcon,
          classNameOptions && classNameOptions.drawerItemIcon
        )}
        style={renderStyle(styleOptions && styleOptions.drawerItemIcon)}
      >
        {icon}
      </div>
      <Text
        variant="caption"
        className={renderClassName(
          classes.drawerItemText,
          classNameOptions && classNameOptions.drawerItemText
        )}
        style={renderStyle(styleOptions && styleOptions.drawerItemText)}
        noMargin
        noWrap
      >
        {label}
      </Text>
    </Button>
  );
};

DrawerItemLink.propTypes = {
  classNameOptions: PropTypes.shape({
    drawerItemLink: PropTypes.string,
    drawerItemIcon: PropTypes.string,
    drawerItemText: PropTypes.string
  }),
  styleOptions: PropTypes.shape({
    drawerItemLink: PropTypes.object,
    drawerItemIcon: PropTypes.object,
    drawerItemText: PropTypes.object
  }),
  icon: PropTypes.element,
  nestNumber: PropTypes.number,
  label: PropTypes.string,
  to: PropTypes.string,
  active: PropTypes.bool,
  show: PropTypes.bool
};

export default DrawerItemLink;
