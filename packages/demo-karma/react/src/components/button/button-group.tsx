import * as React from 'react';
import classNames from 'classnames';
import { ButtonSize } from './button';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface ButtonGroupProps {
  size?: ButtonSize;
  gap?: boolean;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

const ButtonGroup: React.SFC<ButtonGroupProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, size, gap, className, ...others } = props;
      const prefixCls = getPrefixCls('btn-group', customizePrefixCls);

      // large => lg
      // small => sm
      let sizeCls = '';
      switch (size) {
        case 'middle':
          sizeCls = 'middle';
          break;
        case 'small':
          sizeCls = 'small';
        default:
          break;
      }

      const classes = classNames(
        prefixCls,
        {
          [`${prefixCls}-${sizeCls}`]: sizeCls,
          [`${prefixCls}-gap`]: gap,
        },
        className,
      );

      return <div {...others} className={classes} />;
    }}
  </ConfigConsumer>
);

export default ButtonGroup;
