import PropTypes from '../../_util/vue-types';
import BaseMixin from '../../_util/BaseMixin';
import { getComponentFromProp } from '../../_util/props-util';
function noop() {}

export default {
  name: 'Star',
  mixins: [BaseMixin],
  props: {
    value: PropTypes.number,
    index: PropTypes.number,
    prefixCls: PropTypes.string,
    allowHalf: PropTypes.bool,
    disabled: PropTypes.bool,
    character: PropTypes.any,
    focused: PropTypes.bool,
    count: PropTypes.number,
  },
  methods: {
    onHover(e) {
      const { index } = this;
      this.$emit('hover', e, index);
    },
    onClick(e) {
      const { index } = this;
      this.$emit('click', e, index);
    },
    onKeyDown(e) {
      const { index } = this.$props;
      if (e.keyCode === 13) {
        this.__emit('click', e, index);
      }
    },
    getClassName() {
      const { prefixCls, index, value, allowHalf, focused } = this;
      const starValue = index + 1;
      let className = prefixCls;
      if (value === 0 && index === 0 && focused) {
        className += ` ${prefixCls}-focused`;
      } else if (allowHalf && value + 0.5 === starValue) {
        className += ` ${prefixCls}-half ${prefixCls}-active`;
        if (focused) {
          className += ` ${prefixCls}-focused`;
        }
      } else {
        className += starValue <= value ? ` ${prefixCls}-full` : ` ${prefixCls}-zero`;
        if (starValue === value && focused) {
          className += ` ${prefixCls}-focused`;
        }
      }
      return className;
    },
  },
  render() {
    const { onHover, onClick, onKeyDown, disabled, prefixCls, index, count, value } = this;

    const character = getComponentFromProp(this, 'character');
    return (
      <li
        class={this.getClassName()}
        onClick={disabled ? noop : onClick}
        onKeydown={disabled ? noop : onKeyDown}
        onMousemove={disabled ? noop : onHover}
        role="radio"
        aria-checked={value > index ? 'true' : 'false'}
        aria-posinset={index + 1}
        aria-setsize={count}
      >
        <div class={`${prefixCls}-first`}>{character}</div>
        <div class={`${prefixCls}-second`}>{character}</div>
      </li>
    );
  },
};
