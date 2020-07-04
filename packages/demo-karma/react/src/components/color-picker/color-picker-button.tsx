import * as React from 'react';
import Button from '../button';
import { ColorPickerButtonProps } from './interface';


class ColorPickerButton extends React.Component<ColorPickerButtonProps> {
  click = () => {
    this.props.onClick()
  }

  /**
   *   button样式
   */
  getStyle = () => {
    let style = {
      backgroundColor: this.props.buttonColor
    };
    Object.assign(style, this.props.buttonStyle || {});

    return style;
  }

  renderButton = () => {
    const icon = this.props.visible ? 'salus-icon-pop-close-o' : 'salus-icon-triangle-down';
    return (
      <Button icon={icon} className={`${this.props.prefixCls}-button`} style={this.getStyle()} onClick={this.click} />
    )
  }
  render(): React.ReactNode {
    return (
      this.renderButton()
    )
  }
}

export default ColorPickerButton;