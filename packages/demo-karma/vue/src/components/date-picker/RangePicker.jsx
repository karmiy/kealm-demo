import * as moment from 'moment';
import RangeCalendar from '../vc-calendar/src/RangeCalendar';
import VcDatePicker from '../vc-calendar/src/Picker';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
/*import Icon from '../icon';*/
import Tag from '../tag/public_api';
import interopDefault from '../_util/interopDefault';
import { RangePickerProps } from './interface';
import {
  hasProp,
  getOptionProps,
  initDefaultProps,
  mergeProps,
  getComponentFromProp,
  isValidElement,
} from '../_util/props-util';
import BaseMixin from '../_util/BaseMixin';
import { cloneElement } from '../_util/vnode';
import PropTypes from "../_util/vue-types";
function noop() {}
function getShowDateFromValue(value) {
  const [start, end] = value;
  // value could be an empty array, then we should not reset showDate
  if (!start && !end) {
    return;
  }
  const newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
  return [start, newEnd];
}

function formatValue(value, format) {
  return (value && value.format(format)) || '';
}

function pickerValueAdapter(value) {
  if (!value) {
    return;
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value.startOf('days'), value.clone().add(1, 'month').endOf('days')];
}

function isEmptyArray(arr) {
  if (Array.isArray(arr)) {
    return arr.length === 0 || arr.every(i => !i);
  }
  return false;
}

function fixLocale(value, localeCode) {
  if (!localeCode) {
    return;
  }
  if (!value || value.length === 0) {
    return;
  }
  const [start, end] = value;
  if (start) {
    start.locale(localeCode);
  }
  if (end) {
    end.locale(localeCode);
  }
}

export default {
  mixins: [BaseMixin],
  name: 'SlRangePicker',
  props: initDefaultProps(RangePickerProps(), {
    prefixCls: 'salug-calendar',
    tagPrefixCls: 'salus-tag',
    allowClear: true,
    showToday: false,
  }),
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    const value = this.value || this.defaultValue || [];
    const [start, end] = value;
    /*if (
      (start && !interopDefault(moment).isMoment(start)) ||
      (end && !interopDefault(moment).isMoment(end))
    ) {
      throw new Error(
        'The value/defaultValue of RangePicker must be a moment object array after `antd@2.0`, ' +
          'see: https://u.ant.design/date-picker-value',
      );
    }*/
    if (
      (start && !(start instanceof Date)) ||
      (end && !(end instanceof Date))
    ) {
      throw new Error(
        'The value/defaultValue of RangePicker must be a Date object array'
      );
    }
    const [pStart, pEnd] = this.defaultPickerValue || [];
    if (
      (pStart && !(pStart instanceof Date)) ||
      (pEnd && !(pEnd instanceof Date))
    ) {
      throw new Error(
        'The defaultPickerValue of RangePicker must be a Date object array'
      );
    }
    const _defaultPickerValue = [pStart && interopDefault(moment)(pStart), pEnd && interopDefault(moment)(pEnd)];
    const _value = [start && interopDefault(moment)(start), end && interopDefault(moment)(end)];
    const pickerValue = !value || isEmptyArray(value) ? (this.defaultPickerValue && _defaultPickerValue) : _value;
    return {
      sValue: _value,
      sShowDate: pickerValueAdapter(pickerValue || interopDefault(moment)()),
      sOpen: this.open,
      sHoverValue: [],
      pickerBtnOptions: Object.freeze([ // 快速选择的按钮类型
        { key: 'last24Hours', name: '近24小时', type: 'hours'},
        { key: 'last48Hours', name: '近48小时', type: 'hours'},
        { key: 'last72Hours', name: '近72小时', type: 'hours'},
        { key: 'today', name: '今天', type: 'days'},
        { key: 'yesterday', name: '昨天', type: 'days'},
        { key: 'lastThreeDays', name: '近3天', type: 'lastDays'},
        { key: 'lastSevenDays', name: '近7天', type: 'lastDays'},
        { key: 'lastWeek', name: '最近一周', type: 'lastWeeksAndMonths'},
        { key: 'lastTwoWeek', name: '最近两周', type: 'lastWeeksAndMonths'},
        { key: 'lastMonth', name: '最近一个月', type: 'lastWeeksAndMonths'},
        { key: 'lastSixMonth', name: '最近六个月', type: 'lastWeeksAndMonths'},
      ]),
    };
  },
  watch: {
    value(val) {
      val = val && (val instanceof Array) && val.map(date => (date && interopDefault(moment)(date)));
      const value = val || [];
      let state = { sValue: value };
      if (!shallowequal(val, this.sValue)) {
        state = {
          ...state,
          sShowDate: getShowDateFromValue(value) || this.sShowDate,
        };
      }
      this.setState(state);
    },
    open(val) {
      this.setState({
        sOpen: val,
      });
    },
  },
  methods: {
    clearSelection(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ sValue: [] });
      this.handleChange([]);
    },

    clearHoverValue() {
      this.setState({ sHoverValue: [] });
    },

    handleChange(value) {
      if (!hasProp(this, 'value')) {
        this.setState(({ sShowDate }) => ({
          sValue: value,
          sShowDate: getShowDateFromValue(value) || sShowDate,
        }));
      }
      const [start, end] = value;
      // 修改为发送Date
      /*const startDate = start ? (this.format === 'YYYY-MM-DD' ? start.startOf('day')._d : start._d) : undefined,
            endDate = end ? (this.format === 'YYYY-MM-DD' ? end.startOf('day')._d : end._d) : undefined;
      this.$emit('change', !startDate && !endDate ? [] : [startDate, endDate]);*/

      //this.$emit('change', !start && !end ? [] : [start._d, end._d]); latest!!!
      //this.$emit('change', value, [formatValue(start, this.format), formatValue(end, this.format)]);
      this.$emit('change', value);
    },

    handleOpenChange(open) {
      if (!hasProp(this, 'open')) {
        this.setState({ sOpen: open });
      }

      if (open === false) {
        this.clearHoverValue();
      }
      this.$emit('openChange', open);

      if (!open) {
        this.focus();
      }
    },

    handleShowDateChange(showDate) {
      this.setState({ sShowDate: showDate });
    },

    handleHoverChange(hoverValue) {
      this.setState({ sHoverValue: hoverValue });
    },

    handleRangeMouseLeave() {
      if (this.sOpen) {
        this.clearHoverValue();
      }
    },

    handleCalendarInputSelect(value) {
      const [start] = value;
      if (!start) {
        return;
      }
      this.setState(({ sShowDate }) => ({
        sValue: value,
        sShowDate: getShowDateFromValue(value) || sShowDate,
      }));
    },

    handleRangeClick(value) {
      if (typeof value === 'function') {
        value = value();
      }

      this.setValue(value, true);
      this.$emit('ok', value);
      this.$emit('openChange', false);
    },

    setValue(value, hidePanel) {
      this.handleChange(value);
      if ((hidePanel || !this.showTime) && !hasProp(this, 'open')) {
        this.setState({ sOpen: false });
      }
    },

    onMouseEnter(e) {
      this.$emit('mouseenter', e);
    },
    onMouseLeave(e) {
      this.$emit('mouseleave', e);
    },

    focus() {
      this.$refs.picker.focus();
    },

    blur() {
      this.$refs.picker.blur();
    },

    // 快速选择按钮点击事件
    rangeBtnClick(option, onCalendarSelect, e) {
      e.stopPropagation();
      e.preventDefault();
      switch (option.key) {
        // 近24小时
        case 'last24Hours':
          onCalendarSelect([
          interopDefault(moment)().subtract(24, 'hour'),
          interopDefault(moment)()
        ])
          break;
        // 近48小时
        case 'last48Hours':
          onCalendarSelect([
          interopDefault(moment)().subtract(48, 'hour'),
          interopDefault(moment)()
        ])
          break;
        // 近72小时
        case 'last72Hours':
          onCalendarSelect([
          interopDefault(moment)().subtract(72, 'hour'),
          interopDefault(moment)()
        ])
          break;
        // 今天
        case 'today':
          onCalendarSelect([
          interopDefault(moment)().startOf('day'),
          interopDefault(moment)().endOf('day')
        ])
          break;
        // 昨天
        case 'yesterday':
          onCalendarSelect([
          interopDefault(moment)().subtract(1, 'days').startOf('day'),
          interopDefault(moment)().subtract(1, 'days').endOf('day')
        ])
          break;
        // 近3天
        case 'lastThreeDays':
          onCalendarSelect([
          interopDefault(moment)().subtract(3, 'days').startOf('day'),
          interopDefault(moment)().subtract(1, 'days').endOf('day')
        ])
          break;
        // 近7天
        case 'lastSevenDays':
          onCalendarSelect([
          interopDefault(moment)().subtract(7, 'days').startOf('day'),
          interopDefault(moment)().subtract(1, 'days').endOf('day')
        ])
          break;
        // 最近一周
        case 'lastWeek':
          onCalendarSelect([
          interopDefault(moment)().subtract(1, 'week').startOf('day'),
          interopDefault(moment)().subtract(1, 'days').endOf('day')
        ])
          break;
        // 最近两周
        case 'lastTwoWeek':
          onCalendarSelect([
          interopDefault(moment)().subtract(2, 'week').startOf('day'),
          interopDefault(moment)().subtract(1, 'days').endOf('day')
        ])
          break;
        // 最近一个月
        case 'lastMonth':
          onCalendarSelect([
          interopDefault(moment)().subtract(1, 'month').startOf('day'),
          interopDefault(moment)().subtract(1, 'days').endOf('day')
        ])
          break;
        // 最近六个月
        case 'lastSixMonth':
          onCalendarSelect([
          interopDefault(moment)().subtract(6, 'month').startOf('day'),
          interopDefault(moment)().subtract(1, 'days').endOf('day')
        ])
          break;
      }
    },

    renderFooter(...args) {
      const { prefixCls, ranges, $scopedSlots, $slots, tagPrefixCls } = this;
      const renderExtraFooter =
        this.renderExtraFooter || $scopedSlots.renderExtraFooter || $slots.renderExtraFooter;
      if (!ranges && !renderExtraFooter) {
        return null;
      }
      const customFooter = renderExtraFooter ? (
        <div class={`${prefixCls}-footer-extra`} key="extra">
          {typeof renderExtraFooter === 'function' ? renderExtraFooter(...args) : renderExtraFooter}
        </div>
      ) : null;
      const operations = Object.keys(ranges || {}).map(range => {
        const value = ranges[range];
        return (
          <Tag
            key={range}
            prefixCls={tagPrefixCls}
            color="blue"
            onClick={() => this.handleRangeClick(value)}
            onMouseenter={() => this.setState({ sHoverValue: value })}
            onMouseleave={this.handleRangeMouseLeave}
          >
            {range}
          </Tag>
        );
      });
      const rangeNode =
        operations && operations.length > 0 ? (
          <div class={`${prefixCls}-footer-extra ${prefixCls}-range-quick-selector`} key="range">
            {operations}
          </div>
        ) : null;
      return [rangeNode, customFooter];
    },
  },

  render() {
    const props = getOptionProps(this);
    let suffixIcon = getComponentFromProp(this, 'suffixIcon');
    suffixIcon = Array.isArray(suffixIcon) ? suffixIcon[0] : suffixIcon;
    const {
      sValue: value,
      sShowDate: showDate,
      sHoverValue: hoverValue,
      sOpen: open,
      $listeners,
      $scopedSlots,
    } = this;
    const {
      calendarChange = noop,
      ok = noop,
      focus = noop,
      blur = noop,
      panelChange = noop,
    } = $listeners;
    const {
      prefixCls,
      popupStyle,
      style,
      disabledDate,
      disabledTime,
      showTime,
      showToday,
      showOperation,
      operationRegxInput,
      ranges,
      locale,
      localeCode,
      format,
    } = props;
    const dateRender = props.dateRender || $scopedSlots.dateRender;
    fixLocale(value, localeCode);
    fixLocale(showDate, localeCode);

    const calendarClassName = classNames({
      [`${prefixCls}-time`]: showTime,
      [`${prefixCls}-range-with-ranges`]: ranges,
    });

    // 需要选择时间时，点击 ok 时才触发 onChange
    const pickerChangeHandler = {
      on: {
        change: this.handleChange,
      },
    };
    let calendarProps = {
      on: {
        ok: this.handleChange,
      },
      props: {},
    };
    if (props.timePicker) {
      pickerChangeHandler.on.change = changedValue => this.handleChange(changedValue);
    } else {
      calendarProps = { on: {}, props: {} };
    }
    if ('mode' in props) {
      calendarProps.props.mode = props.mode;
    }

    const startPlaceholder =
      'placeholder' in props ? props.placeholder[0] : locale.lang.rangePlaceholder[0];
    const endPlaceholder =
      'placeholder' in props ? props.placeholder[1] : locale.lang.rangePlaceholder[1];
    const rangeCalendarProps = mergeProps(calendarProps, {
      props: {
        format: format,
        prefixCls: prefixCls,
        renderFooter: this.renderFooter,
        timePicker: props.timePicker,
        /*disabledDate: disabledDate && ((moment, ...rest) => {
          // 重置disabledDate，改为传Date回去
          return disabledDate(moment && moment._d, ...rest);
        }),*/
        disabledDate: disabledDate,
        disabledTime: disabledTime,
        dateInputPlaceholder: [startPlaceholder, endPlaceholder],
        locale: locale.lang,
        dateRender: dateRender,
        value: showDate,
        hoverValue: hoverValue,
        showToday: showToday,
        showOperation: showOperation,
        operationRegxInput: operationRegxInput,
      },
      on: {
        change: calendarChange,
        ok: ok,
        valueChange: this.handleShowDateChange,
        hoverChange: this.handleHoverChange,
        panelChange,
        inputSelect: this.handleCalendarInputSelect,
      },
      class: calendarClassName,
      scopedSlots: $scopedSlots,
    });
    const calendar = <RangeCalendar {...rangeCalendarProps} />;

    // default width for showTime
    const pickerStyle = {};
    if (props.showTime) {
      // 不默认350的宽
      // pickerStyle.width = '350px';
      style && style.width && (pickerStyle.width = style.width);
    }
    const [startValue, endValue] = value;
    const clearIcon =
      !props.disabled && props.allowClear && value && (startValue || endValue) ? (
        <i
          class={`${prefixCls}-range-picker-input-clear`}
          onClick={this.clearSelection}
        />
      ) : null;

    const inputIcon = (suffixIcon &&
      (isValidElement(suffixIcon) ? (
        cloneElement(suffixIcon, {
          class: `${prefixCls}-picker-icon`,
        })
      ) : (
        <span class={`${prefixCls}-picker-icon`}>{suffixIcon}</span>
      ))) || <i class={`salus-icon-calendar-o salus-calendar-range-picker-canl`} />;

    // 快速选择按钮
    const rangeBtns = (onCalendarSelect) => {
      // rangeBtnType是string或array
      const btnType = props.rangeBtnType,
        btnClass = `${prefixCls}-range-picker-button`;

      let pickerBtns = [];

      btnType && pickerBtns.push(
        ...this.pickerBtnOptions.filter(option => (option.type === btnType) || btnType.includes(option.key)).map(option =>
          <button key={option.key} class={btnClass} onClick={(event) => this.rangeBtnClick(option, onCalendarSelect, event)}>{option.name}</button>
        )
      )

      return pickerBtns;
    }

    const input = ({ value: inputValue, onCalendarSelect }) => {
      const [start, end] = inputValue;
      return (
        <span
          ref="picker"
          class={props.pickerClass}
          style={pickerStyle}
          tabIndex={props.disabled ? -1 : 0}
          onFocus={focus}
          onBlur={blur}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {inputIcon}
          {rangeBtns(onCalendarSelect)}
          <span class={props.pickerInputClass}>
            <input
              disabled={props.disabled}
              readOnly
              value={(start && start.format(props.format)) || ''}
              placeholder={startPlaceholder}
              class={`${prefixCls}-range-picker-input`}
              /*tabIndex={-1}*/
            />
            <span class={`${prefixCls}-range-picker-separator`}> ~ </span>
            <input
              disabled={props.disabled}
              readOnly
              value={(end && end.format(props.format)) || ''}
              placeholder={endPlaceholder}
              class={`${prefixCls}-range-picker-input`}
              /*tabIndex={-1}*/
            />
            {clearIcon}
          </span>
        </span>
      );
    };
    const vcDatePickerProps = mergeProps(
      {
        props,
        on: $listeners,
      },
      pickerChangeHandler,
      {
        props: {
          calendar: calendar,
          value: value,
          open: open,
          prefixCls: `${prefixCls}-picker-container`,
        },
        on: {
          openChange: this.handleOpenChange,
        },
        style: popupStyle,
      },
    );
    /*return (
      <span
        ref="picker"
        class={props.pickerClass}
        style={pickerStyle}
        tabIndex={props.disabled ? -1 : 0}
        onFocus={focus}
        onBlur={blur}calendar
        onMouseenter={this.onMouseEnter}
        onMouseleave={this.onMouseLeave}
      >
        <VcDatePicker {...vcDatePickerProps}>{input}</VcDatePicker>
      </span>
    );*/
    return (
      <VcDatePicker {...vcDatePickerProps}>{input}</VcDatePicker>
    );
  },
};
