import * as React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
/*import Icon from '../icon';*/
import CheckableTag from './CheckableTag';
import TagGroup from './TagGroup';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Wave from '../_util/wave';

export { CheckableTagProps } from './CheckableTag';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  color?: string;
  fontColor?: string;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  visible?: boolean;
  onClose?: Function;
  afterClose?: Function;
  style?: React.CSSProperties;
}

interface TagState {
  visible: boolean;
}

interface InnterTagProps extends TagProps {
  show: boolean;
}

const InnerTag = ({ show, ...restProps }: InnterTagProps) => {
  const divProps = omit(restProps, ['onClose', 'afterClose', 'color', 'fontColor', 'visible', 'closable', 'closeIcon']);
  return <div {...divProps} />;
};

class Tag extends React.Component<TagProps, TagState> {
  static CheckableTag = CheckableTag;
  static TagGroup = TagGroup;
  static defaultProps = {
    closable: false,
  };

  static getDerivedStateFromProps(nextProps: TagProps) {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible,
      };
    }
    return null;
  }

  state = {
    visible: true,
  };

  setVisible(visible: boolean, e: React.MouseEvent<HTMLElement>) {
    const { onClose } = this.props;
    if (onClose) {
      onClose(e);
    }
    if (e.defaultPrevented) {
      return;
    }
    if (!('visible' in this.props)) {
      this.setState({ visible });
    }
  }

  handleIconClick = (e: React.MouseEvent<HTMLElement>) => {
    this.setVisible(false, e);
  };

  animationEnd = (_: string, existed: boolean) => {
    if (!existed) {
      const { afterClose } = this.props;
      if (afterClose) {
        afterClose();
      }
    }
  };

  isPresetColor(color?: string): boolean {
    if (!color) {
      return false;
    }
    return /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(
      color,
    );
  }

  getTagStyle() {
    const { color, fontColor, style } = this.props;
    const isPresetColor = this.isPresetColor(color);
    return {
      backgroundColor: color && !isPresetColor ? color : undefined,
      color: fontColor,
      ...style,
    };
  }

  getTagClassName({ getPrefixCls }: ConfigConsumerProps) {
    const { prefixCls: customizePrefixCls, className, color } = this.props;
    const { visible } = this.state;
    const isPresetColor = this.isPresetColor(color);
    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    return classNames(
      prefixCls,
      {
        [`${prefixCls}-${color}`]: isPresetColor,
        [`${prefixCls}-has-color`]: color && !isPresetColor,
        [`${prefixCls}-hidden`]: !visible,
      },
      className,
    );
  }

  renderCloseIcon(prefixCls: string) {
    const { closable, closeIcon } = this.props;
    const closeContent = closable ? (closeIcon || <i className='salus-icon-pop-close-o' onClick={this.handleIconClick} />) : null;
    return closable ? <span className={`${prefixCls}-icon-contianer`}>{closeContent}</span> : null;
  }

  renderTag = (configProps: ConfigConsumerProps) => {
    const { getPrefixCls } = configProps;
    const { prefixCls: customizePrefixCls, children, ...otherProps } = this.props;
    const { visible } = this.state;
    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    return (
      <Wave>
        <Animate
          component=""
          showProp="show"
          transitionName={`${prefixCls}-zoom`}
          onEnd={this.animationEnd}
        >
          <InnerTag
            show={visible}
            {...otherProps}
            className={this.getTagClassName(configProps)}
            style={this.getTagStyle()}
          >
            {children}
            {this.renderCloseIcon(prefixCls)}
          </InnerTag>
        </Animate>
      </Wave>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTag}</ConfigConsumer>;
  }
}

polyfill(Tag);

export default Tag;
