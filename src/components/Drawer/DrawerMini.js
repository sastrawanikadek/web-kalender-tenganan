import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DrawerLocator from "./DrawerLocator";
import DrawerHeader from "./DrawerHeader";
import DrawerList from "./DrawerList";
import { useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  root: {
    height: "100%",
    width: (props) => props.width,
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: "#FFFFFF",
    position: "fixed",
    borderRight: "1px solid #ddd",
    transition: "width 0.3s ease-in-out",
  },
  drawerBody: {
    padding: 16,
    paddingRight: (props) => (props.show ? 16 : 0),
  },
});

const DrawerMini = (props) => {
  const { menuList, classNameOptions, styleOptions, show, width } = props;
  const classes = useStyles({ show, width });
  const [location, setLocation] = useState({
    top: 0,
    height: 0,
  });
  const locationRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (locationRef.current) {
      setLocation({
        top: locationRef.current.offsetTop,
        height: locationRef.current.offsetHeight,
      });
    }
  }, [locationRef, pathname]);

  return (
    <div
      className={renderClassName(
        classes.root,
        classNameOptions && classNameOptions.root
      )}
      style={renderStyle(styleOptions && styleOptions.root)}
    >
      <DrawerLocator
        show={show}
        location={location}
        pathname={pathname}
        className={renderClassName(
          classNameOptions && classNameOptions.drawerLocator
        )}
        style={renderStyle(styleOptions && styleOptions.drawerLocator)}
      />
      <DrawerHeader
        className={renderClassName(
          classNameOptions && classNameOptions.drawerHeader
        )}
        style={renderStyle(styleOptions && styleOptions.drawerHeader)}
      />
      <div
        className={renderClassName(
          classes.drawerBody,
          classNameOptions && classNameOptions.drawerBody
        )}
        style={renderStyle(styleOptions && styleOptions.drawerBody)}
      >
        <DrawerList
          classNameOptions={{
            drawerList: classNameOptions && classNameOptions.drawerList,
            drawerListItem: classNameOptions && classNameOptions.drawerListItem,
            drawerItemButton:
              classNameOptions && classNameOptions.drawerItemButton,
            drawerItemLink: classNameOptions && classNameOptions.drawerItemLink,
            drawerItemIcon: classNameOptions && classNameOptions.drawerItemIcon,
            drawerItemText: classNameOptions && classNameOptions.drawerItemText,
            drawerItemArrowIcon:
              classNameOptions && classNameOptions.drawerItemArrowIcon,
            drawerDivider: classNameOptions && classNameOptions.drawerDivider,
          }}
          styleOptions={{
            drawerList: styleOptions && styleOptions.drawerList,
            drawerListItem: styleOptions && styleOptions.drawerListItem,
            drawerItemButton: styleOptions && styleOptions.drawerItemButton,
            drawerItemLink: styleOptions && styleOptions.drawerItemLink,
            drawerItemIcon: styleOptions && styleOptions.drawerItemIcon,
            drawerItemText: styleOptions && styleOptions.drawerItemText,
            drawerItemArrowIcon:
              styleOptions && styleOptions.drawerItemArrowIcon,
            drawerDivider: styleOptions && styleOptions.drawerDivider,
          }}
          menuList={menuList}
          location={locationRef}
          nestNumber={0}
          pathname={pathname}
          show={show}
        />
      </div>
    </div>
  );
};

DrawerMini.propTypes = {
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
  show: PropTypes.bool.isRequired,
  width: PropTypes.number,
  pathname: PropTypes.string,
};

export default DrawerMini;
