import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import { ColorPickerPanelProps, ColorPickerPanelState } from './interface';
import draggableEvent from '../_util/draggableEvent';

class ColorPickerPanel extends React.Component<ColorPickerPanelProps, ColorPickerPanelState> {
  /* panel的DOM实例 */
  private _el: HTMLElement | null = null;
  state = {
    cursorLeft: 0,
    cursorTop: 0,
    background: 'hsl(0, 100%, 50%)',
  }
  componentDidMount() {
    draggableEvent(this._el!, {
      drag: (event: MouseEvent) => {
        this.handleDrag(event);
      },
      end: (event: MouseEvent) => {
        this.handleDrag(event);
      }
    });
    this.update(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // color改变后重新修改left、top、 background
    this.update(nextProps)
  }

  /**
   * 根据当前color更新 left、top、 background
   */
  update = ({ color }): void => {
    const saturation = color.get('saturation');
    const value = color.get('value');

    const el = this._el!;
    let { clientWidth: width, clientHeight: height } = el;

    this.setState({
      cursorLeft: saturation * width / 100,
      cursorTop: (100 - value) * height / 100,
      background: `hsl(${color.get('hue')}, 100%, 50%)`
    });
  }

  /**
   * 执行拖拽函数
   */
  handleDrag = (event: MouseEvent | React.MouseEvent): void => {
    // 计算left、top
    const el = this._el!;
    const rect = el.getBoundingClientRect();

    let left = event.clientX - rect.left;
    let top = event.clientY - rect.top;

    left = Math.max(0, left);
    left = Math.min(left, rect.width);

    top = Math.max(0, top);
    top = Math.min(top, rect.height);

    // 重新调整color
    this.props.setColor((preColor) => {
      preColor.set({
        saturation: left / rect.width * 100,
        value: 100 - top / rect.height * 100
      });
      return preColor
    })
  }

  render(): React.ReactNode {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-panel`} style={{backgroundColor: this.state.background}} ref={ele => this._el = ele}>
        {/* 白色渐变区域 */}
        <div className={`${prefixCls}-panel-base ${prefixCls}-panel-white`} />
        {/* 黑色渐变区域 */}
        <div className={`${prefixCls}-panel-base ${prefixCls}-panel-black`} />
        {/* 鼠标的点位置 */}
        <div className={`${prefixCls}-panel-cursor`} style={{top: this.state.cursorTop, left: this.state.cursorLeft}} />
      </div>
    )
  }
}

polyfill(ColorPickerPanel);

export default ColorPickerPanel;