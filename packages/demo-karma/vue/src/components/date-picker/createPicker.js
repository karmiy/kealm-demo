import * as moment from 'moment';
import omit from 'lodash-es/omit';
import MonthCalendar from '../vc-calendar/src/MonthCalendar';
import VcDatePicker from '../vc-calendar/src/Picker';
import classNames from 'classnames';
/*import Icon from '../icon';*/
import interopDefault from '../_util/interopDefault';
import BaseMixin from '../_util/BaseMixin';
import {
  hasProp,
  getOptionProps,
  initDefaultProps,
  mergeProps,
  getComponentFromProp,
  isValidElement,
} from '../_util/props-util';
import { cloneElement } from '../_util/vnode';
import createChainedFunction from '../_util/createChainedFunction';
import { formatDate } from '../_util/date';

// export const PickerProps = {
//   value?: moment.Moment;
//   prefixCls: string;
// }

function noop() {}
export default function createPicker(TheCalendar, props) {
  return {
    // static defaultProps = {
    //   prefixCls: 'ant-calendar',
    //   allowClear: true,
    //   showToday: true,
    // };

    // private input: any;
    props: initDefaultProps(props, {
      prefixCls: 'salus-calendar',
      allowClear: true,
      showToday: true,
    }),
    mixins: [BaseMixin],
    model: {
      prop: 'value',
      event: 'change',
    },
    data() {
      const value = this.value || this.defaultValue;
      /*if (value && !interopDefault(moment).isMoment(value)) {
        throw new Error(
          'The value/defaultValue of DatePicker or MonthPicker must be ' + 'a moment object',
        );
      }*/
      if (value && !(value instanceof Date)) {
        throw new Error(
          'The value/defaultValue of DatePicker or MonthPicker must be ' + 'a Date object',
        );
      }
      return {
        sValue: value && interopDefault(moment)(value),
        showDate: value && interopDefault(moment)(value),
        _open: !!this.open,
      };
    },
    watch: {
      open(val) {
        const props = getOptionProps(this);
        const state = {};
        state._open = val;
        if ('value' in props && !val && props.value !== this.showDate) {
          state.showDate = props.value && interopDefault(moment)(props.value);
        }
        this.setState(state);
      },
      value(val) {
        const state = {};
        state.sValue = val && interopDefault(moment)(val);
        if (state.sValue !== this.sValue) {
          state.showDate = val && interopDefault(moment)(val);
        }
        this.setState(state);
      },
    },
    methods: {
      renderFooter(...args) {
        const { prefixCls, $scopedSlots, $slots } = this;
        const renderExtraFooter =
          this.renderExtraFooter || $scopedSlots.renderExtraFooter || $slots.renderExtraFooter;
        return renderExtraFooter ? (
          <div class={`${prefixCls}-footer-extra`}>
            {typeof renderExtraFooter === 'function'
              ? renderExtraFooter(...args)
              : renderExtraFooter}
          </div>
        ) : null;
      },

      clearSelection(e) {
        e = e || window.event;
        e.preventDefault();
        e.stopPropagation();
        this.handleChange(null);
      },

      handleChange(value) {
        if (!hasProp(this, 'value')) {
          this.setState({
            sValue: value,
            showDate: value,
          });
        }
        // 传回date类型
        // this.$emit('change', value ? (this.format === 'YYYY-MM-DD' ? value.startOf('day')._d : value._d) : undefined);

        //this.$emit('change', value ? value._d : undefined);   latest!!!
        this.$emit('change', value, (value && value.format(this.format)) || '');
      },

      handleCalendarChange(value) {
        this.setState({ showDate: value });
      },
      handleOpenChange(open) {
        const props = getOptionProps(this);
        if (!('open' in props)) {
          this.setState({ _open: open });
        }
        this.$emit('openChange', open);
        if (!open) {
          this.focus();
        }
      },
      focus() {
        this.$refs.input.focus();
      },

      blur() {
        this.$refs.input.blur();
      },
      onMouseEnter(e) {
        this.$emit('mouseenter', e);
      },
      onMouseLeave(e) {
        this.$emit('mouseleave', e);
      },
    },

    render() {
      const { $listeners, $scopedSlots } = this;
      const { sValue: value, showDate, _open: open } = this.$data;
      let suffixIcon = getComponentFromProp(this, 'suffixIcon');
      suffixIcon = Array.isArray(suffixIcon) ? suffixIcon[0] : suffixIcon;
      const { panelChange = noop, focus = noop, blur = noop, ok = noop, cancel = noop } = $listeners;
      const props = getOptionProps(this);
      const { prefixCls, locale, localeCode } = props;
      const dateRender = props.dateRender || $scopedSlots.dateRender;
      const monthCellContentRender =
        props.monthCellContentRender || $scopedSlots.monthCellContentRender;
      const placeholder = 'placeholder' in props ? props.placeholder : locale.lang.placeholder;

      const disabledTime = props.showTime ? props.disabledTime : null;

      const calendarClassName = classNames({
        [`${prefixCls}-time`]: props.showTime,
        [`${prefixCls}-month`]: MonthCalendar === TheCalendar,
      });

      if (value && localeCode) {
        value.locale(localeCode);
      }

      const pickerProps = { props: {}, on: {} };
      const calendarProps = { props: {}, on: {} };
      const pickerStyle = {};
      if (props.showTime) {
        // fix https://github.com/ant-design/ant-design/issues/1902
        calendarProps.on.select = this.handleChange;
        // 日期时间选择器不需要定宽
        // pickerStyle.width = '195px';
      } else {
        pickerProps.on.change = this.handleChange;
      }
      if ('mode' in props) {
        calendarProps.props.mode = props.mode;
      }
      const theCalendarProps = mergeProps(calendarProps, {
        props: {
          /*disabledDate: props.disabledDate && ((moment, ...rest) => {
            // 重置disabledDate，改为传Date回去
            return props.disabledDate(moment && moment._d, ...rest);
          }),*/
          disabledDate: props.disabledDate,
          disabledTime,
          locale: locale.lang,
          timePicker: props.timePicker,
          defaultValue: (props.defaultPickerValue && interopDefault(moment)(props.defaultPickerValue)) || interopDefault(moment)().startOf('days'),
          dateInputPlaceholder: placeholder,
          prefixCls,
          dateRender,
          format: props.format,
          showToday: props.showToday,
          monthCellContentRender,
          renderFooter: this.renderFooter,
          value: showDate,
        },
        on: {
          ok: ok,
          cancel: createChainedFunction(cancel, this.clearSelection),
          panelChange,
          change: this.handleCalendarChange,
        },
        class: calendarClassName,
        scopedSlots: $scopedSlots,
      });
      const calendar = <TheCalendar {...theCalendarProps} />;

      // 不需要删除icon
      /*const clearIcon =
        !props.disabled && props.allowClear && value ? (
          <Icon
            type="close-circle"
            class={`${prefixCls}-picker-clear`}
            onClick={this.clearSelection}
            theme="filled"
          />
        ) : null;*/
      const clearIcon =
          !props.disabled && props.allowClear && value ? (
              <div class="salus-calendar-date-input-clear-wrap">
                <i
                    class={`salus-calendar-range-picker-input-clear`}
                    onClick={this.clearSelection}
                />
              </div>
          ) : null;
      const inputIcon = (suffixIcon &&
        (isValidElement(suffixIcon) ? (
          cloneElement(suffixIcon, {
            class: `${prefixCls}-picker-icon`,
          })
        ) : (
          <span class={`${prefixCls}-picker-icon`}>{suffixIcon}</span>
        ))) || <i class={`salus-icon-calendar-o`} />;

      const input = ({ value: inputValue }) => {
        return (<div class="salus-calendar-top-wrap">
          <span>
          {inputIcon}
          </span>
          <input
            ref="input"
            disabled={props.disabled}
            onFocus={focus}
            onBlur={blur}
            readOnly
            value={(inputValue && inputValue.format(props.format)) || ''}
            /*value={(inputValue && formatDate(inputValue, props.format)) || ''}*/
            placeholder={placeholder}
            /*class={props.pickerInputClass}*/
            class='salus-calendar-top-input-ctrl'
            tabIndex={props.tabIndex}
          />
          {clearIcon}
        </div>
      )};
      const vcDatePickerProps = {
        props: {
          ...props,
          ...pickerProps.props,
          calendar,
          value,
          prefixCls: `${prefixCls}-picker-container`,
        },
        on: {
          ...omit($listeners, 'change'),
          ...pickerProps.on,
          open,
          onOpenChange: this.handleOpenChange,
        },
        style: props.popupStyle,
      };
      return (
        <span
          class={props.pickerClass}
          style={pickerStyle}
          // tabIndex={props.disabled ? -1 : 0}
          // onFocus={focus}
          // onBlur={blur}
          onMouseenter={this.onMouseEnter}
          onMouseleave={this.onMouseLeave}
        >
          <VcDatePicker {...vcDatePickerProps}>{input}</VcDatePicker>
        </span>
      );
    },
  };
}
