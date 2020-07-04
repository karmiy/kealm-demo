import PropTypes from '../_util/vue-types';
import { initDefaultProps, getOptionProps, getComponentFromProp } from '../_util/props-util';
import VcRate from '../vc-rate/public_api';
/*import Icon from '../icon';*/

export const RateProps = {
  prefixCls: PropTypes.string,
  count: PropTypes.number,
  value: PropTypes.value,
  defaultValue: PropTypes.value,
  allowHalf: PropTypes.bool,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  character: PropTypes.any,
  autoFocus: PropTypes.bool,
};

const Rate = {
  name: 'SlRate',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: initDefaultProps(RateProps, {
    prefixCls: 'salus-rate',
  }),
  methods: {
    focus() {
      this.$refs.refRate.focus();
    },
    blur() {
      this.$refs.refRate.blur();
    },
  },
  render() {
    const character = getComponentFromProp(this, 'character') || (
      <i class='salus-icon-star' />
    );
    const rateProps = {
      props: {
        character,
        ...getOptionProps(this),
      },
      on: this.$listeners,
      ref: 'refRate',
    };
    return <VcRate {...rateProps} />;
  },
};

/* istanbul ignore next */
Rate.install = function(Vue) {
  Vue.component(Rate.name, Rate);
};
export default Rate;
