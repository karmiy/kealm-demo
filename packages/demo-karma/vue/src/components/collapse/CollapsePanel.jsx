import { getOptionProps, getComponentFromProp } from '../_util/props-util';
import VcCollapse, { panelProps } from '../vc-collapse/public_api';

export default {
  name: 'SlCollapsePanel',
  props: {
    ...panelProps,
  },
  render() {
    const { prefixCls, showArrow = true, $listeners } = this;
    const collapsePanelClassName = {
      [`${prefixCls}-no-arrow`]: !showArrow,
    };
    const rcCollapePanelProps = {
      props: {
        ...getOptionProps(this),
      },
      class: collapsePanelClassName,
      on: $listeners,
    };
    const header = getComponentFromProp(this, 'header');
    return (
        <VcCollapse.Panel {...rcCollapePanelProps}>
          {this.$slots.default}
          {header ? <template slot="header">{header}</template> : null}
          {/*<template slot="header">展开查看Code</template>*/}
        </VcCollapse.Panel>
    );
  },
};
