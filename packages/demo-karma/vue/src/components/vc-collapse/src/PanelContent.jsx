import PropTypes from '../../_util/vue-types';

export default {
  name: 'PanelContent',
  props: {
    prefixCls: PropTypes.string,
    active: PropTypes.bool,
    codeBox: PropTypes.bool,
    destroyInactivePanel: PropTypes.bool,
    forceRender: PropTypes.bool,
    role: PropTypes.any,
  },
  data() {
    return {
      _active: undefined,
    };
  },
  render() {
    this._active = this.forceRender || this._active || this.active;
    if (!this._active) {
      return null;
    }
    const { prefixCls, active, codeBox, destroyInactivePanel, forceRender, role } = this.$props;
    const { $slots } = this;
    const contentCls = {
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-content-active`]: active,
      [`${prefixCls}-code-content`]: codeBox,
    };
    const child =
        !forceRender && !active && destroyInactivePanel ? null : (
            <div class={`${prefixCls}-content-box`}>{$slots.default}</div>
        );
    return (
        <div class={contentCls} role={role}>
          {child}
        </div>
    );
  },
};
