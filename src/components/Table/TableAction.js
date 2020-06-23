import React, { Fragment } from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton";
import Button from "../Button";
import Tooltip from "../Tooltip";
import CheckIcon from "mdi-react/CheckIcon";
import CloseIcon from "mdi-react/CloseIcon";
import EditIcon from "mdi-react/EditIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  tableCell: {
    padding: "16px 40px 16px 16px",
    borderBottom: "1px solid #DDDDDD",
    textAlign: "left",
    fontSize: 14,
    color: "gray",
  },
  tableActionCell: {
    padding: 4,
    textAlign: "center",
    width: 48,
  },
  actionWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    color: "rgba(0, 0, 0, 0.56)",
  },
});

const TableAction = (props) => {
  const {
    row,
    actions,
    active,
    disable,
    classNameOptions,
    styleOptions,
    editable,
    onCustomAction,
    onAction,
    onSave,
    onCancel,
  } = props;
  const classes = useStyles();

  return active || editable || actions ? (
    <td
      className={renderClassName(
        classes.tableCell,
        classes.tableActionCell,
        classNameOptions && classNameOptions.root
      )}
    >
      <div className={classes.actionWrapper}>
        {!active &&
          actions &&
          actions.map((action, index) =>
            action.component === "Button" ? (
              <Button
                key={`${row}${action}${index}`}
                component={action.href ? "a" : "button"}
                variant={action.variant}
                className={renderClassName(
                  classes.actionButton,
                  classNameOptions && classNameOptions.action
                )}
                style={renderStyle(styleOptions && styleOptions.action, {
                  order: action.order,
                })}
                href={
                  action.href
                    ? typeof action.href === "string"
                      ? action.href
                      : () => action.href(row)
                    : null
                }
                onClick={
                  action.onClick ? () => onCustomAction(row, action) : null
                }
                disable={
                  disable ||
                  (typeof action.disable === "boolean" && action.disable) ||
                  (typeof action.disable !== "boolean" &&
                    action.disable &&
                    action.disable(row))
                }
              >
                {action.label}
              </Button>
            ) : (
              <Tooltip
                content={action.label}
                key={`${row}${action}${index}`}
                disable={
                  disable ||
                  (typeof action.disable === "boolean" && action.disable) ||
                  (typeof action.disable !== "boolean" &&
                    action.disable &&
                    action.disable(row))
                }
              >
                <IconButton
                  component={action.href ? "a" : "button"}
                  className={renderClassName(
                    classes.actionButton,
                    classNameOptions && classNameOptions.action
                  )}
                  style={renderStyle(styleOptions && styleOptions.action, {
                    order: action.order,
                  })}
                  href={
                    action.href
                      ? typeof action.href === "string"
                        ? action.href
                        : () => action.href(row)
                      : null
                  }
                  onClick={
                    action.onClick ? () => onCustomAction(row, action) : null
                  }
                  disable={
                    disable ||
                    (typeof action.disable === "boolean" && action.disable) ||
                    (typeof action.disable !== "boolean" &&
                      action.disable &&
                      action.disable(row))
                  }
                >
                  {action.icon}
                </IconButton>
              </Tooltip>
            )
          )}
        {active ? (
          <Fragment>
            <Tooltip content="Save Changes" disable={disable}>
              <IconButton
                onClick={() => onSave(row)}
                className={renderClassName(
                  classes.actionButton,
                  classNameOptions && classNameOptions.action
                )}
                style={renderStyle(styleOptions && styleOptions.action)}
                disable={disable}
              >
                <CheckIcon color={color.secondary} />
              </IconButton>
            </Tooltip>
            <Tooltip content="Cancel" disable={disable}>
              <IconButton
                onClick={() => onCancel()}
                className={renderClassName(
                  classes.actionButton,
                  classNameOptions && classNameOptions.action
                )}
                style={renderStyle(styleOptions && styleOptions.action)}
                disable={disable}
              >
                <CloseIcon color={color.accent} />
              </IconButton>
            </Tooltip>
          </Fragment>
        ) : (
          <Fragment>
            {editable && editable.onUpdate && (
              <Tooltip content="Update Data" disable={disable}>
                <IconButton
                  onClick={() => onAction(row.tableData, "edit")}
                  className={renderClassName(
                    classes.actionButton,
                    classNameOptions && classNameOptions.action
                  )}
                  style={renderStyle(styleOptions && styleOptions.action)}
                  disable={disable}
                >
                  <EditIcon color={color.primary} />
                </IconButton>
              </Tooltip>
            )}
            {editable && editable.onDelete && (
              <Tooltip content="Delete Data" disable={disable}>
                <IconButton
                  onClick={() => onAction(row.tableData, "delete")}
                  className={renderClassName(
                    classes.actionButton,
                    classNameOptions && classNameOptions.action
                  )}
                  style={renderStyle(styleOptions && styleOptions.action)}
                  disable={disable}
                >
                  <DeleteIcon color={color.accent} />
                </IconButton>
              </Tooltip>
            )}
          </Fragment>
        )}
      </div>
    </td>
  ) : null;
};

TableAction.defaultProps = {
  active: false,
};

TableAction.propTypes = {
  row: PropTypes.object,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.oneOf(["Button", "IconButton"]),
      variant: PropTypes.oneOf(["contained", "outlined", "text"]),
      href: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      disable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      icon: PropTypes.element,
      label: PropTypes.any,
      onClick: PropTypes.func,
      isDelete: PropTypes.bool,
      message: PropTypes.string,
      order: PropTypes.number,
    })
  ),
  active: PropTypes.bool,
  disable: PropTypes.bool,
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    action: PropTypes.string,
  }),
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    action: PropTypes.object,
  }),
  editable: PropTypes.shape({
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  }),
  onCustomAction: PropTypes.func,
  onAction: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default TableAction;
