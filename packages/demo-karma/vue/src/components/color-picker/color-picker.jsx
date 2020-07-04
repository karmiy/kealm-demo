import ColorPickerButton from './color-picker-button';
import ColorPickerDropdown from './color-picker-dropdown';
import Trigger from "../vc-trigger/public_api";
import { initDefaultProps } from "../_util/props-util";
import { colorPickerProps } from './interface';
import {Color} from "./color";

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const targetOffset = [0, 0];

const placements = {
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset,
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset,
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset,
  },
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset,
  },
};

export default {
  name: 'SlColorPicker',
  model: {
    prop: 'color',
    event: 'change',
  },
  props: initDefaultProps(colorPickerProps, {
    zIndex: 100,
    prefixCls: 'salus-color-picker',
  }),
  data() {
    const {
      showAlpha,
      colorFormat,
      defaultColor,
      color,
    } = this.$props;
    // 初始化颜色对象Color
    let colorController = new Color({
      enableAlpha: showAlpha,
      format: colorFormat
    });
    // 如果有初始值则修改初始Color
    if(color || defaultColor) {
      colorController.fromString(color || defaultColor);
    }
    return {
      open: false,
      colorController,
      buttonColor: color || defaultColor || '',
    }
  },
  methods: {
    /**
     *  弹窗显示内容
     */
    getPanelElement() {
      const { $props, colorController: color, buttonColor } = this;
      const dropdownProps = {
        props: {
          prefixCls: $props.prefixCls,
          buttonColor,
          color,
        },
        on: {
          change: this.handleChange,
        }
      }
      return (
        <ColorPickerDropdown {...dropdownProps}  />
      )
    },
    /**
     *  窗口可见改变回调
     */
    onVisibleChange(open) {
      this.open = open;
    },
    /**
     *   按钮点击显示隐藏选择器
     */
    switchVisible() {
      this.open = !this.open;
    },
    /**
     *   修改颜色
     */
    handleChange(colorString) {
      this.buttonColor = colorString;
      this.open = false;
      this.$emit('change', this.buttonColor);
    },
  },
  render() {
    const { open, buttonColor, buttonStyle, $props: props } = this;
    const { prefixCls, zIndex, getColorPopContainer } = props;
    const pickerButtonProps = {
      props: {
        prefixCls,
        buttonColor,
        buttonStyle,
        visible: open,
      },
      on: {
        click: this.switchVisible,
      }
    };
    return (
      <Trigger
        prefixCls={prefixCls}
        popupAlign={{}}
        builtinPlacements={placements}
        popupPlacement={'bottomLeft'}
        action={['click']}
        destroyPopupOnHide={false}
        popupStyle={{zIndex, position: 'absolute'}}
        popupTransitionName={'slide-up'}
        popupClassName={'salus-drop-layer'}
        popupVisible={open}
        getPopupContainer={getColorPopContainer}
        onPopupVisibleChange={this.onVisibleChange}
      >
        <template slot="popup">{this.getPanelElement()}</template>
        <ColorPickerButton {...pickerButtonProps} />
      </Trigger>
    )
  },
};
