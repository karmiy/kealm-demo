import PropTypes from '../../../_util/vue-types';
import BaseMixin from '../../../_util/BaseMixin';
import { getOptionProps, getComponentFromProp } from '../../../_util/props-util';
import { cloneElement } from '../../../_util/vnode';
import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import DateInput from '../date/DateInput';
import { getTimeConfig } from '../util/index';
import interopDefault from "../../../_util/interopDefault";
import moment from 'moment';
function noop() {}
const CalendarPart = {
  mixins: [BaseMixin],
  props: {
    prefixCls: PropTypes.string,
    value: PropTypes.any,
    hoverValue: PropTypes.any,
    selectedValue: PropTypes.any,
    direction: PropTypes.any,
    locale: PropTypes.any,
    showDateInput: PropTypes.bool,
    showTimePicker: PropTypes.bool,
    showWeekNumber: PropTypes.bool,
    format: PropTypes.any,
    placeholder: PropTypes.any,
    disabledDate: PropTypes.any,
    timePicker: PropTypes.any,
    disabledTime: PropTypes.any,
    disabledMonth: PropTypes.any,
    mode: PropTypes.any,
    // onInputSelect: PropTypes.func,
    timePickerDisabledTime: PropTypes.object,
    enableNext: PropTypes.any,
    enablePrev: PropTypes.any,
    dateRender: PropTypes.func,
    clearIcon: PropTypes.any,
    showOperation: PropTypes.bool, // 显示自定义时间
    operationRegxInput: PropTypes.object, // 正则匹配输入框按键
    onInputSelectCustom: PropTypes.func, // 自定义输入框匹配选中时间
  },
  methods: {
    onKeyDown(e) {
      // 检测输入值是否符合正则(时间选择的话可以多:来输入时分秒)
      const reg = this.$props.operationRegxInput || (this.$props.timePicker ? /^[0-9-\s:]$/g : /^[0-9-\s]$/g);
      this._isValidInput = true;
      // 不符合正则且不是删除键
      if(!reg.test(e.key) && e.keyCode !== 8)
        this._isValidInput = false;
      this._oldInputValue = e.target.value;
    },
    onInput(e) {
      if(!this._isValidInput){
        e.target.value = this._oldInputValue;
        return;
      }
      // 判断输入的内容格式是否正确
      if(this.checkValidInputDate(e.target.value)) {
        // onInputSelectCustom是为了新增的自定义输入而用的函数
        this.$props.onInputSelectCustom(interopDefault(moment)(new Date(e.target.value)));
      }
    },
    // 校验时期是否有效
    checkValidInputDate(value) {
      if(!isNaN(new Date(value).valueOf()) && interopDefault(moment)(new Date(value)).format(this.$props.format) === value)
        return true;
      return false;
    },
  },
  render() {
    const { $props: props, $listeners = {} } = this;
    const {
      prefixCls,
      value,
      hoverValue,
      selectedValue,
      mode,
      direction,
      locale,
      format,
      placeholder,
      disabledDate,
      timePicker,
      disabledTime,
      timePickerDisabledTime,
      showTimePicker,
      enablePrev,
      enableNext,
      disabledMonth,
      showDateInput,
      dateRender,
      showWeekNumber,
      showOperation,
    } = props;
    const clearIcon = getComponentFromProp(this, 'clearIcon');
    const {
      inputSelect = noop,
      valueChange = noop,
      panelChange = noop,
      select = noop,
      dayHover = noop,
      rangeTimeClick = noop,
    } = $listeners;
    const shouldShowTimePicker = showTimePicker && timePicker;
    const disabledTimeConfig =
      shouldShowTimePicker && disabledTime ? getTimeConfig(selectedValue, disabledTime) : null;
    const rangeClassName = `${prefixCls}-range`;
    const newProps = {
      locale,
      value,
      prefixCls,
      showTimePicker,
    };
    const index = direction === 'left' ? 0 : 1;
    let timePickerEle = null;
    if (shouldShowTimePicker) {
      const timePickerProps = getOptionProps(timePicker);
      timePickerEle = cloneElement(timePicker, {
        props: {
          showHour: true,
          showMinute: true,
          showSecond: true,
          ...timePickerProps,
          ...disabledTimeConfig,
          ...timePickerDisabledTime,
          defaultOpenValue: value,
          value: selectedValue[index],
        },
        on: {
          change: inputSelect,
        },
      });
    }

    const dateInputElement = showDateInput && (
      <DateInput
        format={format}
        locale={locale}
        prefixCls={prefixCls}
        timePicker={timePicker}
        disabledDate={disabledDate}
        placeholder={placeholder}
        disabledTime={disabledTime}
        value={value}
        showClear={false}
        selectedValue={selectedValue[index]}
        onChange={inputSelect}
        clearIcon={clearIcon}
      />
    );
    const headerProps = {
      props: {
        ...newProps,
        mode,
        enableNext,
        enablePrev,
        disabledMonth,
      },
      on: {
        valueChange,
        panelChange,
      },
    };
    const tableProps = {
      props: {
        ...newProps,
        hoverValue,
        selectedValue,
        dateRender,
        disabledDate,
        showWeekNumber,
      },
      on: {
        select,
        dayHover,
        rangeTimeClick,
      },
    };
    return (
      <div class={`${rangeClassName}-part ${rangeClassName}-${direction}`}>
        {/* 不需要输入框 */}
        {/*{dateInputElement}*/}
        <div style={{ outline: 'none' }} class={`${rangeClassName}-cell-container`}>
          <CalendarHeader {...headerProps} />
          {showTimePicker ? (
            <div class={`${prefixCls}-time-picker`}>
              <div class={`${prefixCls}-time-picker-panel`}>{timePickerEle}</div>
            </div>
          ) : null}
          <div class={`${prefixCls}-body`}>
            <DateTable {...tableProps} />
          </div>
        </div>
        {/* 自定义日期，input输入框区域 */}
        {
          (timePicker || showOperation) ?
            <div class={(showOperation && direction === 'right') ? `${prefixCls}-input-opration` : `${prefixCls}-input-panel`}>
              <div class={`${prefixCls}-date-input-panel`}>
                <div class={`${prefixCls}-input-wrap`}>
                  <div class={`${prefixCls}-date-input-wrap`}>
                    <input type="text"
                           class={`${prefixCls}-input`}
                           placeholder={direction === 'left' ? '开始日期' : '结束日期'}
                           value={selectedValue[index] ? selectedValue[index].format(format) : ''}
                           onKeydown={this.onKeyDown}
                           onInput={this.onInput}
                    />
                  </div>
                </div>
              </div>
            </div>
            :
            null
        }
      </div>
    );
  },
};

export default CalendarPart;
