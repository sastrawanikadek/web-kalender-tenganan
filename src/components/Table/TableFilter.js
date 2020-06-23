import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "../Select";
import TextInput from "../TextInput";
import FilterVariantIcon from "mdi-react/FilterVariantIcon";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";

const useStyles = createUseStyles({
  tableCell: {
    padding: "16px 40px 16px 16px",
    textAlign: "left",
    fontSize: 14,
    color: "gray"
  },
  tableActionCell: {
    padding: 4,
    textAlign: "center",
    width: 48
  },
  tableFilterCell: {
    paddingTop: 8
  },
  inputExtra: {
    marginRight: 0
  },
  option: {
    padding: "12px 24px"
  }
});

const TableFilter = props => {
  const {
    columns,
    classNameOptions,
    styleOptions,
    actionColumn,
    disableFilter,
    onFilter
  } = props;
  const classes = useStyles();
  const [filterValue, setFilterValue] = useState({});

  const renderSelectOption = column => {
    return Object.entries(column.option).map(option => ({
      label: option[1],
      value: option[1]
    }));
  };

  const handleChange = (e, column) => {
    const { key, type } = column;
    let value = type === "date" ? e : e.target.value;
    if (
      (type !== "select" && value) ||
      (type === "select" && value.length > 0)
    ) {
      const tempFilterValue = {
        ...filterValue,
        [key]: value
      };
      setFilterValue(tempFilterValue);
      return onFilter(tempFilterValue);
    }

    const tempFilterValue = { ...filterValue };
    delete tempFilterValue[key];
    setFilterValue(tempFilterValue);
    return onFilter(tempFilterValue);
  };

  return disableFilter ? null : (
    <tr>
      {actionColumn ? (
        <td
          className={renderClassName(
            classes.tableCell,
            classes.tableActionCell,
            classNameOptions && classNameOptions.root
          )}
          style={renderStyle(styleOptions && styleOptions.root)}
        ></td>
      ) : null}
      {columns.map((column, index) => (
        <td
          key={`filter-${column.key}-${index}`}
          className={renderClassName(
            classes.tableCell,
            classes.tableFilterCell,
            classNameOptions && classNameOptions.root
          )}
          style={renderStyle(styleOptions && styleOptions.root)}
        >
          {column.filter !== false ? (
            column.type === "select" ? (
              <Select
                options={renderSelectOption(column)}
                value={
                  filterValue[column.key] !== undefined
                    ? filterValue[column.key]
                    : ""
                }
                placeholder="Filter"
                onChange={e => handleChange(e, column)}
                classNameOptions={{
                  root: classNameOptions && classNameOptions.input,
                  extraEnd: classes.inputExtra,
                  option: classes.option
                }}
                styleOptions={{
                  root: styleOptions && styleOptions.input
                }}
                noMargin
                noValidate
                fullWidth
                multiple
                checkbox
              />
            ) : (
              <TextInput
                type={
                  column.type === "numeric" && column.currency
                    ? "currency"
                    : column.type === "numeric"
                    ? "number"
                    : column.type === "date"
                    ? "date"
                    : "text"
                }
                placeholder="Filter"
                extra={{ end: <FilterVariantIcon /> }}
                value={
                  filterValue[column.key] !== undefined
                    ? filterValue[column.key]
                    : ""
                }
                onChange={e => handleChange(e, column)}
                classNameOptions={{
                  root: classNameOptions && classNameOptions.input,
                  extraEnd: classes.inputExtra
                }}
                styleOptions={{
                  root: styleOptions && styleOptions.input
                }}
                format={column.format}
                modes={column.modes}
                clearable
                noMargin
                noValidate
                fullWidth
              />
            )
          ) : null}
        </td>
      ))}
    </tr>
  );
};

TableFilter.defaultProps = {
  disableFilter: false
};

TableFilter.propTypes = {
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
        currencyCode: PropTypes.string.isRequired
      }),
      styleOptions: PropTypes.shape({
        head: PropTypes.object,
        cell: PropTypes.object
      })
    })
  ),
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    input: PropTypes.string
  }),
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    input: PropTypes.object
  }),
  actionColumn: PropTypes.bool,
  disableFilter: PropTypes.bool,
  onFilter: PropTypes.func
};

export default TableFilter;
