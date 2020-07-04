import animation from '../_util/openAnimation';
import { getOptionProps, initDefaultProps } from '../_util/props-util';
import VcCollapse, { collapseProps } from '../vc-collapse/public_api';
// import Icon from '../icon';
export default {
  name: 'SlCollapse',
  model: {
    prop: 'activeKey',
    event: 'change',
  },
  props: initDefaultProps(collapseProps, {
    prefixCls: 'salus-collapse',
    bordered: true,
    openAnimation: animation,
  }),
  methods: {
    renderExpandIcon() {
      return <i class="salus-icon-arrow-right-o" />;
    },
  },
  render() {
    const { prefixCls, bordered, $listeners } = this;
    const collapseClassName = {
      [`${prefixCls}-borderless`]: !bordered,
    };
    const rcCollapeProps = {
      props: {
        ...getOptionProps(this),
        expandIcon: this.renderExpandIcon,
      },
      class: collapseClassName,
      on: $listeners,
    };
    return <VcCollapse {...rcCollapeProps}>{this.$slots.default}</VcCollapse>;
  },
};
