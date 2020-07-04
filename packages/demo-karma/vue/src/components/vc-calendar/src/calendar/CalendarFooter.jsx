import PropTypes from '../../../_util/vue-types';
import BaseMixin from '../../../_util/BaseMixin';
import { getOptionProps } from '../../../_util/props-util';
import TodayButton from './TodayButton';
import OkButton from './OkButton';
import CancelButton from './CancelButton';
import TimePickerButton from './TimePickerButton';

const CalendarFooter = {
  mixins: [BaseMixin],
  props: {
    prefixCls: PropTypes.string,
    showDateInput: PropTypes.bool,
    disabledTime: PropTypes.any,
    timePicker: PropTypes.any,
    selectedValue: PropTypes.any,
    showOk: PropTypes.bool,
    showCancel: PropTypes.bool,
    // onSelect: PropTypes.func,
    value: PropTypes.object,
    renderFooter: PropTypes.func,
    defaultValue: PropTypes.object,
    locale: PropTypes.object,
    showToday: PropTypes.bool,
    disabledDate: PropTypes.func,
    showTimePicker: PropTypes.bool,
    okDisabled: PropTypes.bool,
  },
  methods: {
    onSelect(value) {
      this.__emit('select', value);
    },

    getRootDOMNode() {
      return this.$el;
    },
  },

  render() {
    const props = getOptionProps(this);
    const { $listeners } = this;
    const { value, prefixCls, showOk, showCancel, timePicker, renderFooter, showToday } = props;
    let footerEl = null;
    const extraFooter = renderFooter();
    if (showToday || timePicker || extraFooter) {
      const btnProps = {
        props: {
          ...props,
          value: value,
        },
        on: $listeners,
      };
      let nowEl = null;
      if (showToday) {
        nowEl = <TodayButton key="todayButton" {...btnProps} />;
      }
      delete btnProps.props.value;
      let okBtn = null, cancelBtn = null;
      if (showOk === true || (showOk !== false && !!timePicker)) {
        okBtn = <OkButton key="okButton" {...btnProps} />;
      }
      if (showCancel === true || (showCancel !== false && !!timePicker)) {
        cancelBtn = <CancelButton key="cancelButton" {...btnProps} />;
      }
      let timePickerBtn = null;
      if (timePicker) {
        timePickerBtn = <TimePickerButton key="timePickerButton" {...btnProps} />;
      }

      let footerBtn;
      if (nowEl || timePickerBtn || okBtn || extraFooter) {
        footerBtn = (
          <span class={`${prefixCls}-footer-btn`}>
            {extraFooter}
            {nowEl}
            {timePickerBtn}
            <div>
              {cancelBtn}
              {okBtn}
            </div>
          </span>
        );
      }
      const cls = {
        [`${prefixCls}-footer`]: true,
        [`${prefixCls}-footer-show-ok`]: !!okBtn,
      };
      footerEl = <div class={cls}>{footerBtn}</div>;
    }
    return footerEl;
  },
};

export default CalendarFooter;
