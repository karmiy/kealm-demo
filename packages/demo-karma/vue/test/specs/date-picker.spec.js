import { createVue, destroyVM, promiseNextTick, promiseEach } from '../utils';

describe('DatePicker', () => {
    let vm;
    /* open picker */
    const openPicker = (vm) => {
        // 弹出日期选择框
        const picker = vm.$el.querySelector('.salus-form-icon');
        picker.click();
        return promiseNextTick(vm, 'timeout');
    }
    /* 格式化日期 */
    const format = function (date = new Date(), fmt) {
        const o = {
            "M+": date.getMonth() + 1, //月份
            "D+": date.getDate(), //日
            "H+": date.getHours(), //24小时
            "h+": date.getHours(), //12小时
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

    /* 随机触发面板上一个日期 */
    const dispatchOneDate = (portalWrapper) => {
        // 随机得到面板上一个日期并点击
        const dateRows = portalWrapper.querySelectorAll('table.salus-calendar-table tbody.salus-calendar-tbody tr'),
            rowLength = dateRows.length,
            randomRow = dateRows[Math.random() * rowLength | 0],
            dateCols = randomRow.querySelectorAll('td.salus-calendar-cell'),
            colLength = dateCols.length,
            randomCol = dateCols[Math.random() * colLength | 0];
        // 随便点击一个日期
        const rDateStr = randomCol.title.replace(/[年月日]/g, '-').slice(0, -1);
        randomCol.click();
        return promiseNextTick(vm).then(() => format(new Date(rDateStr), 'YYYY-MM-DD'));
    }

    /* 随机触发面板上一个时间（3列 时分秒） */
    const dispatchOneTime = (timeWrapper) => {
        const timeRows = timeWrapper.querySelectorAll('.salus-calendar-time-picker-select'),
              selectTime = [];
        return promiseEach(timeRows, row => {
            const cols = row.querySelectorAll('ul li'),
                length = cols.length,
                randomCol = cols[Math.random() * length | 0];
            randomCol.click();
            selectTime.push(randomCol.innerText);
            return promiseNextTick(vm);
        }).then(() => selectTime.join(':'));
    }

    /* 随机触发range面板上一个日期/时间范围 */
    const dispatchOneRangeDate = (portalWrapper, type = 'date') => {
        const rangeLeft = portalWrapper.querySelector('.salus-calendar-range-left'),
              rangeRight = portalWrapper.querySelector('.salus-calendar-range-right');
        // 左右各随机点个日期（可以左侧点击的日期比右侧大，导致输入框值对调）
        return type === 'date' ?
            promiseEach([null, null], (_, index) => {
                return index === 0 ? dispatchOneDate(rangeLeft) : dispatchOneDate(rangeRight);
            }).then(arr => arr.sort())
            :
            promiseEach([null, null], (_, index) => {
                return index === 0 ? dispatchOneTime(rangeLeft) : dispatchOneTime(rangeRight);
            });
        /*return Promise.all(
            type === 'date' ? [dispatchOneDate(rangeLeft), dispatchOneDate(rangeRight)] : [dispatchOneTime(rangeLeft), dispatchOneTime(rangeRight)]
        ).then(arr => {
            return type === 'date' ? arr.sort() : arr;
        });*/
    }

    /* 自定义输入框，模拟键盘键入事件 */
    const simulateKeyboardInput = (partInstance, keyDown, input) => {
        partInstance.onKeyDown(keyDown);
        partInstance.onInput(input);
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
        return current && current.valueOf() < Date.now();
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

    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', async () => {
        vm = createVue({
            template: `
                <sl-date-picker />
            `,
        });
        // 点击弹出日历框
        await openPicker(vm);
        // 是否有弹框
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        expect(portalWrapper).to.exist;

        // 随便点击一个日期，判断与输入框改变的时间是否一致
        const clickDate = new Date(await dispatchOneDate(portalWrapper)),
            inputDate = new Date(vm.$el.querySelector('input.salus-form-control').value);
        expect(compareWithoutTimer(inputDate, clickDate)).to.be.true;
    })

    /*test open*/
    it('open', async () => {
        vm = createVue({
            template: `
                <sl-date-picker open />
            `,
        });
        await promiseNextTick(vm);
        // 是否有弹框
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        expect(portalWrapper).to.exist;
    })

    /*test onChange*/
    it('onChange', async () => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-date-picker open @change="change" />
            `,
            methods: {
                change(value) {
                    spy(value);
                }
            }
        });
        await promiseNextTick(vm);
        // 随便点一个日期
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        await dispatchOneDate(portalWrapper);
        expect(spy.called).to.be.true;
    })

    /*test style popupStyle*/
    it('style popupStyle', async () => {
        vm = createVue({
            template: `
                <sl-date-picker open :style="{color: 'red'}" :popupStyle="{color: 'blue'}" />
            `,
        });
        await promiseNextTick(vm);
        // 查看样式是否改变
        expect(vm.$el.style.color).to.equal('red');
        expect(document.querySelector('.salus-calendar-picker-container').style.color).to.equal('blue');
    })

    /*test showTime*/
    it('showTime', async () => {
        vm = createVue({
            template: `
                <sl-date-picker open showTime />
            `,
        });
        await promiseNextTick(vm);
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        // 是否出现选择时间按钮
        const timeSelectWrapper = portalWrapper.querySelector('.salus-calendar-time-picker-btn');
        expect(timeSelectWrapper).to.exist;
        // 随便点一个日期
        const clickDateTxt = await dispatchOneDate(portalWrapper);
        // 点击选择时间按钮，切换到时间选择部分
        timeSelectWrapper.click();
        await promiseNextTick(vm);
        // 是否成功切换
        const timePickerWrapper = document.querySelector('.salus-calendar-time-picker');
        expect(timePickerWrapper).to.exist;
        // 随便点一个时间
        const clickTimeTxt = await dispatchOneTime(timePickerWrapper);
        expect(new Date(vm.$el.querySelector('input.salus-form-control').value).valueOf() === new Date(`${clickDateTxt} ${clickTimeTxt}`).valueOf()).to.be.true;
    })

    /*test showToday*/
    it('showToday', async () => {
        vm = createVue({
            template: `
                <sl-date-picker open showTime :showToday="showToday" />
            `,
            data() {
                return {
                    showToday: true,
                }
            },
        });
        await promiseNextTick(vm);
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        // 是否存在‘此刻’按钮
        const todayBtnWrapper = portalWrapper.querySelector('.salus-calendar-today-btn');
        expect(todayBtnWrapper).to.exist;
        // 点击后时间为当前时间（毫秒数会有略微误差）
        todayBtnWrapper.click();
        const now = Date.now();
        await promiseNextTick(vm);
        expect( now - new Date(vm.$el.querySelector('input.salus-form-control').value).valueOf() < 1000).to.be.true;
        // 切换为无‘此刻’
        vm.showToday = false;
        await promiseNextTick(vm);
        expect(portalWrapper.querySelector('.salus-calendar-today-btn')).to.not.exist;
    })

    /*test onOk onCancel*/
    it('onOk onCancel', async () => {
        const spyOk = sinon.spy(),
              spyCancel = sinon.spy();
        vm = createVue({
            template: `
                <sl-date-picker open showTime :defaultValue="new Date('2019-03-03 12:12:12')" @ok="ok" @cancel="cancel" />
            `,
            methods: {
                ok(value) {
                    spyOk(value);
                },
                cancel(value) {
                    spyCancel(value);
                },
            }
        });
        await promiseNextTick(vm);
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        const footerBtnWrapper = portalWrapper.querySelectorAll('.salus-calendar-footer-btn button');
        // 点击确定、取消按钮
        footerBtnWrapper[0].click();
        footerBtnWrapper[1].click();
        await promiseNextTick(vm);
        expect(spyOk.called).to.be.true;
        expect(spyCancel.called).to.be.true;
        expect(spyOk.args[0][0].valueOf() === new Date('2019-03-03 12:12:12').valueOf());
    })

    /*test RangePicker basic*/
    it('RangePicker basic', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open />
            `,
        });
        await promiseNextTick(vm);
        // 是否有左右两侧日历
        const portalWrapper = document.querySelector('.salus-calendar-picker-container'),
              rangeLeft = portalWrapper.querySelector('.salus-calendar-range-left'),
              rangeRight = portalWrapper.querySelector('.salus-calendar-range-right');
        expect(rangeLeft).to.exist;
        expect(rangeRight).to.exist;
        // 左右各随机点个日期
        const [clickDateLeftTxt, clickDateRightTxt] = await dispatchOneRangeDate(portalWrapper);
        // 校验点击日期range与输入框是否一致
        const inputs = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
              inputLeft = inputs[0],
              inputRight = inputs[1];
        expect(compareWithoutTimer(new Date(clickDateLeftTxt), new Date(inputLeft.value))).to.be.true;
        expect(compareWithoutTimer(new Date(clickDateRightTxt), new Date(inputRight.value))).to.be.true;
    })

    /*test RangePicker onChange*/
    it('RangePicker onChange', async () => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-range-picker open @change="change" />
            `,
            methods: {
                change(value) {
                    spy(value);
                }
            },
        });
        await promiseNextTick(vm);
        // 是否有左右两侧日历
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        // 左右各随机点个日期
        await dispatchOneRangeDate(portalWrapper);
        expect(spy.called).to.be.true;
    })

    /*test RangePicker rangeBtnType days*/
    it('RangePicker rangeBtnType days', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open rangeBtnType="days" />
            `,
        });
        await promiseNextTick(vm);
        // 查询是否有days的按钮
        const rangeBtnWrappers = vm.$el.querySelectorAll('button.salus-calendar-range-picker-button'),
            todayBtnWrapper = rangeBtnWrappers[0],
            yesterdayBtnWrapper = rangeBtnWrappers[1];
        expect(rangeBtnWrappers.length).to.equal(2);
        expect(todayBtnWrapper.innerText).to.equal('今天');
        expect(yesterdayBtnWrapper.innerText).to.equal('昨天');

        // 分别点击今天、昨天快捷按钮，校验输入框日期是否一致
        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
            inputLeft = input[0],
            inputRight = input[1];
        todayBtnWrapper.click();
        await promiseNextTick(vm);
        expect(compareWithoutTimer(new Date(inputLeft.value), new Date())).to.be.true;
        expect(compareWithoutTimer(new Date(inputRight.value), new Date())).to.be.true;

        yesterdayBtnWrapper.click();
        await promiseNextTick(vm);
        expect(compareWithoutTimer(new Date(inputLeft.value), getRelativeDate(new Date(), 1, 'day', false))).to.be.true;
        expect(compareWithoutTimer(new Date(inputRight.value), getRelativeDate(new Date(), 1, 'day', false))).to.be.true;
    })

    /*test RangePicker rangeBtnType lastDays*/
    it('RangePicker rangeBtnType lastDays', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open rangeBtnType="lastDays" />
            `,
        });
        await promiseNextTick(vm);
        // 查询是否有lastDays的按钮
        const rangeBtnWrappers = vm.$el.querySelectorAll('button.salus-calendar-range-picker-button'),
              lastThreeDayBtnWrapper = rangeBtnWrappers[0],
              lastSevenDayBtnWrapper = rangeBtnWrappers[1];
        expect(rangeBtnWrappers.length).to.equal(2);
        expect(lastThreeDayBtnWrapper.innerText).to.equal('近3天');
        expect(lastSevenDayBtnWrapper.innerText).to.equal('近7天');

        // 分别点击近3天、近7天快捷按钮，校验输入框日期是否一致
        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
            inputLeft = input[0],
            inputRight = input[1];
        lastThreeDayBtnWrapper.click();
        await promiseNextTick(vm);
        expect(compareWithoutTimer(new Date(inputLeft.value), getRelativeDate(new Date(), 3, 'day', false))).to.be.true;
        expect(compareWithoutTimer(new Date(inputRight.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

        lastSevenDayBtnWrapper.click();
        await promiseNextTick(vm);
        expect(compareWithoutTimer(new Date(inputLeft.value), getRelativeDate(new Date(), 7, 'day', false))).to.be.true;
        expect(compareWithoutTimer(new Date(inputRight.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;
    })

    /*test RangePicker rangeBtnType lastWeeksAndMonths*/
    it('RangePicker rangeBtnType lastWeeksAndMonths', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open rangeBtnType="lastWeeksAndMonths" />
            `,
        });
        await promiseNextTick(vm);
        // 查询是否有lastWeeksAndMonths的按钮
        const rangeBtnWrappers = vm.$el.querySelectorAll('button.salus-calendar-range-picker-button'),
              lastWeekBtnWrapper = rangeBtnWrappers[0],
              lastTwoWeekBtnWrapper = rangeBtnWrappers[1],
              lastMonthBtnWrapper = rangeBtnWrappers[2],
              lastSixMonthBtnWrapper = rangeBtnWrappers[3];
        expect(rangeBtnWrappers.length).to.equal(4);
        expect(lastWeekBtnWrapper.innerText).to.equal('最近一周');
        expect(lastTwoWeekBtnWrapper.innerText).to.equal('最近两周');
        expect(lastMonthBtnWrapper.innerText).to.equal('最近一个月');
        expect(lastSixMonthBtnWrapper.innerText).to.equal('最近六个月');

        // 分别点击最近一周、最近两周、最近一个月、最近六个月快捷按钮，校验输入框日期是否一致
        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
            inputLeft = input[0],
            inputRight = input[1];
        lastWeekBtnWrapper.click();
        await promiseNextTick(vm);
        expect(compareWithoutTimer(new Date(inputLeft.value), getRelativeDate(new Date(), 7, 'day', false))).to.be.true;
        expect(compareWithoutTimer(new Date(inputRight.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

        lastTwoWeekBtnWrapper.click();
        await promiseNextTick(vm);
        expect(compareWithoutTimer(new Date(inputLeft.value), getRelativeDate(new Date(), 14, 'day', false))).to.be.true;
        expect(compareWithoutTimer(new Date(inputRight.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

        lastMonthBtnWrapper.click();
        await promiseNextTick(vm);
        expect(compareWithoutTimer(new Date(inputLeft.value), getRelativeDate(new Date(), 1, 'month', false))).to.be.true;
        expect(compareWithoutTimer(new Date(inputRight.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;

        lastSixMonthBtnWrapper.click();
        await promiseNextTick(vm);
        expect(compareWithoutTimer(new Date(inputLeft.value), getRelativeDate(new Date(), 6, 'month', false))).to.be.true;
        expect(compareWithoutTimer(new Date(inputRight.value),  getRelativeDate(new Date(), 1, 'day', false))).to.be.true;
    })

    /*test RangePicker showOperation for customInput*/
    it('RangePicker showOperation for customInput', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open showOperation rangeBtnType="lastWeeksAndMonths" />
            `,
        });
        await promiseNextTick(vm);
        // 随机点2个日期，看与显示输入框、自定义输入框是否都有跟着改变
        // 左右各随机点个日期
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        const [clickLeftTxt, clickRightTxt] = await dispatchOneRangeDate(portalWrapper);

        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
            inputLeft = input[0],
            inputRight = input[1];

        // 注：输入框要重新获取wrapper，点击日期range后组建会卸载，不能在上面点击前获取自定义输入框的wrapper
        const customInput = portalWrapper.querySelectorAll('.salus-calendar-picker-container .salus-calendar-input-wrap input'),
              customInputLeft = customInput[0],
              customInputRight = customInput[1];

        expect(compareWithoutTimer(new Date(customInputLeft.value), new Date(clickLeftTxt))).to.be.true;
        expect(compareWithoutTimer(new Date(customInputRight.value), new Date(clickRightTxt))).to.be.true;
        expect(compareWithoutTimer(new Date(inputLeft.value), new Date(clickLeftTxt))).to.be.true;
        expect(compareWithoutTimer(new Date(inputRight.value), new Date(clickRightTxt))).to.be.true;

        // 修改自定义输入框的时间，看是否日历和显示输入框有没有改变
        const partLeftInstance = portalWrapper.querySelector('.salus-calendar-date-panel .salus-calendar-range-part').__vue__;
        // 在左侧自定义输入框模拟键盘输入: Backspace删除、Backspace删除、0、1
        let initTargetValue = clickLeftTxt;
        const simulateKeys = [
            {key: 'Backspace', keyCode: 8},
            {key: 'Backspace', keyCode: 8},
            {key: '0', keyCode: 48},
            {key: '1', keyCode: 49},
        ]
        await promiseEach(simulateKeys, item => {
            let toTargetValue = item.key === 'Backspace' ? initTargetValue.slice(0, -1) : (initTargetValue + item.key);
            const keyDownParam = Object.assign(item, {target: {value: initTargetValue}}),
                inputParam = Object.assign(item, {target: {value: toTargetValue}});
            initTargetValue = toTargetValue;
            simulateKeyboardInput(partLeftInstance, keyDownParam, inputParam);
            return promiseNextTick(vm);
        });

        // 查看左日历是否改变为01号
        expect(portalWrapper.querySelector('.salus-calendar-selected-start-date').textContent).to.equal('1');
        // 查看显示输入框是否改变
        expect(compareWithoutTimer(new Date(inputLeft.value), new Date(clickLeftTxt.slice(0, -2) + '01'))).to.be.true;
    })

    /*test RangePicker showTime for customInput*/
    it('RangePicker showTime for customInput', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open showTime />
            `,
        });
        await promiseNextTick(vm);
        // 左右各随机点个日期
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        const [clickDateLeftTxt, clickDateRightTxt] = await dispatchOneRangeDate(portalWrapper);

        // 点击选择时间切换到时分秒选择框
        const timeSelectWrapper = portalWrapper.querySelector('.salus-calendar-time-picker-btn');
        timeSelectWrapper.click();
        await promiseNextTick(vm);

        // 随机点个时间
        const [clickTimeLeftTxt, clickTimeRightTxt] = await dispatchOneRangeDate(portalWrapper, 'time'),
            [clickLeftTxt, clickRightTxt] = [`${clickDateLeftTxt} ${clickTimeLeftTxt}`, `${clickDateRightTxt} ${clickTimeRightTxt}`];

        //查看显示输入框、自定义输入框是否都有跟着改变
        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
              inputLeft = input[0],
              inputRight = input[1];
        const customInput = portalWrapper.querySelectorAll('.salus-calendar-picker-container .salus-calendar-input-wrap input'),
              customInputLeft = customInput[0],
              customInputRight = customInput[1];
        expect(new Date(customInputLeft.value).valueOf() === new Date(clickLeftTxt).valueOf()).to.be.true;
        expect(new Date(customInputRight.value).valueOf() === new Date(clickRightTxt).valueOf()).to.be.true;
        expect(new Date(inputLeft.value).valueOf() === new Date(clickLeftTxt).valueOf()).to.be.true;
        expect(new Date(inputRight.value).valueOf() === new Date(clickRightTxt).valueOf()).to.be.true;

        // 关掉选择时间切换到日历
        timeSelectWrapper.click();
        await promiseNextTick(vm);

        // 修改自定义输入框的时间，看是否日历和显示输入框有没有改变
        const partLeftInstance = portalWrapper.querySelector('.salus-calendar-date-panel .salus-calendar-range-part').__vue__;

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
        await promiseEach(simulateKeys, item => {
            let toTargetValue = item.key === 'Backspace' ? initTargetValue.slice(0, -1) : (initTargetValue + item.key);
            const keyDownParam = Object.assign(item, {target: {value: initTargetValue}}),
                inputParam = Object.assign(item, {target: {value: toTargetValue}});
            initTargetValue = toTargetValue;
            simulateKeyboardInput(partLeftInstance, keyDownParam, inputParam);
            return promiseNextTick(vm);
        });
        expect(inputLeft.value).to.equal(initTargetValue);

        // 切换到时间列表，看左侧是不是11:11:11
        timeSelectWrapper.click();
        await promiseNextTick(vm);
        const selectedOptions = portalWrapper.querySelectorAll('.salus-calendar-range-left .salus-calendar-time-picker-select-option-selected');
        [...selectedOptions].forEach(timeWrapper => {
            expect(timeWrapper.textContent).to.equal('11');
        });
    })

    /*test RangePicker showTime rangeBtnType hours*/
    it('RangePicker showTime rangeBtnType hours', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open showTime rangeBtnType="hours" />
            `,
        });
        await promiseNextTick(vm);
        // 查询是否有近3天的按钮
        const rangeBtnWrappers = vm.$el.querySelectorAll('button.salus-calendar-range-picker-button'),
            last24HoursBtnWrapper = rangeBtnWrappers[0],
            last48HoursBtnWrapper = rangeBtnWrappers[1],
            last72HoursBtnWrapper = rangeBtnWrappers[2];
        expect(rangeBtnWrappers.length).to.equal(3);
        expect(last24HoursBtnWrapper.innerText).to.equal('近24小时');
        expect(last48HoursBtnWrapper.innerText).to.equal('近48小时');
        expect(last72HoursBtnWrapper.innerText).to.equal('近72小时');

        // 分别点击近24小时、近48小时、近72小时（会有点毫秒误差）
        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
            inputLeft = input[0],
            inputRight = input[1];
        last24HoursBtnWrapper.click();
        let now = Date.now();
        await promiseNextTick(vm);
        expect(now - new Date(inputRight.value).valueOf() < 1000).to.be.true;
        expect(new Date(inputRight.value).valueOf() - new Date(inputLeft.value).valueOf() === 24 * 60 * 60 * 1000).to.be.true;

        last48HoursBtnWrapper.click();
        now = Date.now();
        await promiseNextTick(vm);
        expect(now - new Date(inputRight.value).valueOf() < 1000).to.be.true;
        expect(new Date(inputRight.value).valueOf() - new Date(inputLeft.value).valueOf() === 2 * 24 * 60 * 60 * 1000).to.be.true;

        last72HoursBtnWrapper.click();
        now = Date.now();
        await promiseNextTick(vm);
        expect(now - new Date(inputRight.value).valueOf() < 1000).to.be.true;
        expect(new Date(inputRight.value).valueOf() - new Date(inputLeft.value).valueOf() === 3 * 24 * 60 * 60 * 1000).to.be.true;
    })

    /*test RangePicker showTime rangeBtnType days*/
    it('RangePicker showTime rangeBtnType days', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open showTime rangeBtnType="days" />
            `,
        });
        await promiseNextTick(vm);
        // 查询是否有days的按钮
        const rangeBtnWrappers = vm.$el.querySelectorAll('button.salus-calendar-range-picker-button'),
            todayBtnWrapper = rangeBtnWrappers[0],
            yesterdayBtnWrapper = rangeBtnWrappers[1];
        expect(rangeBtnWrappers.length).to.equal(2);
        expect(todayBtnWrapper.innerText).to.equal('今天');
        expect(yesterdayBtnWrapper.innerText).to.equal('昨天');

        // 分别点击今天、昨天快捷按钮，校验输入框日期是否一致
        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
            inputLeft = input[0],
            inputRight = input[1];
        todayBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(new Date(), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(new Date(), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;

        yesterdayBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;
    })

    /*test RangePicker showTime rangeBtnType lastDays*/
    it('RangePicker showTime rangeBtnType lastDays', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open showTime rangeBtnType="lastDays" />
            `,
        });
        await promiseNextTick(vm);
        // 查询是否有lastDays的按钮
        const rangeBtnWrappers = vm.$el.querySelectorAll('button.salus-calendar-range-picker-button'),
            lastThreeDayBtnWrapper = rangeBtnWrappers[0],
            lastSevenDayBtnWrapper = rangeBtnWrappers[1];
        expect(rangeBtnWrappers.length).to.equal(2);
        expect(lastThreeDayBtnWrapper.innerText).to.equal('近3天');
        expect(lastSevenDayBtnWrapper.innerText).to.equal('近7天');

        // 分别点击近3天、近7天快捷按钮，校验输入框日期是否一致
        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
            inputLeft = input[0],
            inputRight = input[1];
        lastThreeDayBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 3, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;

        lastSevenDayBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 7, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;
    })

    /*test RangePicker showTime rangeBtnType lastWeeksAndMonths*/
    it('RangePicker showTime rangeBtnType lastWeeksAndMonths', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open showTime rangeBtnType="lastWeeksAndMonths" />
            `,
        });
        await promiseNextTick(vm);
        // 查询是否有lastWeeksAndMonths的按钮
        const rangeBtnWrappers = vm.$el.querySelectorAll('button.salus-calendar-range-picker-button'),
            lastWeekBtnWrapper = rangeBtnWrappers[0],
            lastTwoWeekBtnWrapper = rangeBtnWrappers[1],
            lastMonthBtnWrapper = rangeBtnWrappers[2],
            lastSixMonthBtnWrapper = rangeBtnWrappers[3];
        expect(rangeBtnWrappers.length).to.equal(4);
        expect(lastWeekBtnWrapper.innerText).to.equal('最近一周');
        expect(lastTwoWeekBtnWrapper.innerText).to.equal('最近两周');
        expect(lastMonthBtnWrapper.innerText).to.equal('最近一个月');
        expect(lastSixMonthBtnWrapper.innerText).to.equal('最近六个月');

        // 分别点击最近一周、最近两周、最近一个月、最近六个月快捷按钮，校验输入框日期是否一致
        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
            inputLeft = input[0],
            inputRight = input[1];
        lastWeekBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 7, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;

        lastTwoWeekBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 14, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;

        lastMonthBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 1, 'month', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;

        lastSixMonthBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 6, 'month', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;
    })

    /*test RangePicker custom rangeBtnType*/
    it('RangePicker custom rangeBtnType', async () => {
        vm = createVue({
            template: `
                <sl-range-picker open showTime :rangeBtnType="['last24Hours', 'today' , 'lastThreeDays', 'lastWeek', 'lastMonth' ]" />
            `,
        });
        await promiseNextTick(vm);
        // 查询是否有自定义的按钮
        const rangeBtnWrappers = vm.$el.querySelectorAll('button.salus-calendar-range-picker-button'),
            last24HoursBtnWrapper = rangeBtnWrappers[0],
            todayBtnWrapper = rangeBtnWrappers[1],
            lastThreeDaysBtnWrapper = rangeBtnWrappers[2],
            lastWeekBtnWrapper = rangeBtnWrappers[3],
            lastMonthBtnWrapper = rangeBtnWrappers[4];

        expect(rangeBtnWrappers.length).to.equal(5);
        expect(last24HoursBtnWrapper.innerText).to.equal('近24小时');
        expect(todayBtnWrapper.innerText).to.equal('今天');
        expect(lastThreeDaysBtnWrapper.innerText).to.equal('近3天');
        expect(lastWeekBtnWrapper.innerText).to.equal('最近一周');
        expect(lastMonthBtnWrapper.innerText).to.equal('最近一个月');

        // 分别点击近24小时、今天、近3天、最近一个月、最近一个月快捷按钮，校验输入框日期是否一致
        const input = vm.$el.querySelectorAll('input.salus-calendar-range-picker-input'),
            inputLeft = input[0],
            inputRight = input[1];

        last24HoursBtnWrapper.click();
        let now = Date.now();
        await promiseNextTick(vm);
        expect(now - new Date(inputRight.value).valueOf() < 1000).to.be.true;
        expect(new Date(inputRight.value).valueOf() - new Date(inputLeft.value).valueOf() === 24 * 60 * 60 * 1000).to.be.true;

        todayBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(new Date(), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(new Date(), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;

        lastThreeDaysBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 3, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;

        lastWeekBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 7, 'day', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;

        lastMonthBtnWrapper.click();
        await promiseNextTick(vm);
        expect(format(getRelativeDate(new Date(), 1, 'day', false), 'YYYY-MM-DD') + ' 23:59:59' === inputRight.value).to.be.true;
        expect(format(getRelativeDate(new Date(), 1, 'month', false), 'YYYY-MM-DD') + ' 00:00:00' === inputLeft.value).to.be.true;
    })

    /*test DatePicker disabledDate disabledTime*/
    it('DatePicker disabledDate disabledTime', async () => {
        vm = createVue({
            template: `
                <sl-date-picker 
                    open
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    :disabledDate="disabledDate"
                    :disabledTime="disabledTime"
                 />
            `,
            methods: {
                disabledDate(...rest) {
                    return disabledDate(...rest);
                },
                disabledTime(...rest) {
                    return disabledDateTime(...rest);
                },
            }
        });
        await promiseNextTick(vm);

        // 看是否小于今日的日期都是disabled
        const portalWrapper = document.querySelector('.salus-calendar-picker-container');
        [...portalWrapper.querySelectorAll('td.salus-calendar-cell')].forEach(dateWrapper => {
            if(format(new Date(dateWrapper.title.replace(/[年月日]/g, '-').slice(0, -1)), 'YYYY-MM-DD') < format(undefined, 'YYYY-MM-DD')){
                expect(dateWrapper.classList.contains('salus-calendar-disabled-cell')).to.be.true;
            }
        });

        // 看不可用的时间是否都有disabled
        // 点击选择时间按钮
        const timeSelectWrapper = portalWrapper.querySelector('.salus-calendar-time-picker-btn');
        timeSelectWrapper.click();
        await promiseNextTick(vm);

        const { disabledHours, disabledMinutes, disabledSeconds } = disabledDateTime(),
                disabledRange = [ disabledHours(), disabledMinutes(), disabledSeconds() ];
        [...portalWrapper.querySelectorAll('.salus-calendar-time-picker .salus-calendar-time-picker-select')].forEach((selectWrapper, index) => {
            [...selectWrapper.querySelectorAll('ul li')].forEach(timeWrapper => {
                disabledRange[index].includes(parseInt(timeWrapper.textContent)) && expect(timeWrapper.classList.contains('salus-calendar-time-picker-select-option-disabled')).to.be.true;
            })
        });
    })

    /*test DatePicker MonthPicker  disabledDate*/
    it('DatePicker MonthPicker  disabledDate', async () => {
        vm = createVue({
            template: `
                <sl-month-picker 
                    open
                    showTime
                    placeholder="选择月份"
                    :disabledDate="disabledDate"
                 />
            `,
            methods: {
                disabledDate(...rest) {
                    return disabledDate(...rest);
                },
            }
        });
        await promiseNextTick(vm);

        // 是否当前月之前的月份都用disabled
        const monthWrappers = document.querySelectorAll('.salus-calendar-month-panel-cell');
        [...monthWrappers].forEach( (monthWrapper, index) => {
            if(index < new Date().getMonth()) {
                expect(monthWrapper.classList.contains('salus-calendar-month-panel-cell-disabled')).to.be.true;
            }
        });
    })

    /*test RangePicker disabledTime*/
    it('RangePicker disabledTime', async () => {
        vm = createVue({
            template: `
                <sl-range-picker 
                    open
                    :showTime="{ hideDisabledOptions: true }"
                    :disabledTime="disabledTime"
                 />
            `,
            methods: {
                disabledTime(...rest) {
                    return disabledRangeTime(...rest);
                },
            }
        });
        await promiseNextTick(vm);

        // 是否diabled的时间都被隐藏了
        const startRange = disabledRangeTime(null, 'start'),
            startDisabledRange = [ startRange.disabledHours(), startRange.disabledMinutes(), startRange.disabledSeconds() ],
            endRange  = disabledRangeTime(null, 'end'),
            endDisabledRange = [ endRange.disabledHours(), endRange.disabledMinutes(), endRange.disabledSeconds() ];

        const portalWrapper = document.querySelector('.salus-calendar-picker-container'),
                timeSelectWrapper = portalWrapper.querySelector('.salus-calendar-time-picker-btn');
        // 先随便选一个日期（否则选择时间按钮不可点）
        await dispatchOneRangeDate(portalWrapper);
        // 点击选择时间按钮
        timeSelectWrapper.click();
        await promiseNextTick(vm);
        // 左侧时间禁用的是否隐藏
        [...portalWrapper.querySelectorAll('.salus-calendar-range-left .salus-calendar-time-picker-select')].forEach( (selectWrapper, index) => {
            [...selectWrapper.querySelectorAll('ul li')].forEach(timeWrapper => {
                expect(startDisabledRange[index].includes(parseInt(timeWrapper.textContent))).to.be.false;
            })
        });

        // 右侧时间禁用的是否隐藏
        [...portalWrapper.querySelectorAll('.salus-calendar-range-right .salus-calendar-time-picker-select')].forEach( (selectWrapper, index) => {
            [...selectWrapper.querySelectorAll('ul li')].forEach(timeWrapper => {
                expect(endDisabledRange[index].includes(parseInt(timeWrapper.textContent))).to.be.false;
            })
        });
    })
})