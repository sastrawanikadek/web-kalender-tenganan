/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import SortAscendingIcon from "mdi-react/SortAscendingIcon";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle, isSorted } from "../../utils/helpers";

const useStyles = createUseStyles({
  tableHeadColumn: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      "& $tableHeadColumnIcon": {
        opacity: 1,
        visibility: "visible",
      },
    },
  },
  tableHeadColumnIcon: {
    opacity: 0,
    visibility: "hidden",
    transform: "rotate(0deg)",
    transition:
      "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, transform 0.2s ease-in-out",
  },
  tableCell: {
    padding: "16px 40px 16px 16px",
    borderBottom: "1px solid #DDDDDD",
    textAlign: "left",
    fontSize: 14,
    color: "gray",
    whiteSpace: "nowrap",
  },
  tableActionCell: {
    padding: 4,
    textAlign: "center",
    width: 48,
  },
  numeric: {
    textAlign: "right",
  },
  reverse: {
    flexDirection: "row-reverse",
  },
  marginLeft: {
    marginLeft: 16,
  },
  marginRight: {
    marginRight: 16,
  },
  activeIcon: {
    opacity: 1,
    visibility: "visible",
  },
  descending: {
    transform: "rotate(180deg)",
  },
});

const TableHead = (props) => {
  const {
    data,
    columns,
    actionColumn,
    disableSort,
    classNameOptions,
    styleOptions,
    defaultSort,
    onSort,
  } = props;
  const classes = useStyles();
  const [sortType, setSortType] = useState("");
  const [sortColumn, setSortColumn] = useState(null);

  const handleSort = (column) => {
    if (!disableSort) {
      setSortType((prevSortType) =>
        prevSortType === "ascending" ? "descending" : "ascending"
      );
      setSortColumn(column.key);
      onSort(sortType === "ascending" ? "descending" : "ascending", column.key);
    }
  };

  useEffect(() => {
    if (
      data.length > 0 &&
      defaultSort &&
      (defaultSort.type === "ascending" || defaultSort.type === "descending") &&
      defaultSort.column &&
      (sortType === "" || sortType === defaultSort.type) &&
      (sortColumn === null || sortColumn === defaultSort.column) &&
      columns.findIndex((value) => value.key === defaultSort.column) !== -1
    ) {
      if (!isSorted(data, defaultSort.type, defaultSort.column)) {
        setSortType(defaultSort.type);
        setSortColumn(defaultSort.column);
        onSort(defaultSort.type, defaultSort.column);
      }
    }
  }, [data, sortType, sortColumn]);

  return (
    <thead>
      <tr>
        {actionColumn && (
          <th
            className={renderClassName(
              classes.tableCell,
              classNameOptions && classNameOptions.root
            )}
            style={renderStyle(styleOptions && styleOptions.root)}
          >
            <div className={classes.tableHeadColumn}>
              <Text
                variant="paragraph"
                color="currentColor"
                className={renderClassName(
                  classNameOptions && classNameOptions.text
                )}
                style={renderStyle(styleOptions && styleOptions.text)}
                noMargin
              >
                Actions
              </Text>
            </div>
          </th>
        )}
        {columns.map((column, index) => (
          <th
            key={`${column.key}-${index}`}
            className={renderClassName(
              classes.tableCell,
              column.type === "numeric" && classes.numeric,
              classNameOptions && classNameOptions.root
            )}
            style={renderStyle(styleOptions && styleOptions.root)}
          >
            <div
              className={renderClassName(
                classes.tableHeadColumn,
                column.type === "numeric" && classes.reverse
              )}
              onClick={() => handleSort(column)}
            >
              <Text
                variant="paragraph"
                color="currentColor"
                className={renderClassName(
                  classNameOptions && classNameOptions.text
                )}
                style={renderStyle(styleOptions && styleOptions.text)}
                noMargin
              >
                {column.label}
              </Text>
              {!disableSort && (
                <SortAscendingIcon
                  className={renderClassName(
                    classes.tableHeadColumnIcon,
                    column.key === sortColumn && classes.activeIcon,
                    ((column.key !== sortColumn && sortType === "ascending") ||
                      (column.key === sortColumn &&
                        sortType === "descending")) &&
                      classes.descending,
                    column.type === "numeric"
                      ? classes.marginRight
                      : classes.marginLeft,
                    classNameOptions && classNameOptions.icon
                  )}
                  style={renderStyle(styleOptions && styleOptions.icon)}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHead.defaultProps = {
  actionColumn: false,
  disableSort: false,
};

TableHead.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
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
  actionColumn: PropTypes.bool,
  disableSort: PropTypes.bool,
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
  }),
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    text: PropTypes.object,
    icon: PropTypes.object,
  }),
  defaultSort: PropTypes.shape({
    type: PropTypes.oneOf(["ascending", "descending"]).isRequired,
    column: PropTypes.string.isRequired,
  }),
  onSort: PropTypes.func,
};

export default TableHead;
