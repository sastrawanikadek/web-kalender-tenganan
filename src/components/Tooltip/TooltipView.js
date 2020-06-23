import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Text from "../Text";
import { CSSTransition } from "react-transition-group";
import { createUseStyles } from "react-jss";
import { renderClassName, offset, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  tooltip: {
    position: "fixed",
    height: "auto",
    width: "auto",
    maxWidth: props => props.maxWidth,
    display: "flex",
    alignItems: "center",
    padding: 6,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 325,
    transform: "scale(0)",
    transition: "transform 0.2s ease-in-out"
  },
  tooltipEnter: {
    transform: "scale(1)"
  },
  tooltipExit: {
    transform: "scale(0)"
  },
  tooltipText: {
    color: "#FFFFFF",
    fontSize: "0.7rem",
    fontWeight: "500"
  }
});

const TooltipView = props => {
  const { children, content, maxWidth, position, disable } = props;
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [tooltip, setTooltip] = useState({
    height: 0,
    width: 0
  });
  const tooltipRef = useRef(null);
  const classes = useStyles({ maxWidth });
  const tooltipPosition = renderStyle(
    { vertical: "bottom", horizontal: "center" },
    position
  );

  const getTooltipStyle = () => {
    if (target && tooltip) {
      const tooltipStyle = {
        top: 0,
        left: 0
      };
      const horizontal = {
        left: offset(target).left - tooltip.width - 8,
        center:
          offset(target).left + offset(target).width / 2 - tooltip.width / 2,
        right: offset(target).left + offset(target).width + 8
      };
      const vertical = {
        top: offset(target).top - tooltip.height - 8,
        center:
          offset(target).top + offset(target).height / 2 - tooltip.height / 2,
        bottom: offset(target).top + offset(target).height + 8
      };

      if (tooltipPosition.horizontal === "left") {
        if (horizontal.left > 0) {
          tooltipStyle.left = horizontal.left;
        } else if (
          horizontal.center > 0 &&
          horizontal.center + tooltip.width < window.innerWidth
        ) {
          tooltipStyle.left = horizontal.center;
        } else {
          tooltipStyle.left = horizontal.right;
        }
      } else if (tooltipPosition.horizontal === "center") {
        if (
          horizontal.center > 0 &&
          horizontal.center + tooltip.width < window.innerWidth
        ) {
          tooltipStyle.left = horizontal.center;
        } else if (horizontal.right + tooltip.width < window.innerWidth) {
          tooltipStyle.left = horizontal.right;
        } else {
          tooltipStyle.left = horizontal.left;
        }
      } else {
        if (horizontal.right + tooltip.width < window.innerWidth) {
          tooltipStyle.left = horizontal.right;
        } else if (
          horizontal.center > 0 &&
          horizontal.center + tooltip.width < window.innerWidth
        ) {
          tooltipStyle.left = horizontal.center;
        } else {
          tooltipStyle.left = horizontal.left;
        }
      }

      if (tooltipPosition.vertical === "top") {
        if (vertical.top > 0) {
          tooltipStyle.top = vertical.top;
        } else if (
          vertical.center > 0 &&
          vertical.center + tooltip.height < window.innerHeight
        ) {
          tooltipStyle.top =
            tooltipStyle.left === horizontal.center
              ? vertical.bottom
              : vertical.center;
        } else {
          tooltipStyle.top = vertical.bottom;
        }
      } else if (tooltipPosition.vertical === "center") {
        if (
          vertical.center > 0 &&
          vertical.center + tooltip.height < window.innerHeight
        ) {
          if (tooltipStyle.left === horizontal.center) {
            tooltipStyle.top =
              vertical.bottom + tooltip.height < window.innerHeight
                ? vertical.bottom
                : vertical.top;
          } else {
            tooltipStyle.top = vertical.center;
          }
        } else if (vertical.bottom + tooltip.height < window.innerHeight) {
          tooltipStyle.top = vertical.bottom;
        } else {
          tooltipStyle.top = vertical.top;
        }
      } else {
        if (vertical.bottom + tooltip.height < window.innerHeight) {
          tooltipStyle.top = vertical.bottom;
        } else if (
          vertical.center > 0 &&
          vertical.center + tooltip.height < window.innerHeight
        ) {
          tooltipStyle.top =
            tooltipStyle.left === horizontal.center
              ? vertical.top
              : vertical.center;
        } else {
          tooltipStyle.top = vertical.top;
        }
      }

      return tooltipStyle;
    }
    return {};
  };

  const handleEnter = e => {
    setShow(true);
    setTarget(e.currentTarget);
  };

  const handleLeave = () => {
    setShow(false);
  };

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltip({
        height: tooltipRef.current.offsetHeight,
        width: tooltipRef.current.offsetWidth
      });
    }
  }, [show, tooltipRef]);

  return (
    <Fragment>
      {React.cloneElement(children, {
        onFocus: handleEnter,
        onBlur: handleLeave,
        onMouseEnter: handleEnter,
        onMouseLeave: handleLeave
      })}
      {!disable &&
        content &&
        ReactDOM.createPortal(
          <CSSTransition
            in={show}
            classNames={{
              enterActive: classes.tooltipEnter,
              enterDone: classes.tooltipEnter,
              exit: classes.tooltipExit,
              exitActive: classes.tooltipExit
            }}
            timeout={200}
            unmountOnExit
          >
            <div
              ref={tooltipRef}
              className={renderClassName(classes.tooltip)}
              style={renderStyle(getTooltipStyle())}
            >
              {typeof content === "string" ? (
                <Text
                  variant="caption"
                  className={renderClassName(classes.tooltipText)}
                  noMargin
                >
                  {content}
                </Text>
              ) : (
                content
              )}
            </div>
          </CSSTransition>,
          document.getElementsByTagName("body")[0]
        )}
    </Fragment>
  );
};

TooltipView.defaultProps = {
  maxWidth: 300,
  disable: false
};

TooltipView.propTypes = {
  children: PropTypes.element.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  position: PropTypes.shape({
    vertical: PropTypes.oneOf(["top", "center", "bottom"]),
    horizontal: PropTypes.oneOf(["left", "center", "right"])
  }),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disable: PropTypes.bool
};

export default TooltipView;
