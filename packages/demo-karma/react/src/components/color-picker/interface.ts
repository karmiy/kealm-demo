import {Color} from "./color";

/* 最外层整体ColorPicker */
export interface ColorPickerProps {
  zIndex?: number;
  defaultColor?: string;
  buttonStyle?: object;
  colorFormat?: string;
  colorChange?: (color: string) => void;
  showAlpha?: boolean;
}

export interface ColorPickerState {
  visible: boolean;
  color: Color;
  buttonColor: string;
}

/* 用于点击显示隐藏的按钮层 */
export interface ColorPickerButtonProps {
  visible: boolean;
  onClick: () => void;
  prefixCls: string;
  buttonColor: string;
  buttonStyle?: object;
}

/* 颜色面板容器 */
export interface ColorPickerDropdownProps {
  prefixCls: string
  color: Color;
  close: () => void;
  buttonColor: string;
  setColor: (cb: (preColor: Color) => Color) => void;
  setButtonColor: (value: string) => void;
}

export interface ColorPickerDropdownState {
  inputColor: string;
}

/* 颜色面板右侧滑块区域 */
export interface ColorPickerSliderProps extends ColorPickerDropdownProps {
  vertical?: boolean;
}

export interface ColorPickerSliderState {
  thumbLeft: number;
  thumbTop: number;
}

/* 颜色面板左侧颜色块区域 */
export interface ColorPickerPanelProps extends ColorPickerDropdownProps {

}

export interface  ColorPickerPanelState {
  cursorLeft: number;
  cursorTop: number;
  background: string;
}