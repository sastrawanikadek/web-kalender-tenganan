import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import { createUseStyles } from "react-jss";
import {
  renderClassName,
  findValueInArray,
  renderStyle,
  validateSelectValue,
} from "../../utils/helpers";

const useStyles = createUseStyles({
  select: {
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

const SelectField = (props) => {
  const {
    options,
    classNameOptions,
    styleOptions,
    value,
    label,
    name,
    placeholder,
    emptyText,
    focus,
    multiple,
    readonly,
    renderValue,
  } = props;
  const classes = useStyles();

  return (
    <div
      className={renderClassName(
        classes.select,
        classNameOptions && classNameOptions.select
      )}
      style={renderStyle(styleOptions && styleOptions.select)}
    >
      <Text
        variant="caption"
        className={renderClassName(
          classNameOptions && classNameOptions.selectText
        )}
        style={renderStyle(styleOptions && styleOptions.selectText)}
        noWrap
        noMargin
      >
        {!validateSelectValue(multiple, value) && ((focus && label) || !label)
          ? placeholder
          : multiple
          ? renderValue(options, Array.isArray(value) ? value : [])
          : findValueInArray(options, value, "value", "label", "")
          ? findValueInArray(options, value, "value", "label", "")
          : emptyText}
      </Text>
      <input type="hidden" value={value} name={name} readOnly={readonly} />
    </div>
  );
};

SelectField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.any.isRequired,
    })
  ),
  classNameOptions: PropTypes.shape({
    select: PropTypes.string,
    selectText: PropTypes.string,
  }),
  styleOptions: PropTypes.shape({
    select: PropTypes.object,
    selectText: PropTypes.object,
  }),
  value: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  emptyText: PropTypes.string,
  focus: PropTypes.bool,
  multiple: PropTypes.bool,
  readonly: PropTypes.bool,
  renderValue: PropTypes.func,
};

export default SelectField;
