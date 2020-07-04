import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import { ColorPickerSliderProps, ColorPickerSliderState } from './interface';
import draggableEvent from '../_util/draggableEvent';

class ColorPickerSlider extends React.Component<ColorPickerSliderProps, ColorPickerSliderState> {
  static defaultProps = {
    vertical: true,
  };
  state = {
    thumbLeft: 0,
    thumbTop: 0,
  }
  /* slider bar thumb的DOM元素 */
  private _el: HTMLDivElement | null = null;
  private _bar: HTMLDivElement | null = null;
  private _thumb: HTMLDivElement | null = null;

  constructor(props: ColorPickerSliderProps) {
    super(props);
    /*this.state = {
      thumbLeft: this.getThumbLeft(this.props),
      thumbTop: this.getThumbTop(this.props),
    }*/
  }

  componentWillReceiveProps(nextProps) {
    // color改变后重新修改left、top
    this.update(nextProps)
  }

  componentDidMount() {
    this.setState({
      thumbLeft: this.getThumbLeft(this.props),
      thumbTop: this.getThumbTop(this.props),
    });
    // 初始化拖拽事件
    const dragConfig = {
      drag: (event: MouseEvent) => {
        this.handleDrag(event);
      },
      end: (event: MouseEvent) => {
        this.handleDrag(event);
      }
    }

    draggableEvent(this._bar!, dragConfig);
    draggableEvent(this._thumb!, dragConfig);
  }

  /**
   * _bar点击事件
   */
  handleClick = (event: React.MouseEvent): void => {
    const thumb = this._thumb!;
    const target = event.target;

    if (target !== thumb) {
      this.handleDrag(event);
    }
  }

  /**
   * 执行拖拽函数
   */
  handleDrag = (event: MouseEvent | React.MouseEvent): void => {
    const rect = this._el!.getBoundingClientRect();
    const thumb = this._thumb!;
    let hue;
    // 计算hue值( 0 - 360 )
    if (!this.props.vertical) {
      let left = event.clientX - rect.left;
      left = Math.min(left, rect.width - thumb.offsetWidth / 2);
      left = Math.max(thumb.offsetWidth / 2, left);

      hue = Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 360);
    } else {
      let top = event.clientY - rect.top;
      top = Math.min(top, rect.height - thumb.offsetHeight / 2);
      top = Math.max(thumb.offsetHeight / 2, top);

      hue = Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 360);
    }
    // 重新设置color
    this.props.setColor((preColor) => {
      preColor.set({hue});
      return preColor
    });
  }

  /**
   * 计算left
   */
  getThumbLeft = ({ vertical, color }: ColorPickerSliderProps) => {

    if (vertical) return 0;
    const el = this._el;
    const hue = color.get('hue');

    if (!el) return 0;
    return Math.round(hue * (el.offsetWidth - this._thumb!.offsetWidth / 2) / 360);
  }

  /**
   * 计算top
   */
  getThumbTop = ({ vertical, color }: ColorPickerSliderProps) => {
    if (!vertical) return 0;
    const el = this._el;
    const hue = color.get('hue');

    if (!el) return 0;
    return Math.round(hue * (el.offsetHeight - this._thumb!.offsetHeight / 2) / 360);
  }


  /**
   * 调整left、top
   */
  update = (props) => {
    this.setState({
      thumbLeft: this.getThumbLeft(props),
      thumbTop: this.getThumbTop(props),
    })
  }

  render(): React.ReactNode {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-slider`} ref={ele => this._el = ele}>
        {/* 右侧彩色调色板 */}
        <div className={`${prefixCls}-slider-bar`} ref={ele => this._bar = ele} onClick={this.handleClick} />
        {/* 彩色调色板的滑块 */}
        <div className={`${prefixCls}-slider-thumb`} ref={ele => this._thumb = ele} style={{top: this.state.thumbTop, left: this.state.thumbLeft}} />
      </div>
    )
  }
}

polyfill(ColorPickerSlider);

export default ColorPickerSlider;