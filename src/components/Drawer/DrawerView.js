import React from "react";
import PropTypes from "prop-types";
import DrawerDefault from "./DrawerDefault";
import DrawerTemporary from "./DrawerTemporary";
import DrawerPermanent from "./DrawerPermanent";
import DrawerMini from "./DrawerMini";

const DrawerView = (props) => {
  const { variant, ...drawerProps } = props;

  switch (variant) {
    case "default":
      return <DrawerDefault {...drawerProps} />;
    case "temporary":
      return <DrawerTemporary {...drawerProps} />;
    case "permanent":
      return <DrawerPermanent {...drawerProps} />;
    case "mini":
      return <DrawerMini {...drawerProps} />;
    default:
      return <DrawerDefault {...drawerProps} />;
  }
};

DrawerView.defaultProps = {
  variant: "default",
  width: 240,
};

DrawerView.propTypes = {
  /**
   * Variant of Drawer
   */
  variant: PropTypes.oneOf(["default", "temporary", "permanent", "mini"]),

  /**
   * Toggle Drawer open
   */
  show: PropTypes.bool.isRequired,

  /**
   * Width of the Drawer
   */
  width: PropTypes.number,

  /**
   * Pathname from the router props
   */
  pathname: PropTypes.string,

  /**
   * Override default styles with className
   */
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    drawerLocator: PropTypes.string,
    drawerHeader: PropTypes.string,
    drawerBody: PropTypes.string,
    drawerList: PropTypes.string,
    drawerListItem: PropTypes.string,
    drawerItemButton: PropTypes.string,
    drawerItemLink: PropTypes.string,
    drawerItemIcon: PropTypes.string,
    drawerItemText: PropTypes.string,
    drawerItemArrowIcon: PropTypes.string,
    drawerDivider: PropTypes.string,
  }),

  /**
   * Override default styles with style
   */
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    drawerLocator: PropTypes.object,
    drawerHeader: PropTypes.object,
    drawerBody: PropTypes.object,
    drawerList: PropTypes.object,
    drawerListItem: PropTypes.object,
    drawerItemButton: PropTypes.object,
    drawerItemLink: PropTypes.object,
    drawerItemIcon: PropTypes.object,
    drawerItemText: PropTypes.object,
    drawerItemArrowIcon: PropTypes.object,
    drawerDivider: PropTypes.object,
  }),

  /**
   * Event handler onClick at back button
   */
  onClose: PropTypes.func,

  /**
   * MenuList for navigation require array of object:
   * 1. icon    : element of icon
   * 2. label   : string of navigation label
   * 3. to      : string of route
   * 4. divider : boolean of divider
   */
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
      to: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          icon: PropTypes.element,
          to: PropTypes.string,
          children: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string.isRequired,
              icon: PropTypes.element,
              to: PropTypes.string,
              divider: PropTypes.bool,
              exact: PropTypes.bool,
            })
          ),
          divider: PropTypes.bool,
          exact: PropTypes.bool,
        })
      ),
      divider: PropTypes.bool,
      exact: PropTypes.bool,
      hide: PropTypes.bool,
    })
  ).isRequired,
};

export default DrawerView;
