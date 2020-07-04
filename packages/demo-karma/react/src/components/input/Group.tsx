import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Input from './Input';
import TextArea from './TextArea';

export interface GroupProps {
  className?: string;
  size?: 'large' | 'small' | 'default';
  children?: any;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
  onFocus?: React.FocusEventHandler<HTMLSpanElement>;
  onBlur?: React.FocusEventHandler<HTMLSpanElement>;
  prefixCls?: string;
  compact?: boolean;
  limitCount?: number;
}

/*const Group: React.StatelessComponent<GroupProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, className = '', limitCount = 0 } = props;
      const prefixCls = getPrefixCls('input-group', customizePrefixCls);
      const cls = classNames(
        prefixCls,
        {
          [`${prefixCls}-lg`]: props.size === 'large',
          [`${prefixCls}-sm`]: props.size === 'small',
          [`${prefixCls}-compact`]: props.compact,
        },
        className,
      );
      return (
        <span
          className={cls}
          style={props.style}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        >
          <div className={'salus-input-group-inner-container'}>
            {props.children}
            {limitCount > 0 && <span className='salus-input-number-contianer'>0/10</span>}
          </div>
        </span>
      );
    }}
  </ConfigConsumer>
);*/
interface GroupState {
  currentLimitCount?: number;
}
class Group extends React.Component<GroupProps, GroupState> {
  state = {
    currentLimitCount: 0
  }
  reloadCurrentLimitCount = (e: any) => {
    this.setState({
      currentLimitCount: e.target.value.length
    })
  }
  renderGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '', limitCount = 0, children } = this.props;
    const prefixCls = getPrefixCls('input-group', customizePrefixCls);
    const cls = classNames(
      prefixCls,
      {
        [`${prefixCls}-lg`]: this.props.size === 'large',
        [`${prefixCls}-sm`]: this.props.size === 'small',
        [`${prefixCls}-compact`]: this.props.compact,
      },
      className,
    );
    // TextArea和Input传递limitCount, onInput
    const limitCountProps = limitCount ? {limitCount, onInput: this.reloadCurrentLimitCount} : {};
    const renderChildren = !(children instanceof Array) && (children.type) && (children.type === TextArea || children.type === Input) ? React.cloneElement(children, limitCountProps) : children;
    return (
      <span
        className={cls}
        style={this.props.style}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      >
          <div className={'salus-input-group-inner-container'}>
            {renderChildren}
            {limitCount > 0 && <span className='salus-input-number-contianer'>{this.state.currentLimitCount}/10</span>}
          </div>
        </span>
    );
  }
  render() {
    return <ConfigConsumer>{this.renderGroup}</ConfigConsumer>;
  }
}

export default Group;
