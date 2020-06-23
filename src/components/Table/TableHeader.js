import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../TextInput";
import IconButton from "../IconButton";
import Tooltip from "../Tooltip";
import SearchIcon from "mdi-react/SearchIcon";
import PlusCircleIcon from "mdi-react/PlusCircleIcon";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle, useMedia } from "../../utils/helpers";
import { breakpoints, color } from "../../utils/theme";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 16
  },
  headerUtil: {
    flex: 0.8,
    display: "flex",
    alignItems: "center"
  },
  search: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
    background: "#FFFFFF",
    borderRadius: 4,
    padding: "0 8px",
    flex: 1
  },
  inputWrapper: {
    border: "none",
    "&:after": {
      display: "none"
    }
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  actionButton: {
    color: "rgba(0, 0, 0, 0.56)"
  },
  fullWidth: {
    width: "100%"
  }
});

const TableHeader = props => {
  const {
    headerContent,
    classNameOptions,
    styleOptions,
    search,
    disableAdd,
    showAdd,
    fullWidthSearch,
    onShowAdd,
    onSearch
  } = props;
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useMedia(breakpoints.down("sm"));

  const handleChange = e => {
    const { value } = e.target;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div
      className={renderClassName(
        classes.header,
        classNameOptions && classNameOptions.root
      )}
      style={renderStyle(styleOptions && styleOptions.root)}
    >
      <div
        className={
          isMobile || fullWidthSearch ? classes.fullWidth : classes.headerUtil
        }
      >
        {showAdd && (
          <Tooltip content="Add Data">
            <IconButton
              onClick={() => onShowAdd("new")}
              disable={disableAdd}
              className={renderClassName(
                classes.actionButton,
                classNameOptions && classNameOptions.action
              )}
              style={renderStyle(styleOptions && styleOptions.action)}
            >
              <PlusCircleIcon color={color.primary} />
            </IconButton>
          </Tooltip>
        )}
        {search && (
          <TextInput
            placeholder="Search"
            extra={{ start: <SearchIcon /> }}
            value={searchValue}
            onChange={handleChange}
            styleOptions={{
              root: renderStyle(styleOptions && styleOptions.search)
            }}
            classNameOptions={{
              root: renderClassName(
                classes.search,
                classNameOptions && classNameOptions.search
              ),
              inputWrapper: classes.inputWrapper
            }}
            noMargin
            noValidate
          />
        )}
      </div>
      <div className={classes.headerContent}>{headerContent}</div>
    </div>
  );
};

TableHeader.defaultProps = {
  search: true,
  disableAdd: false,
  showAdd: false
};

TableHeader.propTypes = {
  headerContent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  classNameOptions: PropTypes.shape({
    root: PropTypes.string,
    title: PropTypes.string,
    search: PropTypes.string,
    action: PropTypes.string
  }),
  styleOptions: PropTypes.shape({
    root: PropTypes.object,
    title: PropTypes.object,
    search: PropTypes.object,
    action: PropTypes.object
  }),
  search: PropTypes.bool,
  disableAdd: PropTypes.bool,
  showAdd: PropTypes.bool,
  fullWidthSearch: PropTypes.bool,
  onShowAdd: PropTypes.func,
  onSearch: PropTypes.func
};

export default TableHeader;
