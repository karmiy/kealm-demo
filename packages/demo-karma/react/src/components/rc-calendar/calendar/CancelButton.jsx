import React from 'react';
import Button from '../../button';

export default function OkButton({ prefixCls, locale, onCancel }) {
  /*let className = `${prefixCls}-ok-btn`;
  if (okDisabled) {
    className += ` ${prefixCls}-ok-btn-disabled`;
  }
  return (<a
    className={className}
    role="button"
    onClick={okDisabled ? null : onOk}
  >
    {locale.ok}
  </a>);*/
  return (
    <Button
      role="button"
      size="small"
      onClick={onCancel}
      style={{
        position: 'relative',
        width: 50,
        height: 24,
        marginRight: 5,
        paddingLeft: 10,
        paddingRight: 10,
        top: 1,
        lineHeight: 24
      }}
    >{locale.cancel}</Button>
  )
}
