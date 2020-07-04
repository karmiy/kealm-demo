import * as React from 'react';
import * as PropTypes from 'prop-types';
import ColorPickerButton from './color-picker-button';
import ColorPickerDropdown from './color-picker-dropdown';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Trigger from 'rc-trigger';
import { Color } from './color';
import { ColorPickerProps, ColorPickerState } from './interface';

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


class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  static defaultProps = {
    zIndex: 100,
  };
  static propTypes = {
    color: PropTypes.string,
    buttonStyle: PropTypes.object,
    zIndex: PropTypes.number,
  };

  constructor(props: ColorPickerProps) {
    super(props);
    const {
      showAlpha,
      colorFormat,
      defaultColor,
    } = this.props;
    // 初始化颜色对象Color
    let color = new Color({
      enableAlpha: showAlpha,
      format: colorFormat
    });
    // 如果有初始值则修改初始Color
    if(defaultColor) {
      color.fromString(defaultColor);
    }
    this.state = {
      visible: false,
      color,
      buttonColor: defaultColor || ''
    }
  }
  /**
   *   按钮点击显示隐藏选择器
   */
  switchVisible = () => {
    this.setState(({visible}) => ({visible: !visible}))
  }

  // 修改颜色
  setColor = (cb: (preColor: Color) => Color) => {
    cb && this.setState(({color}) => {
      return {
        color: cb(color)
      }
    })
  }

  /**
   *   修改按钮颜色
   */
  setButtonColor = (value: string) => {
    this.setState({
      buttonColor: value,
      visible: false,
    }, () => {
      this.props.colorChange && this.props.colorChange(value);
    })
  }

  /**
   *   渲染下拉框区域
   */
  renderDropdownPicker = (prefixCls) => {
    return (
      <ColorPickerDropdown
        prefixCls={prefixCls}
        color={this.state.color}
        close={this.switchVisible}
        buttonColor={this.state.buttonColor}
        setColor={this.setColor}
        setButtonColor={this.setButtonColor}
      />
    )
  }

  renderPicker = ({ getPrefixCls }: ConfigConsumerProps) => {
    const prefixCls = getPrefixCls('color-picker');
    const { buttonStyle } = this.props;
    const dropdownPicker = this.renderDropdownPicker(prefixCls);
    return (
      <Trigger
        popup={dropdownPicker}
        popupAlign={{}}
        builtinPlacements={placements}
        popupPlacement={'bottomLeft'}
        action={['click']}
        destroyPopupOnHide
        popupStyle={{zIndex: this.props.zIndex}}
        popupTransitionName={'slide-up'}
        popupVisible={this.state.visible}
        onPopupVisibleChange={() => {}}
        popupClassName={'salus-drop-layer'}
      >
        <ColorPickerButton visible={this.state.visible} prefixCls={prefixCls} buttonStyle={buttonStyle} onClick={this.switchVisible} buttonColor={this.state.buttonColor}></ColorPickerButton>
      </Trigger>
    )
  }
  render() {
    return (
      <ConfigConsumer>{this.renderPicker}</ConfigConsumer>
    )
  }
}

export default ColorPicker;