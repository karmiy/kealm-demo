import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import DateInput from '../date/DateInput';
import { getTimeConfig } from '../util/index';
import interopDefault from '../../_util/interopDefault';
import moment from 'moment';
import {ButtonProps} from "../../button";

export default class CalendarPart extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    value: PropTypes.any,
    hoverValue: PropTypes.any,
    selectedValue: PropTypes.any,
    direction: PropTypes.any,
    locale: PropTypes.any,
    showDateInput: PropTypes.bool,
    showTimePicker: PropTypes.bool,
    format: PropTypes.any,
    placeholder: PropTypes.any,
    disabledDate: PropTypes.any,
    timePicker: PropTypes.any,
    disabledTime: PropTypes.any,
    onInputChange: PropTypes.func,
    onInputSelect: PropTypes.func,
    onInputSelectCustom: PropTypes.func,
    timePickerDisabledTime: PropTypes.object,
    enableNext: PropTypes.any,
    enablePrev: PropTypes.any,
    clearIcon: PropTypes.node,
  }
  onInput = (e) => {
    if(!this._isValidInput){
      e.target.value = this._oldInputValue;
      return;
    }
    // 判断输入的内容格式是否正确
    if(this.checkValidInputDate(e.target.value)) {
      // onInputSelectCustom是为了新增的自定义输入而用的函数
      this.props.onInputSelectCustom(interopDefault(moment)(new Date(e.target.value)));
    }
  }
  onKeyDown = (e) => {
    // 检测输入值是否符合正则(时间选择的话可以多:来输入时分秒)
    const reg = this.props.operationRegxInput || (this.props.timePicker ? /^[0-9-\s:]$/g : /^[0-9-\s]$/g);
    this._isValidInput = true;
    // 不符合正则且不是删除键
    if(!reg.test(e.key) && e.keyCode !== 8)
      this._isValidInput = false;
    this._oldInputValue = e.target.value;
  }

  // 校验时期是否有效
  checkValidInputDate = (value) => {
    if(!isNaN(new Date(value).valueOf()) && interopDefault(moment)(new Date(value)).format(this.props.format) === value)
      return true;
    return false;
  }
  render() {
    const props = this.props;
    const {
      prefixCls,
      value,
      hoverValue,
      selectedValue,
      mode,
      direction,
      locale, format, placeholder,
      disabledDate, timePicker, disabledTime,
      timePickerDisabledTime, showTimePicker,
      onInputChange, onInputSelect, enablePrev, enableNext,
      clearIcon,
    } = props;
    const shouldShowTimePicker = showTimePicker && timePicker;
    const disabledTimeConfig = shouldShowTimePicker && disabledTime ?
      getTimeConfig(selectedValue, disabledTime) : null;
    const rangeClassName = `${prefixCls}-range`;
    const newProps = {
      locale,
      value,
      prefixCls,
      showTimePicker,
    };
    const index = direction === 'left' ? 0 : 1;
    const timePickerEle = shouldShowTimePicker &&
      React.cloneElement(timePicker, {
        showHour: true,
        showMinute: true,
        showSecond: true,
        ...timePicker.props,
        ...disabledTimeConfig,
        ...timePickerDisabledTime,
        onChange: onInputChange,
        defaultOpenValue: value,
        value: selectedValue[index],
      });

    const dateInputElement = props.showDateInput &&
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
        onChange={onInputChange}
        onSelect={onInputSelect}
        clearIcon={clearIcon}
      />;
    return (
      <div
        className={`${rangeClassName}-part ${rangeClassName}-${direction}`}
      >
        {/* 不需要date输入框 */}
        {/*{dateInputElement}*/}
        <div style={{ outline: 'none' }} className={`${rangeClassName}-cell-container`}>
          <CalendarHeader
            {...newProps}
            mode={mode}
            enableNext={enableNext}
            enablePrev={enablePrev}
            onValueChange={props.onValueChange}
            onPanelChange={props.onPanelChange}
            disabledMonth={props.disabledMonth}
          />
          {showTimePicker ? <div className={`${prefixCls}-time-picker`}>
            <div className={`${prefixCls}-time-picker-panel`}>
              {timePickerEle}
            </div>
          </div> : null}
          <div className={`${prefixCls}-body`}>
            <DateTable
              {...newProps}
              hoverValue={hoverValue}
              selectedValue={selectedValue}
              dateRender={props.dateRender}
              onSelect={props.onSelect}
              onDayHover={props.onDayHover}
              disabledDate={disabledDate}
              showWeekNumber={props.showWeekNumber}
            />
          </div>
        </div>
        {/* 自定义日期，input输入框区域 */}
        {
          (props.timePicker || props.showOperation) ?
            <div className={(props.showOperation && direction === 'right') ? `${prefixCls}-input-opration` : `${prefixCls}-input-panel`}>
              <div className={`${prefixCls}-date-input-panel`}>
                <div className={`${prefixCls}-input-wrap`}>
                  <div className={`${prefixCls}-date-input-wrap`}>
                    <input type="text"
                           key={Date.now()}
                           defaultValue={selectedValue[index] ? selectedValue[index].format(format) : ''}
                           className={`${prefixCls}-input`}
                           placeholder={direction === 'left' ? '开始日期' : '结束日期'}
                           onInput={this.onInput}
                           onKeyDown={this.onKeyDown}
                    />
                  </div>
                </div>
              </div>
            </div>
            :
            null
        }
      </div>);
  }
}
