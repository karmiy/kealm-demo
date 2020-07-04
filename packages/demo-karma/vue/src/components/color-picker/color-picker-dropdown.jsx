import { colorPickerDropdownProps } from './interface';
import Button from '../button/public_api';
import Input from '../input/public_api';
import ColorPickerPanel from './color-picker-panel';
import ColorPickerSlider from './color-picker-slider';

export default {
  name: 'SlColorPickerDropdown',
  props: colorPickerDropdownProps,
  data() {
    return {
      inputColor: this.$props.buttonColor || '',
    }
  },
  methods: {
    /**
     * 清空
     */
    clearHandle() {
      this.inputColor = '';
      this.$emit('change', '');
    },
    /**
     * 确认提交
     */
    confirmHanle() {
      this.$props.color.fromString(this.inputColor);
      this.$emit('change', this.inputColor);
    },
  },
  computed: {
    /**
     *   实时计算当前颜色值
     */
    currentColor() {
      const { color } = this.$props;
      return color && color.value ? color.value : ''
    }
  },
  watch: {
    /**
     *   监听颜色值变化，改变input输入框的值
     */
    currentColor(val) {
      this.inputColor = val;
    }
  },
  render() {
    const { prefixCls } = this.$props;
    const props = {
      props:  this.$props,
    }
    return (
      <div class={`${prefixCls}-dropdown`}>
        <div class={`${prefixCls}-top`}>
          {/* panel颜色区块区域 */}
          <ColorPickerPanel {...props} />
          {/* slider */}
          <ColorPickerSlider {...props} />
        </div>
        <div class={`${prefixCls}-bottom`}>
          <div class={'input-wrap'}>
            <Input value={this.inputColor} />
          </div>
          <Button type={'link'}onClick={this.clearHandle}>清空</Button>
          <Button onClick={this.confirmHanle}>确定</Button>
        </div>
      </div>
    );
  },
};
