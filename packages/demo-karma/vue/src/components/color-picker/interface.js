import PropTypes from "../_util/vue-types";

export const colorPickerProps = {
  zIndex: PropTypes.number,
  color: PropTypes.string,
  defaultColor: PropTypes.string,
  buttonStyle: PropTypes.object,
  colorFormat: PropTypes.string,
  showAlpha: PropTypes.bool,
  prefixCls: PropTypes.string,
  getColorPopContainer: PropTypes.func,
}

export const colorPickerButtonProps = {
  visible: PropTypes.bool,
  prefixCls: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonStyle: PropTypes.object,
}

export const colorPickerDropdownProps = {
  prefixCls: PropTypes.string,
  buttonColor: PropTypes.string,
  color: PropTypes.object,
}

export const colorPickerPanelProps = Object.assign({}, colorPickerDropdownProps);

export const colorPickerSliderProps = Object.assign({
  vertical: PropTypes.bool
}, colorPickerDropdownProps)

