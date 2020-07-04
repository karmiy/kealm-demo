import { colorPickerSliderProps } from './interface';
import { initDefaultProps } from "../_util/props-util";
import draggableEvent from '../_util/draggableEvent';

export default {
  name: 'SlColorPickerSlider',
  props: initDefaultProps(colorPickerSliderProps, {
    vertical: true,
  }),
  data() {
    return {
      thumbLeft: 0,
      thumbTop: 0,
    }
  },
  mounted() {
    this.update();
    // 初始化拖拽事件
    const dragConfig = {
      drag: (event) => {
        this.handleDrag(event);
      },
      end: (event) => {
        this.handleDrag(event);
      }
    }
    const { barRef, thumbRef } = this.$refs;
    draggableEvent(barRef, dragConfig);
    draggableEvent(thumbRef, dragConfig);
  },
  watch: {
    hueValue() {
      this.update();
    }
  },
  computed: {
    hueValue() {
      const hue = this.color.get('hue');
      return hue;
    }
  },
  methods: {
    /**
     * 计算left
     */
    getThumbLeft() {
      const { vertical, color } = this.$props,
            { elRef, thumbRef } = this.$refs;

      if (vertical) return 0;
      const el = elRef;
      const hue = color.get('hue');

      if (!el) return 0;
      return Math.round(hue * (el.offsetWidth - thumbRef.offsetWidth / 2) / 360);
    },
    /**
     * 计算top
     */
    getThumbTop() {
      const { vertical, color } = this.$props,
        { elRef, thumbRef } = this.$refs;
      if (!vertical) return 0;
      const el = elRef;
      const hue = color.get('hue');

      if (!el) return 0;
      return Math.round(hue * (el.offsetHeight - thumbRef.offsetHeight / 2) / 360);
    },
    /**
     * 调整left、top
     */
    update() {
      Object.assign(this, {
        thumbLeft: this.getThumbLeft(),
        thumbTop: this.getThumbTop(),
      });
    },
    /**
     * 执行拖拽函数
     */
    handleDrag(event) {
      const { color } = this.$props;
      const { elRef, thumbRef } = this.$refs;
      const { change } = this.$listeners;
      const rect = elRef.getBoundingClientRect();
      const thumb = thumbRef;
      let hue;
      // 计算hue值( 0 - 360 )
      if (!this.$props.vertical) {
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
      color.set({hue});
      //change(color);
      //this.$emit('change', color);
    }
  },
  render() {
    const { prefixCls } = this.$props;
    return (
      <div class={`${prefixCls}-slider`} ref={'elRef'}>
        {/* 右侧彩色调色板 */}
        <div class={`${prefixCls}-slider-bar`} ref={'barRef'} />
        {/* 彩色调色板的滑块 */}
        <div class={`${prefixCls}-slider-thumb`} ref={'thumbRef'} style={{top: `${this.thumbTop}px`, left: `${this.thumbLeft}px`}} />
      </div>
    );
  },
};
