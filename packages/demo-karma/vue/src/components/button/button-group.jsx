import { filterEmpty } from '../_util/props-util';
const ButtonGroupProps = {
  prefixCls: {
    default: 'salus-button-group',
    type: String,
  },
  size: {
    validator(value) {
      return ['small', 'middle', 'default'].includes(value);
    },
  },
  gap: {
    default: false,
    type: Boolean,
  }
};
export { ButtonGroupProps };
export default {
  name: 'SlButtonGroup',
  props: ButtonGroupProps,
  computed: {
    classes() {
      const { prefixCls, size, gap } = this;
      return [
        {
          [`${prefixCls}`]: true,
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-gap`]: gap,
        },
      ];
    },
  },
  render() {
    const { classes, $slots } = this;
    return <div class={classes}>{filterEmpty($slots.default)}</div>;
  },
};
