import PropTypes from '../_util/vue-types';
import Button from '../button/public_api';
import { colorPickerButtonProps } from './interface';

export default {
  name: 'SlColorPickerButton',
  props: colorPickerButtonProps,
  methods: {
    /**
     *   button样式
     */
    getStyle() {
      const { buttonColor, buttonStyle } = this.$props;
      let style = {
        backgroundColor: buttonColor
      };
      Object.assign(style, buttonStyle || {});

      return style;
    }
  },
  render() {
    const { click } = this.$listeners;
    const { visible, prefixCls } = this.$props;
    const icon = visible ? 'salus-icon-pop-close-o' : 'salus-icon-triangle-down';
    return (
      <Button class={`${prefixCls}-button`} style={this.getStyle()} onClick={click} iconOnly>
        <i class={icon} />
      </Button>
    );
  },
};
