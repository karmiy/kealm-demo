import * as React from 'react';
import Input from '../input';
import Button from '../button';
import ColorPickerPanel from './color-picker-panel';
import ColorPickerSlider from './color-picker-slider';
import { ColorPickerDropdownProps, ColorPickerDropdownState } from './interface';

class ColorPickerDropdown extends React.Component<ColorPickerDropdownProps, ColorPickerDropdownState> {

  private _el: HTMLElement | null = null;
  constructor(props: ColorPickerDropdownProps) {
    super(props);
    this.state = {
      inputColor: this.props.buttonColor,
    }
    // document.addEventListener('click', this.clickOutsideHandle);
  }

  /**
   * color改变时修改input值
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      inputColor: this.props.buttonColor === nextProps.buttonColor ? this.currentColor() : nextProps.buttonColor,
    })
  }

  componentWillUnmount() {
    // 移除点击外围事件
    // document.removeEventListener('click', this.clickOutsideHandle);
  }

  /**
   * 获得当前16进制颜色
   */
  currentColor = () => {
    return this.props.color && this.props.color.value ? this.props.color.value : '';
  }

  /**
   * input onchange事件
   */
  inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputColor: e.target.value
    })
  }

  /**
   * 确认提交
   */
  confirmHanle = (): void => {
    this.props.setColor((preColor) => {
      preColor.fromString(this.state.inputColor);
      return preColor
    })
    this.props.setButtonColor(this.state.inputColor);
  }

  /**
   * 清空
   */
  clearHandle = (): void => {
    this.setState({
      inputColor: '',
    }, () => {
      this.props.setButtonColor('');
    })
  }

  /**
   * 点击外围关闭
   */
  clickOutsideHandle = event => {
    const target = event.target;
    if (this._el!.contains(target)) {
      return false;
    }
    this.props.close();
  }

  render(): React.ReactNode {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-dropdown`} ref={ element => this._el = element}>
        <div className={`${prefixCls}-top`}>
          {/* panel颜色区块区域 */}
          <ColorPickerPanel {...this.props} />
          {/* slider */}
          <ColorPickerSlider {...this.props} />
        </div>
        <div className={`${prefixCls}-bottom`}>
          <div className={'input-wrap'}>
            <Input value={this.state.inputColor} onChange={this.inputChangeHandle} />
          </div>
          <Button type={'link'} onClick={this.clearHandle}>清空</Button>
          <Button onClick={this.confirmHanle}>确定</Button>
        </div>
      </div>
    )
  }
}

export default ColorPickerDropdown;