import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DatePicker from "components/date-picker";
import moment from 'moment';

configure({ adapter: new Adapter() })

describe('DatePicker', () => {
  let wrapper = null;

  /* 格式化日期 */
  const format = function (date = new Date(), fmt) {
    const o = {
      "M+": date.getMonth() + 1, //月份
      "D+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  /* 比较日期是否相同，像2019-01-01和2019-1-01得出的getTime()不同 */
  const compareWithoutTimer = (date, cDate) => {
    const yearSame = date.getFullYear() === cDate.getFullYear(),
          monthSame = date.getMonth() === cDate.getMonth(),
          dateSame = date.getDate() === cDate.getDate();
    return yearSame && monthSame && dateSame;
  }

  /* 获取相对时间，Date，差值、类型（second, minute, hour, day, month, year）、之后 */
  const getRelativeDate = (date = new Date(), dValue, type, after) => {
    let rDate = date,
        time = '',
        cloneDate = null;
    switch (type) {
      case 'second':
        time = date.valueOf() + (after ? (dValue * 1000) : -(dValue * 1000));
        rDate = new Date(time);
        break;
      case 'minute':
        time = date.valueOf() + (after ? (dValue * 60 * 1000) : -(dValue * 60 * 1000));
        rDate = new Date(time);
        break;
      case 'hour':
        time = date.valueOf() + (after ? (dValue * 60* 60 * 1000) : -(dValue * 60* 60 * 1000));
        rDate = new Date(time);
        break;
      case 'day':
        time = date.valueOf() + (after ? (dValue * 24 * 60* 60 * 1000) : -(dValue * 24 * 60* 60 * 1000));
        rDate = new Date(time);
        break;
      case 'month':
        cloneDate = new Date(date.valueOf());
        cloneDate.setMonth(cloneDate.getMonth() + (after ? dValue : -dValue));
        rDate = cloneDate;
        break;
      case 'year':
        cloneDate = new Date(date.valueOf());
        cloneDate.setFullYear(cloneDate.getFullYear() + (after ? dValue : -dValue));
        rDate = cloneDate;
        break;
    }
    return rDate;
  }

  /* 自定义输入框，模拟键盘键入事件 */
  const simulateKeyboardInput = (partInstance, keyDown, input) => {
    partInstance.onKeyDown(keyDown);
    partInstance.onInput(input);
  }

  /* 随机触发面板上一个日期 */
  const dispatchOneDate = (portalWrapper) => {
    // 随机得到面板上一个日期并点击
    const dateRows = portalWrapper.find('table.salus-calendar-table tbody.salus-calendar-tbody tr'),
            rowLength = dateRows.length,
            randomRow = dateRows.at(Math.random() * rowLength | 0),
            colLength = randomRow.find('td.salus-calendar-cell').length,
            randomCol = randomRow.find('td.salus-calendar-cell').at(Math.random() * colLength | 0);
    // 随便点击一个日期
    const rDateStr = randomCol.instance().title.replace(/[年月日]/g, '-').slice(0, -1);
    randomCol.simulate('click');
    return format(new Date(rDateStr), 'YYYY-MM-DD');
  }

  /* 随机触发面板上一个时间（3列 时分秒） */
  const dispatchOneTime = (timeWrapper) => {
    const timeRows = timeWrapper.find('.salus-calendar-time-picker-select'),
          selectTime = [];
    timeRows.forEach( row => {
      const cols = row.find('ul li'),
            length = cols.length,
            randomCol = cols.at(Math.random() * length | 0);
      randomCol.simulate('click');
      selectTime.push(randomCol.text());
    });
    return selectTime.join(':');
  }

  /* 随机触发range面板上一个日期/时间范围 */
  const dispatchOneRangeDate = (wrapper, type = 'date') => {
    const rangeLeft = wrapper.find('.salus-calendar-range-left'),
      rangeRight = wrapper.find('.salus-calendar-range-right');
    // 左右各随机点个日期
    return type == 'date' ? [dispatchOneDate(rangeLeft), dispatchOneDate(rangeRight)] : [dispatchOneTime(rangeLeft), dispatchOneTime(rangeRight)]
  }

  /* 生成数组range */
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  /* 不可用日期 */
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  }

  /* 不可用时间 */
  const disabledDateTime = () => {
    return {
      disabledHours: () => range(0, 24).splice(4, 20), // 04-23
      disabledMinutes: () => range(30, 60), // 30-59
      disabledSeconds: () => [55, 56],
    };
  }

  /* 不可用时间范围 */
  const disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20), // 04-23
        disabledMinutes: () => range(30, 60), // 30-59
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4), // 20-23
      disabledMinutes: () => range(0, 31), // 0-30
      disabledSeconds: () => [55, 56],
    };
  }

  after(() => {
    [...document.body.children].forEach(item => {
      item.nodeName === 'DIV' && document.body.removeChild(item);
    })
  });

  /* test basic */
  it('basic', () => {
    wrapper = mount(
      <DatePicker />
    );
    // 弹出日期选择框
    wrapper.find('.salus-form-icon').simulate('click');
    // 是否有弹框
    const portalWrapper = wrapper.find('div.salus-calendar-picker-container');
    expect(portalWrapper).to.exist;

    // 随便点击一个日期
    const clickDate = new Date(dispatchOneDate(portalWrapper)),
          inputDate = new Date(wrapper.find('input.salus-form-control').instance().value);
    expect(compareWithoutTimer(inputDate, clickDate)).to.be.true;
  });

  /* test open */
  it('open', () => {
    wrapper = mount(
      <DatePicker open />
    );
    // 是否有弹框
    const portalWrapper = wrapper.find('div.salus-calendar-picker-container');
    expect(portalWrapper).to.exist;
  });

  /* test onChange */
  it('onChange', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <DatePicker open onChange={spy} />
    );

    // 随便点一个日期
    const portalWrapper = wrapper.find('div.salus-calendar-picker-container');
    dispatchOneDate(portalWrapper);
    expect(spy.called).to.be.true;
  });

  /* test style popStyle */
  it('style popStyle', () => {
    wrapper = mount(
      <DatePicker style={{color: 'red'}} popupStyle={{color: 'blue'}} open />
    );

    expect(wrapper.find('.salus-calendar-picker').instance().style.color).to.equal('red');
    expect(wrapper.find('div.salus-calendar-picker-container').instance().style.color).to.equal('blue');
  });

  /* test showTime */
  it('showTime', () => {
    wrapper = mount(
      <DatePicker
        showTime
        open
      />
    );
    const portalWrapper = wrapper.find('div.salus-calendar-picker-container');
    // 选择时间按钮
    const timeSelectWrapper = portalWrapper.find('.salus-calendar-time-picker-btn');
    expect(timeSelectWrapper).to.exist;
    // 随便点一个日期
    const clickDateTxt = dispatchOneDate(portalWrapper);
    // 点击选择时间按钮，切换到时间选择部分
    timeSelectWrapper.simulate('click');
    const timePickerWrapper = wrapper.find('.salus-calendar-time-picker');
    expect(timePickerWrapper).to.exist;
    const clickTimeTxt = dispatchOneTime(timePickerWrapper);
    // 比较和输入框的日期时间是否一致
    //console.log(new Date(wrapper.find('input.salus-form-control').instance().value), new Date(`${clickDateTxt} ${clickTimeTxt}`));

    expect(new Date(wrapper.find('input.salus-form-control').instance().value).valueOf() === new Date(`${clickDateTxt} ${clickTimeTxt}`).valueOf()).to.be.true;
  });

  /* test showToday */
  it('showToday', () => {
    wrapper = mount(
      <DatePicker
        showTime
        open
      />
    );
    const todayBtnWrapper = wrapper.find('.salus-calendar-today-btn');
    // 存在‘此刻’按钮
    expect(todayBtnWrapper).to.exist;

    // 点击后时间为当前时间（毫秒数会有略微误差）
    todayBtnWrapper.simulate('click');
    expect( Date.now() - new Date(wrapper.find('input.salus-form-control').instance().value).valueOf() < 1000).to.be.true;

    // 切换为无‘此刻’
    wrapper.setProps({
      showToday: false,
    });
    expect(wrapper.find('.salus-calendar-today-btn').length).to.equal(0);
  });

  /* test onOk onCancel */
  it('onOk onCancel', () => {
    const spyOk = sinon.spy(),
          spyCancel = sinon.spy();
    wrapper = mount(
      <DatePicker
        showTime
        open
        defaultValue={moment('2019-03-03 12:12:12')}
        onOk={spyOk}
        onCancel={spyCancel}
      />
    );
    const portalWrapper = wrapper.find('div.salus-calendar-picker-container');
    const footerBtnWrapper = portalWrapper.find('.salus-calendar-footer-btn button');
    // 点击确认、取消按钮
    footerBtnWrapper.at(1).instance().click();
    footerBtnWrapper.at(0).instance().click();
    expect(spyOk.called).to.true;
    expect(spyCancel.called).to.true;
  });

  /* test RangePicker basic */
  it('RangePicker basic', () => {
    wrapper = mount(
      <DatePicker.RangePicker open />
    );
    const rangeLeft = wrapper.find('.salus-calendar-range-left'),
          rangeRight = wrapper.find('.salus-calendar-range-right');
    expect(rangeLeft.length).to.equal(1);
    expect(rangeRight.length).to.equal(1);
    // 左右各随机点个日期
    const [clickDateLeftTxt, clickDateRightTxt] = dispatchOneRangeDate(wrapper);

    // 校验点击日期range与输入框是否一致
    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
          inputLeftInstance = inputWrappers.at(0).instance(),
          inputRightInstance = inputWrappers.at(1).instance();
    expect(compareWithoutTimer(new Date(clickDateLeftTxt), new Date(inputLeftInstance.value))).to.be.true;
    expect(compareWithoutTimer(new Date(clickDateRightTxt), new Date(inputRightInstance.value))).to.be.true;
  });

  /* test RangePicker onChange */
  it('RangePicker onChange', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <DatePicker.RangePicker open onChange={spy} />
    );
    // 左右各随机点个日期
    dispatchOneRangeDate(wrapper);
    expect(spy.called).to.be.true;
  });

  /* test RangePicker rangeBtnType days */
  it('RangePicker rangeBtnType days', () => {
    wrapper = mount(<DatePicker.RangePicker
      rangeBtnType={'days'}
    />);
    // 查询是否有days的按钮
    const rangeBtnWrappers = wrapper.find('button.salus-calendar-range-picker-button'),
          todayBtnWrapper = rangeBtnWrappers.at(0),
          yesterdayBtnWrapper = rangeBtnWrappers.at(1);
    expect(rangeBtnWrappers.length).to.equal(2);
    expect(todayBtnWrapper.text()).to.equal('今天');
    expect(yesterdayBtnWrapper.text()).to.equal('昨天');

    // 分别点击今天、昨天快捷按钮，校验输入框日期是否一致
    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
      inputLeftInstance = inputWrappers.at(0).instance(),
      inputRightInstance = inputWrappers.at(1).instance();

    todayBtnWrapper.simulate('click');
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), new Date())).to.be.true;
    expect(compareWithoutTimer(new Date(inputRightInstance.value), new Date())).to.be.true;

    yesterdayBtnWrapper.simulate('click');
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), getRelativeDate(new Date(), 1, 'day', false))).to.be.true;
    expect(compareWithoutTimer(new Date(inputRightInstance.value), getRelativeDate(new Date(), 1, 'day', false))).to.be.true;
  });

  /* test RangePicker rangeBtnType lastDays */
  it('RangePicker rangeBtnType lastDays', () => {
    wrapper = mount(<DatePicker.RangePicker
      rangeBtnType={'lastDays'}
    />);
    // 查询是否有lastDays的按钮
    const rangeBtnWrappers = wrapper.find('button.salus-calendar-range-picker-button'),
          lastThreeDayBtnWrapper = rangeBtnWrappers.at(0),
          lastSevenDayBtnWrapper = rangeBtnWrappers.at(1);
    expect(rangeBtnWrappers.length).to.equal(2);
    expect(lastThreeDayBtnWrapper.text()).to.equal('近3天');
    expect(lastSevenDayBtnWrapper.text()).to.equal('近7天');

    // 分别点击近3天、近7天快捷按钮，校验输入框日期是否一致
    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
      inputLeftInstance = inputWrappers.at(0).instance(),
      inputRightInstance = inputWrappers.at(1).instance();

    lastThreeDayBtnWrapper.simulate('click');
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), getRelativeDate(new Date(), 3, 'day', false))).to.be.true;
    expect(compareWithoutTimer(new Date(inputRightInstance.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

    lastSevenDayBtnWrapper.simulate('click');
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), getRelativeDate(new Date(), 7, 'day', false))).to.be.true;
    expect(compareWithoutTimer(new Date(inputRightInstance.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

  });

  /* test RangePicker rangeBtnType lastWeeksAndMonths */
  it('RangePicker rangeBtnType lastWeeksAndMonths', () => {
    wrapper = mount(<DatePicker.RangePicker
      rangeBtnType={'lastWeeksAndMonths'}
    />);
    // 查询是否有lastWeeksAndMonths的按钮
    const rangeBtnWrappers = wrapper.find('button.salus-calendar-range-picker-button'),
      lastWeekBtnWrapper = rangeBtnWrappers.at(0),
      lastTwoWeekBtnWrapper = rangeBtnWrappers.at(1),
      lastMonthBtnWrapper = rangeBtnWrappers.at(2),
      lastSixMonthBtnWrapper = rangeBtnWrappers.at(3);
    expect(rangeBtnWrappers.length).to.equal(4);
    expect(lastWeekBtnWrapper.text()).to.equal('最近一周');
    expect(lastTwoWeekBtnWrapper.text()).to.equal('最近两周');
    expect(lastMonthBtnWrapper.text()).to.equal('最近一个月');
    expect(lastSixMonthBtnWrapper.text()).to.equal('最近六个月');

    // 分别点击最近一周、最近两周、最近一个月、最近六个月快捷按钮，校验输入框日期是否一致
    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
      inputLeftInstance = inputWrappers.at(0).instance(),
      inputRightInstance = inputWrappers.at(1).instance();

    lastWeekBtnWrapper.simulate('click');
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), getRelativeDate(new Date(), 7, 'day', false))).to.be.true;
    expect(compareWithoutTimer(new Date(inputRightInstance.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

    lastTwoWeekBtnWrapper.simulate('click');
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), getRelativeDate(new Date(), 14, 'day', false))).to.be.true;
    expect(compareWithoutTimer(new Date(inputRightInstance.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

    lastMonthBtnWrapper.simulate('click');
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), getRelativeDate(new Date(), 1, 'month', false))).to.be.true;
    expect(compareWithoutTimer(new Date(inputRightInstance.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

    lastSixMonthBtnWrapper.simulate('click');
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), getRelativeDate(new Date(), 6, 'month', false))).to.be.true;
    expect(compareWithoutTimer(new Date(inputRightInstance.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

  });

  /* test RangePicker showOperation for customInput */
  it('RangePicker showOperation for customInput', () => {
    wrapper = mount(<DatePicker.RangePicker
      rangeBtnType={'lastWeeksAndMonths'}
      showOperation
      open
    />);

    // 随机点2个日期，看与显示输入框、自定义输入框是否都有跟着改变
    // 左右各随机点个日期
    const [clickLeftTxt, clickRightTxt] = dispatchOneRangeDate(wrapper);

    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
      inputLeftInstance = inputWrappers.at(0).instance(),
      inputRightInstance = inputWrappers.at(1).instance();

    // 注：输入框要重新获取wrapper，点击日期range后组建会卸载，不能在上面点击前获取自定义输入框的wrapper
    const customInputWrapper = wrapper.find('.salus-calendar-picker-container .salus-calendar-input-wrap input'),
    customInputLeftWrapper = customInputWrapper.at(0),
    customInputRightWrapper = customInputWrapper.at(1);

    expect(compareWithoutTimer(new Date(customInputLeftWrapper.instance().value), new Date(clickLeftTxt))).to.be.true;
    expect(compareWithoutTimer(new Date(customInputRightWrapper.instance().value), new Date(clickRightTxt))).to.be.true;
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), new Date(clickLeftTxt))).to.be.true;
    expect(compareWithoutTimer(new Date(inputRightInstance.value), new Date(clickRightTxt))).to.be.true;

    // 修改自定义输入框的时间，看是否日历和显示输入框有没有改变
    const datePanel = wrapper.find('.salus-calendar-date-panel'),
          partLeftInstance = datePanel.children().at(1).instance();
    // 在左侧自定义输入框模拟键盘输入: Backspace删除、1
    simulateKeyboardInput(partLeftInstance,{key: 'Backspace', keyCode: 8, target: {value: clickLeftTxt}},{target: {value: clickLeftTxt.slice(0, -1)}});
    simulateKeyboardInput(partLeftInstance,{key: 1, keyCode: 49, target: {value: clickLeftTxt.slice(0, -1)}},{target: {value: clickLeftTxt.slice(0, -1) + '1'}});

    // 查看左日历是否改变
    wrapper.find('.salus-calendar-picker-input').simulate('click');
    //console.log(wrapper.find('.salus-calendar-selected-start-date').text(), clickLeftTxt.slice(0, -1) + '1');
    expect(wrapper.find('.salus-calendar-selected-start-date').text() == new Date(clickLeftTxt.slice(0, -1) + '1').getDate()).to.be.true;
    // 查看显示输入框是否改变
    //console.log(inputLeftInstance.value, clickLeftTxt.slice(0, -1) + '1');
    expect(compareWithoutTimer(new Date(inputLeftInstance.value), new Date(clickLeftTxt.slice(0, -1) + '1'))).to.be.true;
  });

  /* test RangePicker showTime for customInput */
  it('RangePicker showTime for customInput', () => {
    wrapper = mount(<DatePicker.RangePicker
      showTime={true}
      open
    />);
    // 左右各随机点个日期
    const [clickDateLeftTxt, clickDateRightTxt] = dispatchOneRangeDate(wrapper);

    //点击选择时间切换到时分秒选择框
    const timeSelectWrapper = wrapper.find('.salus-calendar-time-picker-btn');
    timeSelectWrapper.simulate('click');

    // 随机点个时间
    const [clickTimeLeftTxt, clickTimeRightTxt] = dispatchOneRangeDate(wrapper, 'time'),
          [clickLeftTxt, clickRightTxt] = [`${clickDateLeftTxt} ${clickTimeLeftTxt}`, `${clickDateRightTxt} ${clickTimeRightTxt}`];

    //查看显示输入框、自定义输入框是否都有跟着改变
    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
          inputLeftInstance = inputWrappers.at(0).instance(),
          inputRightInstance = inputWrappers.at(1).instance();
    const customInputWrapper = wrapper.find('.salus-calendar-picker-container .salus-calendar-input-wrap input'),
          customInputLeftWrapper = customInputWrapper.at(0),
          customInputRightWrapper = customInputWrapper.at(1);
    expect(new Date(customInputLeftWrapper.instance().value).valueOf() === new Date(clickLeftTxt).valueOf()).to.be.true;
    expect(new Date(customInputRightWrapper.instance().value).valueOf() === new Date(clickRightTxt).valueOf()).to.be.true;
    expect(new Date(inputLeftInstance.value).valueOf() === new Date(clickLeftTxt).valueOf()).to.be.true;
    expect(new Date(inputRightInstance.value).valueOf() === new Date(clickRightTxt).valueOf()).to.be.true;
    // 关掉选择时间切换到日历
    timeSelectWrapper.simulate('click');

    // 修改自定义输入框的时间，看是否日历和显示输入框有没有改变
    const datePanel = wrapper.find('.salus-calendar-date-panel'),
      partLeftInstance = datePanel.children().at(1).instance();
    // 在左侧自定义输入框模拟键盘输入: Backspace 8下（把时间如00:00:00全删除了），输入11:11:11 8下
    let initTargetValue = clickLeftTxt;
    const simulateKeys = [
      ...new Array(8).fill({key: 'Backspace', keyCode: 8,}),
      ...new Array(2).fill({key: 1, keyCode: 49,}),
      ...new Array(1).fill({key: ':', keyCode: 186,}),
      ...new Array(2).fill({key: 1, keyCode: 49,}),
      ...new Array(1).fill({key: ':', keyCode: 186,}),
      ...new Array(2).fill({key: 1, keyCode: 49,})
    ];
    simulateKeys.forEach(item => {
      let toTargetValue = item.key === 'Backspace' ? initTargetValue.slice(0, -1) : (initTargetValue + item.key);
      const keyDownParam = Object.assign(item, {target: {value: initTargetValue}}),
            inputParam = Object.assign(item, {target: {value: toTargetValue}});
      initTargetValue = toTargetValue;
      simulateKeyboardInput(partLeftInstance, keyDownParam, inputParam);
    });
    expect(inputLeftInstance.value).to.equal(initTargetValue);
    timeSelectWrapper.simulate('click');
    wrapper.find('.salus-calendar-range-left .salus-calendar-time-picker-select-option-selected').forEach(timeWrapper => {
      expect(timeWrapper.text()).to.equal('11');
    });
  });

  /* test RangePicker showTime rangeBtnType hours */
  it('RangePicker showTime rangeBtnType hours', () => {
    wrapper = mount(<DatePicker.RangePicker
      showTime={true}
      rangeBtnType={'hours'}
    />);

    // 查询是否有hours的按钮
    const rangeBtnWrappers = wrapper.find('button.salus-calendar-range-picker-button'),
          last24HoursBtnWrapper = rangeBtnWrappers.at(0),
          last48HoursBtnWrapper = rangeBtnWrappers.at(1),
          last72HoursBtnWrapper = rangeBtnWrappers.at(2);
    expect(rangeBtnWrappers.length).to.equal(3);
    expect(last24HoursBtnWrapper.text()).to.equal('近24小时');
    expect(last48HoursBtnWrapper.text()).to.equal('近48小时');
    expect(last72HoursBtnWrapper.text()).to.equal('近72小时');

    // 分别点击近24小时、近48小时、近72小时（会有点毫秒误差）
    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
      inputLeftInstance = inputWrappers.at(0).instance(),
      inputRightInstance = inputWrappers.at(1).instance();

    last24HoursBtnWrapper.simulate('click');
    expect(Date.now() - new Date(inputRightInstance.value).valueOf() < 1000).to.be.true;
    expect(new Date(inputRightInstance.value).valueOf() - new Date(inputLeftInstance.value).valueOf() === 24 * 60 * 60 * 1000).to.be.true;

    last48HoursBtnWrapper.simulate('click');
    expect(Date.now() - new Date(inputRightInstance.value).valueOf() < 1000).to.be.true;
    expect(new Date(inputRightInstance.value).valueOf() - new Date(inputLeftInstance.value).valueOf() === 2 * 24 * 60 * 60 * 1000).to.be.true;

    last72HoursBtnWrapper.simulate('click');
    expect(Date.now() - new Date(inputRightInstance.value).valueOf() < 1000).to.be.true;
    expect(new Date(inputRightInstance.value).valueOf() - new Date(inputLeftInstance.value).valueOf() === 3 * 24 * 60 * 60 * 1000).to.be.true;
  });

  /* test RangePicker showTime rangeBtnType days */
  it('RangePicker showTime rangeBtnType days', () => {
    wrapper = mount(<DatePicker.RangePicker
      showTime={true}
      rangeBtnType={'days'}
    />);

    // 查询是否有days的按钮
    const rangeBtnWrappers = wrapper.find('button.salus-calendar-range-picker-button'),
      todayBtnWrapper = rangeBtnWrappers.at(0),
      yesterdayBtnWrapper = rangeBtnWrappers.at(1);
    expect(rangeBtnWrappers.length).to.equal(2);
    expect(todayBtnWrapper.text()).to.equal('今天');
    expect(yesterdayBtnWrapper.text()).to.equal('昨天');

    // 分别点击今天、昨天快捷按钮，校验输入框日期是否一致
    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
      inputLeftInstance = inputWrappers.at(0).instance(),
      inputRightInstance = inputWrappers.at(1).instance();

    todayBtnWrapper.simulate('click');
    expect(format(new Date(), 'YYYY-MM-DD') + ' 23:59:59' === inputRightInstance.value).to.be.true;
    expect(format(new Date(), 'YYYY-MM-DD') + ' 00:00:00' === inputLeftInstance.value).to.be.true;

    yesterdayBtnWrapper.simulate('click');
    expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRightInstance.value).to.be.true;
    expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeftInstance.value).to.be.true;
  });

  /* test RangePicker showTime rangeBtnType lastDays */
  it('RangePicker showTime rangeBtnType lastDays', () => {
    wrapper = mount(<DatePicker.RangePicker
      showTime={true}
      rangeBtnType={'lastDays'}
    />);
    // 查询是否有lastDays的按钮
    const rangeBtnWrappers = wrapper.find('button.salus-calendar-range-picker-button'),
      lastThreeDayBtnWrapper = rangeBtnWrappers.at(0),
      lastSevenDayBtnWrapper = rangeBtnWrappers.at(1);
    expect(rangeBtnWrappers.length).to.equal(2);
    expect(lastThreeDayBtnWrapper.text()).to.equal('近3天');
    expect(lastSevenDayBtnWrapper.text()).to.equal('近7天');

    // 分别点击近3天、近7天快捷按钮，校验输入框日期是否一致
    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
      inputLeftInstance = inputWrappers.at(0).instance(),
      inputRightInstance = inputWrappers.at(1).instance();

    lastThreeDayBtnWrapper.simulate('click');
    expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRightInstance.value).to.be.true;
    expect(format(getRelativeDate(new Date(), 3, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeftInstance.value).to.be.true;

    lastSevenDayBtnWrapper.simulate('click');
    expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRightInstance.value).to.be.true;
    expect(format(getRelativeDate(new Date(), 7, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeftInstance.value).to.be.true;

  });

  /* test RangePicker showTime rangeBtnType lastWeeksAndMonths */
  it('RangePicker showTime rangeBtnType lastWeeksAndMonths', () => {
    wrapper = mount(<DatePicker.RangePicker
      showTime={true}
      rangeBtnType={'lastWeeksAndMonths'}
    />);
    // 查询是否有lastWeeksAndMonths的按钮
    const rangeBtnWrappers = wrapper.find('button.salus-calendar-range-picker-button'),
      lastWeekBtnWrapper = rangeBtnWrappers.at(0),
      lastTwoWeekBtnWrapper = rangeBtnWrappers.at(1),
      lastMonthBtnWrapper = rangeBtnWrappers.at(2),
      lastSixMonthBtnWrapper = rangeBtnWrappers.at(3);
    expect(rangeBtnWrappers.length).to.equal(4);
    expect(lastWeekBtnWrapper.text()).to.equal('最近一周');
    expect(lastTwoWeekBtnWrapper.text()).to.equal('最近两周');
    expect(lastMonthBtnWrapper.text()).to.equal('最近一个月');
    expect(lastSixMonthBtnWrapper.text()).to.equal('最近六个月');

    // 分别点击最近一周、最近两周、最近一个月、最近六个月快捷按钮，校验输入框日期是否一致
    const inputWrappers = wrapper.find('input.salus-calendar-range-picker-input'),
      inputLeftInstance = inputWrappers.at(0).instance(),
      inputRightInstance = inputWrappers.at(1).instance();

    lastWeekBtnWrapper.simulate('click');
    expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRightInstance.value).to.be.true;
    expect(format(getRelativeDate(new Date(), 7, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeftInstance.value).to.be.true;

    lastTwoWeekBtnWrapper.simulate('click');
    expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRightInstance.value).to.be.true;
    expect(format(getRelativeDate(new Date(), 14, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeftInstance.value).to.be.true;

    lastMonthBtnWrapper.simulate('click');
    expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRightInstance.value).to.be.true;
    expect(format(getRelativeDate(new Date(), 1, 'month', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeftInstance.value).to.be.true;

    lastSixMonthBtnWrapper.simulate('click');
    expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRightInstance.value).to.be.true;
    expect(format(getRelativeDate(new Date(), 6, 'month', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeftInstance.value).to.be.true;

  });

  /* test RangePicker custom rangeBtnType */
  it('RangePicker custom rangeBtnType', () => {
    wrapper = mount(<DatePicker.RangePicker
      showTime={true}
      rangeBtnType={['last24Hours', 'today' ,  'lastThreeDays' , 'lastWeek' ,'lastMonth' ]}
    />);
    // 查询是否有lastWeeksAndMonths的按钮
    const rangeBtnWrappers = wrapper.find('button.salus-calendar-range-picker-button'),
      last24HoursBtnWrapper = rangeBtnWrappers.at(0),
      todayBtnWrapper = rangeBtnWrappers.at(1),
      lastThreeDaysBtnWrapper = rangeBtnWrappers.at(2),
      lastWeekBtnWrapper = rangeBtnWrappers.at(3),
      lastMonthBtnWrapper = rangeBtnWrappers.at(4);

    expect(rangeBtnWrappers.length).to.equal(5);
    expect(last24HoursBtnWrapper.text()).to.equal('近24小时');
    expect(todayBtnWrapper.text()).to.equal('今天');
    expect(lastThreeDaysBtnWrapper.text()).to.equal('近3天');
    expect(lastWeekBtnWrapper.text()).to.equal('最近一周');
    expect(lastMonthBtnWrapper.text()).to.equal('最近一个月');
  });

  /* test DatePicker disabledDate disabledTime */
  it('DatePicker disabledDate disabledTime', () => {
    wrapper = mount(<DatePicker
      format="YYYY-MM-DD HH:mm:ss"
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      open
      showTime
    />);

    // 看是否小于今日的日期都是disabled
    const portalWrapper = wrapper.find('div.salus-calendar-picker-container');
    portalWrapper.find('td.salus-calendar-cell').forEach(dateWrapper => {
      if(format(new Date(dateWrapper.instance().title.replace(/[年月日]/g, '-').slice(0, -1)), 'YYYY-MM-DD') < format(undefined, 'YYYY-MM-DD')){
        expect(dateWrapper.hasClass('salus-calendar-disabled-cell')).to.be.true;
      }
    });

    // 看不可用的时间是否都有disabled
    // 点击选择时间按钮
    const timeSelectWrapper = portalWrapper.find('.salus-calendar-time-picker-btn');
    timeSelectWrapper.simulate('click');

    const { disabledHours, disabledMinutes, disabledSeconds } = disabledDateTime(),
          disabledRange = [ disabledHours(), disabledMinutes(), disabledSeconds() ];
    wrapper.find('.salus-calendar-time-picker .salus-calendar-time-picker-select').forEach((selectWrapper, index) => {
      selectWrapper.find('ul li').forEach(timeWrapper => {
        disabledRange[index].includes(parseInt(timeWrapper.text())) && expect(timeWrapper.hasClass('salus-calendar-time-picker-select-option-disabled')).to.be.true;
      })
    });
  });

  /* test DatePicker MonthPicker  disabledDate */
  it('DatePicker MonthPicker  disabledDate', () => {
    wrapper = mount(<DatePicker.MonthPicker disabledDate={disabledDate} placeholder="选择月份" open showTime />);

    // 是否当前月之前的月份都用disabled
    const monthWrappers = wrapper.find('.salus-calendar-month-panel-cell');
    monthWrappers.forEach( (monthWrapper, index) => {
      if(index < new Date().getMonth()) {
        expect(monthWrapper.hasClass('salus-calendar-month-panel-cell-disabled')).to.be.true;
      }
    });
  });

  /* test RangePicker disabledTime */
  it('RangePicker disabledTime', () => {
    wrapper = mount(<DatePicker.RangePicker
      disabledTime={disabledRangeTime}
      open
      showTime={{
        hideDisabledOptions: true,
      }}
    />);

    // 是否diabled的时间都被隐藏了
    const startRange = disabledRangeTime(null, 'start'),
          startDisabledRange = [ startRange.disabledHours(), startRange.disabledMinutes(), startRange.disabledSeconds() ],
          endRange  = disabledRangeTime(null, 'end'),
          endDisabledRange = [ endRange.disabledHours(), endRange.disabledMinutes(), endRange.disabledSeconds() ];
    // 随便选一个日期（否则选择时间按钮不可点）
    dispatchOneRangeDate(wrapper);
    // 点击选择时间按钮
    const portalWrapper = wrapper.find('div.salus-calendar-picker-container'),
          timeSelectWrapper = portalWrapper.find('.salus-calendar-time-picker-btn');
    timeSelectWrapper.simulate('click');
    // 左侧时间
    wrapper.find('.salus-calendar-range-left .salus-calendar-time-picker-select').forEach( (selectWrapper, index) => {
      selectWrapper.find('ul li').forEach(timeWrapper => {
        expect(startDisabledRange[index].includes(parseInt(timeWrapper.text()))).to.be.false;
      })
    });
    // 右侧时间
    wrapper.find('.salus-calendar-range-right .salus-calendar-time-picker-select').forEach( (selectWrapper, index) => {
      selectWrapper.find('ul li').forEach(timeWrapper => {
        expect(endDisabledRange[index].includes(parseInt(timeWrapper.text()))).to.be.false;
      })
    });

  });

})