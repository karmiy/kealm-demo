import PropTypes from '../_util/vue-types';
/*import Icon from '../icon';*/
import getTransitionProps from '../_util/getTransitionProps';
import omit from 'omit.js';
import Wave from '../_util/wave';
import { hasProp } from '../_util/props-util';
import BaseMixin from '../_util/BaseMixin';

export default {
  name: 'SlTag',
  mixins: [BaseMixin],
  props: {
    prefixCls: PropTypes.string.def('salus-tag'),
    color: PropTypes.string,
    fontColor: PropTypes.string,
    closable: PropTypes.bool.def(false),
    closeIcon: PropTypes.any, // 插槽
    visible: PropTypes.bool,
    afterClose: PropTypes.func,
  },
  model: {
    prop: 'visible',
    event: 'close.visible',
  },
  data() {
    let _visible = true;
    if (hasProp(this, 'visible')) {
      _visible = this.visible;
    }
    return {
      _visible,
    };
  },
  watch: {
    visible(val) {
      this.setState({
        _visible: val,
      });
    },
  },
  methods: {
    setVisible(visible, e) {
      this.$emit('close', e);
      this.$emit('close.visible', false);
      if (e.defaultPrevented) {
        return;
      }
      if (!hasProp(this, 'visible')) {
        this.setState({ _visible: visible });
      }
    },

    handleIconClick(e) {
      this.setVisible(false, e);
    },

    animationEnd() {
      const afterClose = this.afterClose;
      if (afterClose) {
        afterClose();
      }
    },

    isPresetColor(color) {
      if (!color) {
        return false;
      }
      return /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(
        color,
      );
    },
    getTagStyle() {
      const { color, fontColor } = this.$props;
      const isPresetColor = this.isPresetColor(color);
      return {
        backgroundColor: color && !isPresetColor ? color : undefined,
        color: fontColor
      };
    },

    getTagClassName() {
      const { prefixCls, color } = this.$props;
      const isPresetColor = this.isPresetColor(color);
      return {
        [prefixCls]: true,
        [`${prefixCls}-${color}`]: isPresetColor,
        [`${prefixCls}-has-color`]: color && !isPresetColor,
      };
    },

    renderCloseIcon(prefixCls) {
      const { closable } = this.$props,
              closeIcon = this.$slots.closeIcon;
      const closeContent = closable ? (closeIcon || <i class='salus-icon-pop-close-o' onClick={this.handleIconClick} />) : null;
      return closable ? <span class={`${prefixCls}-icon-contianer`}>{closeContent}</span> : null;
    },
  },

  render() {
    const { prefixCls } = this.$props;
    const { _visible: visible } = this.$data;
    const tag = (
      <div
        v-show={visible}
        {...{ on: omit(this.$listeners, ['close']) }}
        class={this.getTagClassName()}
        style={this.getTagStyle()}
      >
        {this.$slots.default}
        {this.renderCloseIcon(prefixCls)}
      </div>
    );
    const transitionProps = getTransitionProps(`${prefixCls}-zoom`, {
      appear: false,
      afterLeave: this.animationEnd,
    });
    return (
      <Wave>
        <transition {...transitionProps}>{tag}</transition>
      </Wave>
    );
  },
};
