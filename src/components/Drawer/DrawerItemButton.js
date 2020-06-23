import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Text from "../Text";
import DrawerList from "./DrawerList";
import MenuDownIcon from "mdi-react/MenuDownIcon";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";
import { CSSTransition } from "react-transition-group";

const useStyles = createUseStyles({
  drawerItemButton: {
    padding: "12px 6px",
    paddingLeft: (props) =>
      props.show ? props.nestNumber * 8 : props.nestNumber * 2,
    paddingRight: (props) => (props.show ? 6 : 24),
    justifyContent: "flex-start",
    width: "100%",
    boxSizing: "border-box",
    color: "#66788A",
  },
  drawerItemIcon: {
    display: "inline-flex",
    marginLeft: 8,
    marginRight: 24,
  },
  drawerItemText: {
    fontWeight: "500",
    textAlign: "left",
  },
  drawerItemArrowIcon: {
    display: "inline-flex",
    marginLeft: 8,
    transform: "rotate(-90deg)",
    transition: "transform 0.3s ease-in-out",
  },
  drawerItemArrowIconDown: {
    transform: "rotate(0deg)",
  },
  drawerList: {
    height: 0,
    transition: "height 0.3s ease-in-out",
    overflow: "hidden",
  },
  drawerListTransitioning: {
    height: (props) => props.listHeight,
  },
  drawerListEntered: {
    height: "auto",
  },
  drawerListExiting: {
    height: (props) => props.listHeight * 0,
  },
});

const DrawerItemButton = (props) => {
  const {
    children,
    classNameOptions,
    styleOptions,
    icon,
    location,
    nestNumber,
    label,
    pathname,
    show,
  } = props;
  const [expand, setExpand] = useState(false);
  const [listHeight, setListHeight] = useState(0);
  const classes = useStyles({ nestNumber, listHeight, show });

  return (
    <Fragment>
      <Button
        className={renderClassName(
          classes.drawerItemButton,
          classNameOptions && classNameOptions.drawerItemButton
        )}
        style={renderStyle(styleOptions && styleOptions.drawerItemButton)}
        onClick={() => setExpand(!expand)}
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
        <div
          className={renderClassName(
            classes.drawerItemArrowIcon,
            expand && classes.drawerItemArrowIconDown,
            classNameOptions && classNameOptions.drawerItemArrowIcon
          )}
          style={renderStyle(styleOptions && styleOptions.drawerItemArrowIcon)}
        >
          <MenuDownIcon />
        </div>
      </Button>
      <CSSTransition
        in={expand}
        timeout={300}
        classNames={{
          enterActive: classes.drawerListTransitioning,
          enterDone: classes.drawerListEntered,
          exit: classes.drawerListTransitioning,
          exitActive: classes.drawerListExiting,
        }}
        unmountOnExit
      >
        <DrawerList
          classNameOptions={{
            drawerList: renderClassName(
              classes.drawerList,
              classNameOptions && classNameOptions.drawerList
            ),
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
          menuList={children}
          location={location}
          nestNumber={nestNumber + 1}
          pathname={pathname}
          show={show}
          onChange={setListHeight}
        />
      </CSSTransition>
    </Fragment>
  );
};

DrawerItemButton.propTypes = {
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
  icon: PropTypes.element,
  location: PropTypes.object,
  nestNumber: PropTypes.number,
  label: PropTypes.string,
  pathname: PropTypes.string,
  show: PropTypes.bool,
};

export default DrawerItemButton;
