import React, { Fragment, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Divider from "../Divider";
import { createUseStyles } from "react-jss";
import {
  renderClassName,
  isSameLocation,
  renderStyle,
} from "../../utils/helpers";
import DrawerItemLink from "./DrawerItemLink";
import DrawerItemButton from "./DrawerItemButton";

const useStyles = createUseStyles({
  drawerListItem: {
    display: "flex",
    flexDirection: "column",
  },
});

const DrawerList = (props) => {
  const {
    menuList,
    classNameOptions,
    styleOptions,
    location,
    nestNumber,
    pathname,
    show,
    onChange,
  } = props;
  const listRef = useRef(null);
  const classes = useStyles({ nestNumber, show });

  useEffect(() => {
    if (listRef.current) {
      onChange(listRef.current.scrollHeight);
    }
  }, [listRef, onChange]);

  return (
    <ul
      ref={nestNumber > 0 ? listRef : null}
      className={renderClassName(
        classes.drawerList,
        classNameOptions && classNameOptions.drawerList
      )}
      style={renderStyle(styleOptions && styleOptions.drawerList)}
    >
      {menuList.map(
        (menu, index) =>
          !menu.hide && (
            <Fragment
              key={`drawer-list-${nestNumber}-menu-item-${index}-${menu.label}`}
            >
              <li
                ref={
                  !menu.children &&
                  isSameLocation(menu.to, pathname, menu.exact)
                    ? location
                    : null
                }
                className={renderClassName(
                  classes.drawerListItem,
                  classNameOptions && classNameOptions.drawerListItem
                )}
                style={renderStyle(styleOptions && styleOptions.drawerListItem)}
              >
                {menu.children ? (
                  <DrawerItemButton
                    children={menu.children}
                    classNameOptions={{
                      drawerList:
                        classNameOptions && classNameOptions.drawerList,
                      drawerListItem:
                        classNameOptions && classNameOptions.drawerListItem,
                      drawerItemButton:
                        classNameOptions && classNameOptions.drawerItemButton,
                      drawerItemLink:
                        classNameOptions && classNameOptions.drawerItemLink,
                      drawerItemIcon:
                        classNameOptions && classNameOptions.drawerItemIcon,
                      drawerItemText:
                        classNameOptions && classNameOptions.drawerItemText,
                      drawerItemArrowIcon:
                        classNameOptions &&
                        classNameOptions.drawerItemArrowIcon,
                      drawerDivider:
                        classNameOptions && classNameOptions.drawerDivider,
                    }}
                    styleOptions={{
                      drawerList: styleOptions && styleOptions.drawerList,
                      drawerListItem:
                        styleOptions && styleOptions.drawerListItem,
                      drawerItemButton:
                        styleOptions && styleOptions.drawerItemButton,
                      drawerItemLink:
                        styleOptions && styleOptions.drawerItemLink,
                      drawerItemIcon:
                        styleOptions && styleOptions.drawerItemIcon,
                      drawerItemText:
                        styleOptions && styleOptions.drawerItemText,
                      drawerItemArrowIcon:
                        styleOptions && styleOptions.drawerItemArrowIcon,
                      drawerDivider: styleOptions && styleOptions.drawerDivider,
                    }}
                    icon={menu.icon}
                    location={location}
                    nestNumber={nestNumber}
                    label={menu.label}
                    pathname={pathname}
                    show={show}
                  />
                ) : (
                  <DrawerItemLink
                    classNameOptions={{
                      drawerItemLink:
                        classNameOptions && classNameOptions.drawerItemLink,
                      drawerItemIcon:
                        classNameOptions && classNameOptions.drawerItemIcon,
                      drawerItemText:
                        classNameOptions && classNameOptions.drawerItemText,
                    }}
                    styleOptions={{
                      drawerItemLink:
                        styleOptions && styleOptions.drawerItemLink,
                      drawerItemIcon:
                        styleOptions && styleOptions.drawerItemIcon,
                      drawerItemText:
                        styleOptions && styleOptions.drawerItemText,
                    }}
                    icon={menu.icon}
                    nestNumber={nestNumber}
                    label={menu.label}
                    to={menu.to}
                    active={isSameLocation(menu.to, pathname, menu.exact)}
                    show={show}
                  />
                )}
              </li>
              {menu.divider && (
                <Divider
                  className={renderClassName(
                    classes.drawerDivider,
                    classNameOptions && classNameOptions.drawerDivider
                  )}
                  style={renderStyle(
                    styleOptions && styleOptions.drawerDivider
                  )}
                />
              )}
            </Fragment>
          )
      )}
    </ul>
  );
};

DrawerList.propTypes = {
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
  ),
  classNameOptions: PropTypes.shape({
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
    drawerList: PropTypes.object,
    drawerListItem: PropTypes.object,
    drawerItemButton: PropTypes.object,
    drawerItemLink: PropTypes.object,
    drawerItemIcon: PropTypes.object,
    drawerItemText: PropTypes.object,
    drawerItemArrowIcon: PropTypes.object,
    drawerDivider: PropTypes.object,
  }),
  location: PropTypes.object,
  nestNumber: PropTypes.number,
  pathname: PropTypes.string,
  show: PropTypes.bool,
  onChange: PropTypes.func,
};

export default DrawerList;
