import * as React from 'react';
import classNames from 'classnames';
import { ITouchProps, ITouchState } from './PropTypes';

export default class TouchFeedback extends React.Component<ITouchProps, ITouchState> {
  static defaultProps = {
    disabled: false,
  };

  state = {
    active: false,
  };

  componentDidUpdate() {
    if (this.props.disabled && this.state.active) {
      this.setState({
        active: false,
      });
    }
  }

  triggerEvent(type: string, isActive: boolean, ev: React.TouchEventHandler<HTMLElement>) {
    const eventType = `on${type}`;
    const { children } = this.props;

    if (children.props[eventType]) {
      children.props[eventType](ev);
    }
    if (isActive !== this.state.active) {
      this.setState({
        active: isActive,
      });
    }
  }

  onTouchStart = (e: React.TouchEventHandler<HTMLElement>) => {
    this.triggerEvent('TouchStart', true, e);
  }

  onTouchMove = (e: React.TouchEventHandler<HTMLElement>) => {
    this.triggerEvent('TouchMove', false, e);
  }

  onTouchEnd = (e: React.TouchEventHandler<HTMLElement>) => {
    this.triggerEvent('TouchEnd', false, e);
  }

  onTouchCancel = (e: React.TouchEventHandler<HTMLElement>) => {
    this.triggerEvent('TouchCancel', false, e);
  }

  onMouseDown = (e: React.TouchEventHandler<HTMLElement>) => {
    // pc simulate mobile
    this.triggerEvent('MouseDown', true, e);
  }

  onMouseUp = (e: React.TouchEventHandler<HTMLElement>) => {
    this.triggerEvent('MouseUp', false, e);
  }

  onMouseLeave = (e: React.TouchEventHandler<HTMLElement>) => {
    this.triggerEvent('MouseLeave', false, e);
  }

  render() {
    const { children, disabled, activeClassName, activeStyle } = this.props;

    const events = disabled ? undefined : {
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
      onTouchCancel: this.onTouchCancel,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseLeave: this.onMouseLeave,
    };

    const child = React.Children.only(children);

    if (!disabled && this.state.active) {
      let { style, className } = child.props;

      if (activeStyle !== false) {
        if (activeStyle) {
          style = {...style, ...activeStyle };
        }
        className = classNames(className, activeClassName);
      }

      return React.cloneElement(child, {
        className,
        style,
        ...events,
      });
    }

    return React.cloneElement(child, events);
  }
}