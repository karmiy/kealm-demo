import { colorPickerPanelProps } from './interface';
import draggableEvent from '../_util/draggableEvent';

export default {
  name: 'SlColorPickerPanel',
  props: colorPickerPanelProps,
  data() {
    return {
      cursorLeft: 0,
      cursorTop: 0,
      background: 'hsl(0, 100%, 50%)',
    }
  },
  computed: {
    colorValue() {
      const hue = this.color.get('hue');
      const value = this.color.get('value');
      return { hue, value };
    }
  },
  watch: {
    colorValue() {
      this.update();
    }
  },
  mounted() {
    const { elRef: el } = this.$refs;
    draggableEvent(el, {
      drag: (event) => {
        this.handleDrag(event);
      },
      end: (event) => {
        this.handleDrag(event);
      }
    });
    this.update();
  },
  methods: {
    /**
     * 根据当前color更新 left、top、 background
     */
    update() {
      const { color } = this.$props,
            { elRef: el } = this.$refs;
      const saturation = color.get('saturation');
      const value = color.get('value');

      let { clientWidth: width, clientHeight: height } = el;

      Object.assign(this, {
        cursorLeft: saturation * width / 100,
        cursorTop: (100 - value) * height / 100,
        background: `hsl(${color.get('hue')}, 100%, 50%)`,
      });
    },
    /**
     * 执行拖拽函数
     */
    handleDrag(event) {
      const { elRef: el } = this.$refs,
            { color } = this.$props;
      // 计算left、top
      const rect = el.getBoundingClientRect();

      let left = event.clientX - rect.left;
      let top = event.clientY - rect.top;

      left = Math.max(0, left);
      left = Math.min(left, rect.width);

      top = Math.max(0, top);
      top = Math.min(top, rect.height);

      // 重新调整color
      color.set({
        saturation: left / rect.width * 100,
        value: 100 - top / rect.height * 100
      });
    },
  },
  render() {
    const { prefixCls } = this.$props;
    return (
      <div class={`${prefixCls}-panel`} ref={'elRef'} style={{backgroundColor: this.background}} >
        {/* 白色渐变区域 */}
        <div class={`${prefixCls}-panel-base ${prefixCls}-panel-white`} />
        {/* 黑色渐变区域 */}
        <div class={`${prefixCls}-panel-base ${prefixCls}-panel-black`} />
        {/* 鼠标的点位置 */}
        <div class={`${prefixCls}-panel-cursor`} style={{top: `${this.cursorTop}px`, left: `${this.cursorLeft}px`}} />
      </div>
    );
  },
};
