import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber from '../rc-input-number';
/*import Icon from '../icon';*/
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { Omit } from '../_util/type';

// omitting this attrs because they conflicts with the ones defined in InputNumberProps
export type OmitAttrs = 'defaultValue' | 'onChange' | 'size';

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmitAttrs> {
  prefixCls?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number | string;
  defaultValue?: number;
  tabIndex?: number;
  onChange?: (value: number | undefined) => void;
  disabled?: boolean;
  size?: 'large' | 'small' | 'default';
  formatter?: (value: number | string | undefined) => string;
  parser?: (displayValue: string | undefined) => number;
  decimalSeparator?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  id?: string;
  precision?: number;
  handleType?: 'default' | 'symbols';
}

export default class InputNumber extends React.Component<InputNumberProps, any> {
  static defaultProps = {
    step: 1,
    handleType: 'default',
  };

  private inputNumberRef: any;

  focus() {
    this.inputNumberRef.focus();
  }

  blur() {
    this.inputNumberRef.blur();
  }

  renderInputNumber = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { className, size, prefixCls: customizePrefixCls, handleType, ...others } = this.props;
    const prefixCls = getPrefixCls('input-number', customizePrefixCls);
    const inputNumberClass = classNames(
      {
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-sysmbols-handler`]: handleType === 'symbols',
      },
      className,
    );
    /*const upIcon = <Icon type="up" className={`${prefixCls}-handler-up-inner`} />;
    const downIcon = <Icon type="down" className={`${prefixCls}-handler-down-inner`} />;*/
    const upIcon = null;
    const downIcon = null;

    return (
      <RcInputNumber
        ref={(c: any) => (this.inputNumberRef = c)}
        className={inputNumberClass}
        upHandler={upIcon}
        downHandler={downIcon}
        prefixCls={prefixCls}
        {...others}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderInputNumber}</ConfigConsumer>;
  }
}
