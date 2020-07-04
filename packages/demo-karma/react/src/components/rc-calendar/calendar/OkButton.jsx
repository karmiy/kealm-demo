import React from 'react';
import Button from '../../button';

export default function OkButton({ prefixCls, locale, okDisabled, onOk }) {
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
      type="primary"
      role="button"
      size="small"
      onClick={okDisabled ? null : onOk}
      disabled={okDisabled ? true : false}
      style={{
        width: 50,
        height: 24,
        paddingLeft: 10,
        paddingRight: 10,
        lineHeight: 24
      }}
    >{locale.ok}</Button>
  )
}
