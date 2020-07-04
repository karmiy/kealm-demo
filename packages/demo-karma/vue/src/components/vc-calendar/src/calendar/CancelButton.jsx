import Button from '../../../button/public_api'
function noop() {}
export default {
  functional: true,
  render(createElement, context) {
    const { props, listeners = {} } = context;
    const { locale } = props;
    const { cancel = noop } = listeners;
    /*return (
      <a class={className} role="button" onClick={okDisabled ? noop : ok}>
        {locale.ok}
      </a>
    );*/
    return (
      <Button
        role="button"
        size="small"
        onClick={cancel}
        style={{
          position: 'relative',
          width: '50px',
          height: '24px',
          marginRight: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          top: '1px',
          lineHeight: '24px',
        }}
      >{locale.cancel}</Button>
    )
  },
};
