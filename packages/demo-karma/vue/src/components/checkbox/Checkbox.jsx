import PropTypes from '../_util/vue-types';
import classNames from 'classnames';
import VcCheckbox from '../vc-checkbox/public_api';
import { getOptionProps, getAttrs } from '../_util/props-util';
import hasProp from "../_util/props-util";
function noop() {}

export default {
  name: 'SlCheckbox',
  inheritAttrs: false,
  model: {
    prop: 'checked',
  },
  props: {
    prefixCls: {
      default: 'salus-checkbox',
      type: String,
    },
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    isGroup: Boolean,
    value: PropTypes.any,
    name: String,
    id: String,
    indeterminate: Boolean,
    type: PropTypes.string.def('checkbox'),
    autoFocus: Boolean,
    displayButton: Boolean
  },
  data() {
    const checked = hasProp(this, 'checked') ? this.checked : this.defaultChecked || false;
    return {
      sChecked: checked
    }
  },
  inject: {
    checkboxGroupContext: { default: () => null },
  },
  watch: {
    checked(val) {
      this.sChecked = val;
    }
  },
  methods: {
    handleChange(event) {
      const targetChecked = event.target.checked;
      const props = getOptionProps(this);
      if (props.disabled) {
        return;
      }
      if (!('checked' in props)) {
        this.sChecked = targetChecked;
      }
      this.$emit('input', targetChecked);
      this.$emit('change', event);
    },
    focus() {
      this.$refs.vcCheckbox.focus();
    },
    blur() {
      this.$refs.vcCheckbox.blur();
    },
  },

  render() {
    let { checkboxGroupContext: checkboxGroup, $listeners, $slots, sChecked } = this;
    const props = getOptionProps(this);
    const children = $slots.default;
    const { mouseenter = noop, mouseleave = noop, ...restListeners } = $listeners;
    const { prefixCls, indeterminate, displayButton, ...restProps } = props;
    const checkboxProps = {
      props: { ...restProps, prefixCls },
      on: restListeners,
      attrs: getAttrs(this),
    };
    if (checkboxGroup) {
      checkboxProps.on.change = (...args) => {
        this.$emit('change', ...args);
        checkboxGroup.toggleOption({ label: children, value: props.value });
      };
      // checkboxProps.props.checked = checkboxGroup.sValue.indexOf(props.value) !== -1;
      sChecked = checkboxGroup.sValue.indexOf(props.value) !== -1;
      checkboxProps.props.disabled = props.disabled || checkboxGroup.disabled;
    } else {
      checkboxProps.on.change = this.handleChange;
    }
    const prefixClsBtn = displayButton ? prefixCls + '-button' : prefixCls;
    const classString = classNames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-button-wrapper`]: displayButton,
      [`${prefixClsBtn}-wrapper-checked`]: sChecked,
      [`${prefixClsBtn}-wrapper-disabled`]: checkboxProps.props.disabled,
      [`${prefixClsBtn}-wrapper-indeterminate`]: indeterminate,
    });
    const checkboxClass = classNames({
      [`${prefixClsBtn}-indeterminate`]: indeterminate,
    });
    return (
        <label class={classString} onMouseenter={mouseenter} onMouseleave={mouseleave}>
          <VcCheckbox {...checkboxProps} class={checkboxClass} ref="vcCheckbox" />
          {children !== undefined && <span>{children}</span>}
        </label>
    );
  },
};
