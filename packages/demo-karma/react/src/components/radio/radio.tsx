import * as React from 'react';
//import * as ReactDom from 'react-dom';
import * as PropTypes from 'prop-types';
//import RcCheckbox from 'rc-checkbox';
import RcCheckbox from '../rc-checkbox';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import RadioGroup from './group';
import RadioButton from './radioButton';
import { RadioProps, RadioChangeEvent, RadioGroupContext } from './interface';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export default class Radio extends React.Component<RadioProps, {}> {
  static Group: typeof RadioGroup;
  static Button: typeof RadioButton;

  static defaultProps = {
    type: 'radio',
  };

  static contextTypes = {
    radioGroup: PropTypes.any,
  };

  context: any;

  private rcCheckbox: any;

  shouldComponentUpdate(nextProps: RadioProps, nextState: {}, nextContext: RadioGroupContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context.radioGroup, nextContext.radioGroup)
    );
  }

 /* componentDidMount() {
    !!this.props.autoFocus && this.focus();
  }*/

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  saveCheckbox = (node: any) => {
    this.rcCheckbox = node;
  };

  onChange = (e: RadioChangeEvent) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }

    if (this.context.radioGroup && this.context.radioGroup.onChange) {
      this.context.radioGroup.onChange(e);
    }
  };
  // 绑定自动聚焦
  /*autofocusMount = () => {
    const radioEle = (ReactDom.findDOMNode(this) as HTMLElement).querySelector('input[type=radio]');
    !!this.props.autoFocus && radioEle && radioEle.setAttribute('autofocus', 'autofocus');
  }*/
  renderRadio = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { props, context } = this;
    const { prefixCls: customizePrefixCls, className, children, style, ...restProps } = props;
    const { radioGroup } = context;
    const prefixCls = getPrefixCls('radio', customizePrefixCls);
    const radioProps: RadioProps = { ...restProps };
    if (radioGroup) {
      radioProps.name = radioGroup.name;
      radioProps.onChange = this.onChange;
      radioProps.checked = props.value === radioGroup.value;
      radioProps.disabled = props.disabled || radioGroup.disabled;
    }
    const wrapperClassString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    });
    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <RcCheckbox {...radioProps} prefixCls={prefixCls} ref={this.saveCheckbox} />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderRadio}</ConfigConsumer>;
  }
}
