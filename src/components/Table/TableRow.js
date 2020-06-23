import React, { useState } from "react";
import PropTypes from "prop-types";
import TableAction from "./TableAction";
import Select from "../Select";
import TextInput from "../TextInput";
import Text from "../Text";
import format from "date-fns/format";
import _ from "lodash";
import { renderClassName, renderStyle } from "../../utils/helpers";
import { createUseStyles } from "react-jss";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  tableRow: {
    position: "relative",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: color.alt5,
    },
  },
  tableCell: {
    padding: "16px 40px 16px 16px",
    borderBottom: "1px solid #DDDDDD",
    color: "gray",
    whiteSpace: "nowrap",
  },
  inactiveRow: {
    opacity: 0.2,
    cursor: "default",
  },
  selectFieldset: {
    height: 48,
    position: "relative",
  },
});

const TableRow = (props) => {
  const {
    row,
    columns,
    actions,
    activeRow,
    editable,
    tableAction,
    classNameOptions,
    styleOptions,
    onAction,
    hovered,
  } = props;
  const classes = useStyles();
  const [inputValue, setInputValue] = useState({});
  const [actionType, setActionType] = useState("");
  const [customAction, setCustomAction] = useState(null);

  const handleChange = (key, value, status) => {
    try {
      setInputValue({
        ...inputValue,
        [key]: JSON.parse(value),
      });
    } catch (error) {
      if (typeof status !== "undefined") {
        setInputValue({
          ...inputValue,
          [key]: value,
          [`${key}Status`]: status,
        });
      } else {
        setInputValue({
          ...inputValue,
          [key]: value,
        });
      }
    }
  };

  const handleAction = (row, type) => {
    setActionType(type);
    onAction(row);
  };

  const handleCancelAction = () => {
    setActionType("");
    setCustomAction(null);
    onAction("");
  };

  const handleCustomAction = (row, action) => {
    const oldData = { ...row };
    delete oldData.tableData;

    columns.map((column) => {
      if (oldData[column.key] && column.type === "select") {
        try {
          oldData[column.key] = JSON.parse(
            Object.keys(column.option).find(
              (key) => column.option[key] === oldData[column.key]
            )
          );
        } catch (error) {
          oldData[column.key] = Object.keys(column.option).find(
            (key) => column.option[key] === oldData[column.key]
          );
        }
      }

      return null;
    });

    if (action.isDelete) {
      setActionType("delete");
      setCustomAction(action);
      onAction(row.tableData);
      return;
    }

    action.onClick(oldData);
  };

  const handleSaveAction = (row = null) => {
    if (row) {
      const oldData = { ...row };
      delete oldData.tableData;

      columns.map((column) => {
        if (oldData[column.key] && column.type === "select") {
          try {
            oldData[column.key] = JSON.parse(
              Object.keys(column.option).find(
                (key) => column.option[key] === oldData[column.key]
              )
            );
          } catch (error) {
            oldData[column.key] = Object.keys(column.option).find(
              (key) => column.option[key] === oldData[column.key]
            );
          }
        }

        return null;
      });

      switch (actionType) {
        case "edit":
          editable.onUpdate(oldData, { ...oldData, ...inputValue });
          break;
        case "delete":
          customAction
            ? customAction.onClick(oldData)
            : editable.onDelete(oldData);
          break;
        default:
          break;
      }

      return handleCancelAction();
    }

    editable.onAdd(inputValue);
    return handleCancelAction();
  };

  const renderTextInputValue = (row = null, column) => {
    if (
      inputValue[column.key] ||
      inputValue[column.key] === "" ||
      inputValue[column.key] === 0
    ) {
      return inputValue[column.key];
    } else if (row) {
      return column.type === "date"
        ? new Date(row[column.key])
        : row[column.key];
    }
    return "";
  };

  const renderSelectValue = (row = null, column) => {
    if (inputValue[column.key] !== undefined) {
      if (typeof inputValue[column.key] === "string") {
        return inputValue[column.key];
      }
      return JSON.stringify(inputValue[column.key]);
    } else if (row) {
      return Object.keys(column.option).find(
        (option) => column.option[option] === row[column.key]
      );
    }
    return "";
  };

  return (
    <tr
      className={renderClassName(
        row && activeRow && row.tableData !== activeRow && classes.inactiveRow,
        hovered && !activeRow && classes.tableRow
      )}
    >
      <TableAction
        {...tableAction}
        row={row}
        actions={actions}
        active={row ? row.tableData === activeRow : activeRow === "new"}
        editable={
          editable && (editable.onUpdate || editable.onDelete) ? editable : null
        }
        onCustomAction={handleCustomAction}
        onAction={handleAction}
        onSave={handleSaveAction}
        onCancel={handleCancelAction}
        disable={
          row &&
          Boolean(activeRow) &&
          (row.tableData !== activeRow || activeRow === "new")
        }
        classNameOptions={{
          root: classNameOptions && classNameOptions.root,
        }}
        styleOptions={{
          root: renderStyle(styleOptions && styleOptions.root),
        }}
      />
      {row && row.tableData !== activeRow ? (
        columns.map((column, index) => (
          <td
            key={`${row.tableData}-${column.key}-${index}`}
            className={renderClassName(
              classes.tableCell,
              classNameOptions && classNameOptions.root
            )}
            style={renderStyle(styleOptions && styleOptions.root)}
          >
            {column.render ? (
              column.render(row)
            ) : (
              <Text
                variant="caption"
                align={column.type === "numeric" ? "right" : "left"}
                display="block"
                color="currentColor"
                noMargin
              >
                {row[column.key] && column.type === "date"
                  ? format(
                      new Date(row[column.key]),
                      column.format ? column.format : "dd MMMM yyyy"
                    )
                  : row[column.key] &&
                    column.type === "numeric" &&
                    column.currency
                  ? Number(row[column.key])
                      .toLocaleString(column.currency.countryId, {
                        style: "currency",
                        currency: column.currency.currencyCode,
                      })
                      .slice(0, -3)
                  : column.truncate
                  ? _.truncate(row[column.key], {
                      length: column.truncate,
                      separator: " ",
                    })
                  : row[column.key]}
              </Text>
            )}
          </td>
        ))
      ) : activeRow ? (
        actionType === "delete" ? (
          <td
            className={renderClassName(
              classes.tableCell,
              classNameOptions && classNameOptions.root
            )}
            style={renderStyle(styleOptions && styleOptions.root)}
            colSpan={columns.length}
          >
            {customAction
              ? customAction.message
              : "Are you sure want to delete this data?"}
          </td>
        ) : actionType === "edit" || activeRow === "new" ? (
          columns.map((column, index) => (
            <td
              key={
                row
                  ? `${row.tableData}-${column.key}-${index}`
                  : `new-${column.key}-${index}`
              }
              className={renderClassName(
                classes.tableCell,
                classNameOptions && classNameOptions.root
              )}
              style={renderStyle(styleOptions && styleOptions.root)}
            >
              {column.readonly ? (
                column.render ? (
                  column.render(row)
                ) : (
                  <Text
                    variant="caption"
                    align={column.type === "numeric" ? "right" : "left"}
                    display="block"
                    color="currentColor"
                    noMargin
                  >
                    {row[column.key] && column.type === "date"
                      ? format(
                          new Date(row[column.key]),
                          column.format ? column.format : "dd MMMM yyyy"
                        )
                      : row[column.key] &&
                        column.type === "numeric" &&
                        column.currency
                      ? Number(row[column.key])
                          .toLocaleString(column.currency.countryId, {
                            style: "currency",
                            currency: column.currency.currencyCode,
                          })
                          .slice(0, -3)
                      : row[column.key]}
                  </Text>
                )
              ) : column.type === "select" ? (
                <Select
                  options={Object.entries(column.option).map((option) => ({
                    value: option[0],
                    label: option[1],
                  }))}
                  variant="outlined"
                  label={column.label}
                  value={renderSelectValue(row, column)}
                  onChange={(e) => handleChange(column.key, e.target.value)}
                  classNameOptions={{
                    root: classNameOptions && classNameOptions.input,
                    fieldset: classes.selectFieldset,
                  }}
                  styleOptions={{
                    root: styleOptions && styleOptions.input,
                  }}
                  required={column.required}
                  noMargin
                  fullWidth
                />
              ) : (
                <TextInput
                  type={
                    column.type === "numeric" && column.currency
                      ? "currency"
                      : column.type === "numeric"
                      ? "number"
                      : column.type === "file"
                      ? "file"
                      : column.type === "date"
                      ? "date"
                      : "text"
                  }
                  format={column.format}
                  modes={column.modes}
                  value={renderTextInputValue(row, column)}
                  variant="outlined"
                  label={column.label}
                  onChange={(e, status) =>
                    handleChange(
                      column.key,
                      column.type === "date" ? e : e.target.value,
                      status
                    )
                  }
                  className={renderClassName(
                    classNameOptions && classNameOptions.input
                  )}
                  style={renderStyle(styleOptions && styleOptions.input)}
                  required={column.required}
                  multiline={column.multiline}
                  noMargin
                  fullWidth
                />
              )}
            </td>
          ))
        ) : null
      ) : null}
    </tr>
  );
};

TableRow.defaultProps = {
  activeRow: false,
};

TableRow.propTypes = {
  row: PropTypes.object,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["numeric", "select", "date", "file"]),
      option: PropTypes.object,
      truncate: PropTypes.number,
      format: PropTypes.string,
      required: PropTypes.bool,
      multiline: PropTypes.bool,
      readonly: PropTypes.bool,
      modes: PropTypes.arrayOf(PropTypes.string),
      children: PropTypes.arrayOf(PropTypes.string),
      render: PropTypes.func,
      currency: PropTypes.shape({
        countryId: PropTypes.string.isRequired,
        currencyCode: PropTypes.string.isRequired,
      }),
      styleOptions: PropTypes.shape({
        head: PropTypes.object,
        cell: PropTypes.object,
      }),
    })
  ),
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
  activeRow: PropTypes.string,
  editable: PropTypes.shape({
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  }),
  tableAction: PropTypes.shape({
    classNameOptions: PropTypes.shape({
      root: PropTypes.string,
      action: PropTypes.string,
    }),
    styleOptions: PropTypes.shape({
      root: PropTypes.object,
      action: PropTypes.object,
    }),
  }),
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    input: PropTypes.string,
  }),
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    input: PropTypes.object,
  }),
  onAction: PropTypes.func,
  hovered: PropTypes.bool,
};

export default TableRow;
