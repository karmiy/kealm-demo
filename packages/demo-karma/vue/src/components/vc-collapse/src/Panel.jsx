import PanelContent from './PanelContent';
import { initDefaultProps, getComponentFromProp } from '../../_util/props-util';
import { cloneElement } from '../../_util/vnode';
import { panelProps } from './commonProps';

export default {
  name: 'Panel',
  props: initDefaultProps(panelProps, {
    showArrow: true,
    active: false,
    destroyInactivePanel: false,
    headerClass: '',
    forceRender: false,
  }),
  methods: {
    handleItemClick() {
      this.$emit('itemClick');
    },
    handleKeyPress(e) {
      if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
        this.handleItemClick();
      }
    },
  },
  render() {
    const {
      prefixCls,
      headerClass,
      active,
      showArrow,
      destroyInactivePanel,
      disabled,
      openAnimation,
      accordion,
      forceRender,
      expandIcon,
      codeBox
    } = this.$props;
    const { $slots } = this;

    const transitionProps = {
      props: Object.assign({
        appear: true,
        css: false,
      }),
      on: { ...openAnimation },
    };
    const headerCls = {
      [`${prefixCls}-header`]: true,
      [headerClass]: headerClass,
    };
    const header = getComponentFromProp(this, 'header');
    const itemCls = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-active`]: active,
      [`${prefixCls}-item-disabled`]: disabled,
    };
    let icon = null;
    if (showArrow && typeof expandIcon === 'function') {
      icon = cloneElement(expandIcon(this.$props));
    }
    return (
        <div class={itemCls} role="tablist">
          <div
              class={headerCls}
              onClick={this.handleItemClick.bind(this)}
              onKeypress={this.handleKeyPress}
              role={accordion ? 'tab' : 'button'}
              tabIndex={disabled ? -1 : 0}
              aria-expanded={active}
          >
            {showArrow && (icon || <i class="salus-icon-arrow-down-o" />)}
            {header}
          </div>
          <transition {...transitionProps}>
            <PanelContent
                v-show={active}
                prefixCls={prefixCls}
                active={active}
                destroyInactivePanel={destroyInactivePanel}
                forceRender={forceRender}
                codeBox={codeBox}
                role={accordion ? 'tabpanel' : null}
            >
              {$slots.default}
            </PanelContent>
          </transition>
        </div>
    );
  },
};
