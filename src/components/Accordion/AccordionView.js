import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton";
import Divider from "../Divider";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  actionWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: (props) =>
      props.expandIconPosition === "left" ? "row-reverse" : "row",
    cursor: "pointer",
    padding: "8px 12px",
  },
  action: {
    flex: 1,
  },
  actionIcon: {
    transition: "transform 0.3s ease-in-out",
  },
  showActionIcon: {
    transform: "rotate(180deg)",
  },
  contentWrapper: {
    transition: "height 0.3s ease-in-out",
    overflow: "hidden",
  },
  content: {
    position: "relative",
    padding: 16,
  },
});

const AccordionView = (props) => {
  const {
    children,
    actionComponent,
    expandIconPosition,
    classNameOptions,
    styleOptions,
    disableExpandIcon,
    disableDivider,
  } = props;
  const [show, setShow] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const classes = useStyles({ expandIconPosition });

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(show ? contentRef.current.offsetHeight : 0);
    }
  }, [contentRef, show, children]);

  return (
    <div>
      <div
        className={renderClassName(
          classes.actionWrapper,
          classNameOptions && classNameOptions.actionWrapper
        )}
        style={renderStyle(styleOptions && styleOptions.actionWrapper)}
        onClick={() => setShow(!show)}
      >
        <div className={classes.action}>{actionComponent}</div>
        {!disableExpandIcon && (
          <IconButton
            className={renderClassName(
              classNameOptions && classNameOptions.actionButton
            )}
            style={renderStyle(styleOptions && styleOptions.actionButton)}
            disableRipple
          >
            <ChevronDownIcon
              className={renderClassName(
                classes.actionIcon,
                show && classes.showActionIcon,
                classNameOptions && classNameOptions.actionIcon
              )}
              style={renderStyle(styleOptions && styleOptions.actionIcon)}
            />
          </IconButton>
        )}
      </div>
      <div className={classes.contentWrapper} style={{ height: contentHeight }}>
        <div
          className={renderClassName(
            classes.content,
            classNameOptions && classNameOptions.content
          )}
          style={renderStyle(styleOptions && styleOptions.content)}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
      {!disableDivider && <Divider />}
    </div>
  );
};

AccordionView.defaultProps = {
  expandIconPosition: "right",
  disableExpandIcon: false,
  disableDivider: false,
};

AccordionView.propTypes = {
  children: PropTypes.any.isRequired,
  actionComponent: PropTypes.any.isRequired,
  expandIconPosition: PropTypes.oneOf(["left", "right"]),
  classNameOptions: PropTypes.shape({
    actionWrapper: PropTypes.string,
    actionButton: PropTypes.string,
    actionIcon: PropTypes.string,
    content: PropTypes.string,
  }),
  styleOptions: PropTypes.shape({
    actionWrapper: PropTypes.object,
    actionButton: PropTypes.object,
    actionIcon: PropTypes.object,
    content: PropTypes.object,
  }),
  disableExpandIcon: PropTypes.bool,
  disableDivider: PropTypes.bool,
};

export default AccordionView;
