import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Popup from "../Popup";
import Button from "../Button";
import Text from "../Text";
import Checkbox from "../Checkbox";
import { createUseStyles } from "react-jss";
import { renderClassName, renderStyle } from "../../utils/helpers";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  option: {
    textAlign: "left",
    padding: 12,
  },
});

const SelectMenu = (props) => {
  const {
    options,
    classNameOptions,
    styleOptions,
    value,
    target,
    container,
    emptyText,
    empty,
    multiple,
    checkbox,
    required,
    readonly,
    onChange,
    onClose,
  } = props;
  const classes = useStyles();

  const handleSelect = (e, optionValue) => {
    onChange({
      ...e,
      currentTarget: {
        ...e.currentTarget,
        value: optionValue,
      },
      target: {
        ...e.target,
        value: optionValue,
      },
    });
    onClose();
    container.current.focus();
  };

  const handleSelectMultiple = (e, optionValue) => {
    let tempValue = [...value];

    if (tempValue.indexOf(optionValue) !== -1) {
      tempValue.splice(tempValue.indexOf(optionValue), 1);
    } else {
      tempValue = [...tempValue, optionValue];
    }

    onChange({
      ...e,
      currentTarget: {
        ...e.currentTarget,
        value: tempValue,
      },
      target: {
        ...e.target,
        value: tempValue,
      },
    });
  };

  const handleClose = () => {
    onClose();
    container.current.focus();
  };

  return readonly ? null : (
    <Popup
      target={target}
      onClose={handleClose}
      className={renderClassName(classNameOptions && classNameOptions.menu)}
      style={renderStyle(styleOptions && styleOptions.menu)}
    >
      <Fragment>
        {!required && !multiple && empty && (
          <Button
            className={renderClassName(
              classes.option,
              classNameOptions && classNameOptions.option
            )}
            style={renderStyle(styleOptions && styleOptions.option)}
            onClick={(e) => handleSelect(e, "")}
            rounded={false}
            fullWidth
          >
            <Text
              className={renderClassName(
                classNameOptions && classNameOptions.optionText
              )}
              style={renderStyle(styleOptions && styleOptions.optionText)}
              noMargin
            >
              <em>{emptyText}</em>
            </Text>
          </Button>
        )}
        {options.map((option, index) => (
          <Button
            key={`select-option-${index}`}
            className={renderClassName(
              classes.option,
              classNameOptions && classNameOptions.option
            )}
            style={renderStyle(styleOptions && styleOptions.option)}
            onClick={(e) =>
              multiple
                ? handleSelectMultiple(e, option.value)
                : handleSelect(e, option.value)
            }
            rounded={false}
            fullWidth
          >
            {multiple && checkbox && (
              <Checkbox
                checked={
                  Array.isArray(value) && value.indexOf(option.value) !== -1
                }
                component="span"
                color={color.primary}
                className={renderClassName(
                  classNameOptions && classNameOptions.checkbox
                )}
                style={renderStyle(styleOptions && styleOptions.checkbox)}
              />
            )}
            <Text
              className={renderClassName(
                classNameOptions && classNameOptions.optionText
              )}
              style={renderStyle(styleOptions && styleOptions.optionText)}
              noMargin
            >
              {option.label}
            </Text>
          </Button>
        ))}
      </Fragment>
    </Popup>
  );
};

SelectMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.any.isRequired,
    })
  ),
  classNameOptions: PropTypes.shape({
    menu: PropTypes.string,
    option: PropTypes.string,
    checkbox: PropTypes.string,
    optionText: PropTypes.string,
  }),
  styleOptions: PropTypes.shape({
    menu: PropTypes.object,
    option: PropTypes.object,
    checkbox: PropTypes.object,
    optionText: PropTypes.object,
  }),
  value: PropTypes.any,
  target: PropTypes.object,
  container: PropTypes.object,
  emptyText: PropTypes.string,
  empty: PropTypes.bool,
  multiple: PropTypes.bool,
  checkbox: PropTypes.bool,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default SelectMenu;
