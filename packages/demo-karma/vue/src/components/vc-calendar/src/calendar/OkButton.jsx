import Button from '../../../button/public_api'
function noop() {}
export default {
  functional: true,
  render(createElement, context) {
    const { props, listeners = {} } = context;
    const { prefixCls, locale, okDisabled } = props;
    const { ok = noop } = listeners;
    let className = `${prefixCls}-ok-btn`;
    if (okDisabled) {
      className += ` ${prefixCls}-ok-btn-disabled`;
    }
    /*return (
      <a class={className} role="button" onClick={okDisabled ? noop : ok}>
        {locale.ok}
      </a>
    );*/
    return (
      <Button
        type="primary"
        role="button"
        size="small"
        onClick={okDisabled ? noop : ok}
        disabled={okDisabled ? true : false}
        style={{
          width: '50px',
          height: '24px',
          paddingLeft: '10px',
          paddingRight: '10px',
          lineHeight: '24px',
        }}
      >{locale.ok}</Button>
    )
  },
};
