import PropTypes from '../_util/vue-types';

export default {
  name: 'SlCardGrid',
  __SL_CARD_GRID: true,
  props: {
    prefixCls: PropTypes.string.def('salus-card'),
  },
  render() {
    const { prefixCls = 'salus-card' } = this.$props;
    const classString = {
      [`${prefixCls}-grid`]: true,
    };
    return (
      <div {...{ on: this.$listeners }} class={classString}>
        {this.$slots.default}
      </div>
    );
  },
};
