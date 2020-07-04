import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import RcCheckbox from '../rc-checkbox';
import shallowEqual from 'shallowequal';
import CheckboxGroup, { CheckboxGroupContext } from './Group';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onClick?: React.MouseEventHandler<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onKeyPress?: React.KeyboardEventHandler<any>;
  onKeyDown?: React.KeyboardEventHandler<any>;
  value?: any;
  tabIndex?: number;
  name?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
  displayButton?: boolean;
}

export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
  indeterminate?: boolean;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export interface CheckboxState {
  checked: boolean;
}

export default class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  state = {
    checked: this.props.defaultChecked || false //按钮复选框需要在这层样式变化，需要加状态引导
  }
  static Group: typeof CheckboxGroup;
  static defaultProps = {
    indeterminate: false,
  };

  static contextTypes = {
    checkboxGroup: PropTypes.any,
  };

  context: any;

  private rcCheckbox: any;

  shouldComponentUpdate(
    nextProps: CheckboxProps,
    nextState: {},
    nextContext: CheckboxGroupContext,
  ) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup)
    );
  }

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  saveCheckbox = (node: any) => {
    this.rcCheckbox = node;
  };

  renderCheckbox = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { props, context } = this;
    const {
      prefixCls: customizePrefixCls,
      className,
      children,
      indeterminate,
      style,
      onMouseEnter,
      onMouseLeave,
      displayButton,
      ...restProps
    } = props;
    const { checkboxGroup } = context;
    const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
    const checkboxProps: CheckboxProps = { ...restProps };
    if (checkboxGroup) {
      checkboxProps.onChange = (...args) => {
        if (restProps.onChange) {
          restProps.onChange(...args);
        }
        checkboxGroup.toggleOption({ label: children, value: props.value });
        if(args && args.length && args[0].target){
          this.setState({
            checked: args[0].target.checked
          })
        }
      };
      checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
      checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
      /*this.setState({
        checked: checkboxProps.checked
      })*/
    }else{
      checkboxProps.onChange = (...args) => {
        if (restProps.onChange) {
          restProps.onChange(...args);
        }
        if(args && args.length && args[0].target){
          this.setState({
            checked: args[0].target.checked
          })
        }
      };
    }
    //如果有checkboxProps.checked（有用Group），则由group控制，没有取state的
    const isChecked = checkboxProps.checked === undefined ? this.state.checked : checkboxProps.checked;
    const classString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: isChecked,
      [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
      [`${prefixCls}-button-wrapper`]: !!displayButton,
      [`${prefixCls}-button-wrapper-checked`]: !!displayButton && isChecked,
      [`${prefixCls}-button-wrapper-disabled`]: !!displayButton && checkboxProps.disabled,
      [`${prefixCls}-button-wrapper-indeterminate`]: !!displayButton && indeterminate,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          {...checkboxProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          ref={this.saveCheckbox}
        />
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCheckbox}</ConfigConsumer>;
  }
}
