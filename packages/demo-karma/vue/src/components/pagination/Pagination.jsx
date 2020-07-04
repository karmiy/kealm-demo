import PropTypes from '../_util/vue-types';
// import VcSelect from '../select';
// import MiniSelect from './MiniSelect';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { getOptionProps } from '../_util/props-util';
import VcPagination from '../vc-pagination/public_api';
// import Icon from '../icon';

export const PaginationProps = () => ({
  total: PropTypes.number,
  defaultCurrent: PropTypes.number,
  current: PropTypes.number,
  defaultPageSize: PropTypes.number,
  pageSize: PropTypes.number,
  hideOnSinglePage: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  buildOptionText: PropTypes.func,
  showSizeChange: PropTypes.func,
  showQuickJumper: PropTypes.bool,
  showTotal: PropTypes.any,
  size: PropTypes.string,
  simple: PropTypes.bool,
  locale: PropTypes.object,
  prefixCls: PropTypes.string,
  selectPrefixCls: PropTypes.string,
  itemRender: PropTypes.any,
  role: PropTypes.string,
});

export const PaginationConfig = () => ({
  ...PaginationProps(),
  position: PropTypes.oneOf(['top', 'bottom', 'both']),
});

export default {
  name: 'SlPagination',
  model: {
    prop: 'current',
    event: 'change.current',
  },
  props: {
    ...PaginationProps(),
    prefixCls: PropTypes.string.def('salus-pagination'),
    selectPrefixCls: PropTypes.string.def('salus-select'),
  },
  methods: {
    getIconsProps() {
      const { prefixCls } = this.$props;
      const prevIcon = (
        <a class={`${prefixCls}-item-link`}></a>
      );
      const nextIcon = (
        <a class={`${prefixCls}-item-link`}></a>
      );
      return {
        prevIcon,
        nextIcon,
      };
    },
    renderPagination(contextLocale) {
      const { buildOptionText, size, locale: customLocale, ...restProps } = getOptionProps(this);
      const isSmall = size === 'small';
      const paginationProps = {
        props: {
          ...restProps,
          ...this.getIconsProps(),
          selectComponentClass: null,
          locale: { ...contextLocale, ...customLocale },
          buildOptionText: buildOptionText || this.$scopedSlots.buildOptionText,
        },
        class: {
          mini: isSmall,
        },
        on: this.$listeners,
      };

      return <VcPagination {...paginationProps} />;
    },
  },
  render() {
    return (
      <LocaleReceiver componentName="Pagination" scopedSlots={{ default: this.renderPagination }} />
    );
  },
};
