import PropTypes from '../_util/vue-types';
import { getStyle, getComponentFromProp } from '../_util/props-util';
import BaseMixin from '../_util/BaseMixin';

function noop() {}

export default {
  mixins: [BaseMixin],
  props: {
    duration: PropTypes.number.def(3000),
    closable: PropTypes.bool,
    prefixCls: PropTypes.string,
    update: PropTypes.bool,
    closeIcon: PropTypes.any,
    content: PropTypes.any,
    options: PropTypes.object.def({}),
  },

  mounted() {
    this.startCloseTimer();
  },
  updated() {
    if (this.update) {
      this.restartCloseTimer();
    }
  },

  beforeDestroy() {
    this.clearCloseTimer();
    this.willDestroy = true; // beforeDestroy调用后依然会触发onMouseleave事件
  },
  watch: {
    duration() {
      this.restartCloseTimer();
    },
  },
  methods: {
    close() {
      this.clearCloseTimer();
      this.__emit('close');
    },

    startCloseTimer() {
      this.clearCloseTimer();
      if (!this.willDestroy && this.duration) {
        this.closeTimer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },

    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    restartCloseTimer() {
      this.clearCloseTimer();
      this.startCloseTimer();
    },
    /**
     * 渲染关闭按钮
     */
    renderClose() {
      return (
        <a class='salus-alert-global-close salus-close' onClick={this.close}>
          <i class="salus-icon-pop-close-o" />
        </a>
      )
    },
  },

  render(h) {
    const {
      prefixCls,
      clearCloseTimer,
      startCloseTimer,
      options,
      content,
      $listeners,
    } = this;
    const componentClass = `${prefixCls}-notice`;
    const className = {
      [`${componentClass}`]: 1,
    };
    const style = getStyle(this);
    const closeIcon = getComponentFromProp(this, 'closeIcon');
    const props = {
      class: className,
      style: style,
      on: {
        mouseenter: options.pauseOnHover ? clearCloseTimer : noop,
        mouseleave: options.pauseOnHover ? startCloseTimer : noop,
        click: $listeners.click || noop,
      }
    };
    return (
      <div
        {...props}
      >
        <div class={`${componentClass}-content`}>{typeof content === 'function' ? content(h, this.renderClose()) : content}</div>
      </div>
    );
  },
};
