import PropTypes from '../_util/vue-types';
export default () => ({
  prefixCls: PropTypes.string.def('salus-button'),
  type: PropTypes.oneOf(['primary', 'danger', 'dashed', 'link', 'success', 'default']).def('default'),
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']).def('button'),
  // icon: PropTypes.string,
  iconOnly: PropTypes.bool.def(false),
  icon: PropTypes.bool.def(false),
  shape: PropTypes.oneOf(['circle', 'default']).def('default'),
  size: PropTypes.oneOf(['small', 'middle', 'default']).def('default'),
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  disabled: PropTypes.bool.def(false),
  // ghost: PropTypes.bool,
  full: PropTypes.bool.def(false),
  // salusSearch: PropTypes.bool.def(false)
});
