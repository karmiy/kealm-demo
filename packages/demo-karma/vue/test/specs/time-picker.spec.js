import { createVue, destroyVM, promiseNextTick, promiseEach } from '../utils';

describe('TimePicker', () => {
    let vm;
    /* open picker */
    const openPicker = (vm) => {
        // 弹出时间选择框
        const picker = vm.$el.querySelector('.salus-time-picker-input-header');
        picker.click();
        return promiseNextTick(vm, 'timeout');
    }
    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', async () => {
        vm = createVue({
            template: `
                <sl-time-picker />
            `,
        });
        // 弹出时间选择框
        await openPicker(vm);
        // 查看是否有弹框出来
        const portal = document.querySelector('.salus-time-picker-panel');
        expect(portal).to.exist;
        // 点击05:05:05
        const selectPanels = document.querySelectorAll('.salus-time-picker-panel-select');
        await promiseEach(selectPanels, panel => {
            panel.querySelectorAll('ul li')[5].click();
            return promiseNextTick(vm);
        });
        const input = vm.$el.querySelector('input.salus-time-picker-input');
        expect(input.value).to.equal('05:05:05');
    })

    /*test defaultOpenValue*/
    it('defaultOpenValue', async () => {
        vm = createVue({
            template: `
                <sl-time-picker :defaultOpenValue="defaultOpenValue" />
            `,
            data() {
                return {
                    defaultOpenValue: new Date('2019-01-01 00:00:00'),
                }
            },
        });
        // 弹出时间选择框
        await openPicker(vm);

        // 选中的时间是否00:00:00
        const selectedOptions = document.querySelectorAll('.salus-time-picker-panel-select-option-selected');
        [...selectedOptions].forEach(option => {
            expect(option.innerText).to.equal('00');
        })
    })

    /*test onChange*/
    it('onChange', async () => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-time-picker @change="change" />
            `,
            methods: {
                change(value) {
                    spy(value);
                }
            },
        });
        // 弹出时间选择框
        await openPicker(vm);

        // 点击时间 05:05:;05
        // 点击05:05:05
        const selectPanels = document.querySelectorAll('.salus-time-picker-panel-select');
        await promiseEach(selectPanels, panel => {
            panel.querySelectorAll('ul li')[5].click();
            return promiseNextTick(vm);
        });
        expect(spy.called).to.be.true;
    })

    /*test allowClear*/
    it('allowClear', async () => {
        vm = createVue({
            template: `
                <sl-time-picker :defaultValue="defaultValue" />
            `,
            data() {
                return {
                    defaultValue: new Date('2019-01-01 12:12:12'),
                }
            },
        });
        // 点击清空，查看是否清空
        const clearBtn = vm.$el.querySelector('.salus-time-picker-panel-clear-btn'),
                input = vm.$el.querySelector('input.salus-time-picker-input');
        expect(input.value).to.equal('12:12:12');
        clearBtn.click();
        await promiseNextTick(vm);
        expect(input.value).to.equal('');
    })

    /*test open*/
    it('open', async () => {
        vm = createVue({
            template: `
                <sl-time-picker open />
            `,
        });
        await promiseNextTick(vm);
        // 是否有自动打开弹框
        expect(document.querySelector('.salus-time-picker-panel')).to.exist;
    })

    /*test onOpenChange*/
    it('onOpenChange', async () => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-time-picker @openChange="onOpenChange" />
            `,
            methods: {
                onOpenChange(value) {
                    spy(value);
                }
            }
        });
        // 弹出时间选择框
        await openPicker(vm);
        await promiseNextTick(vm);
        // 是否有自动打开弹框
        expect(spy.called).to.be.true;
    })

    /*test addon*/
    it('addon', async () => {
        vm = createVue({
            template: `
                <sl-time-picker>
                    <sl-button slot="addon" size="small">取消</sl-button>
                    <sl-button slot="addon" size="small" type="primary">确定</sl-button>
                </sl-time-picker>
            `,
        });
        // 弹出时间选择框
        await openPicker(vm);
        await promiseNextTick(vm);
        // 是否有addon的内容
        const addOn = document.querySelector('.salus-time-picker-panel .salus-time-picker-addon');
        expect(addOn.children.length).to.equal(2);
        expect(addOn.children[0].outerHTML).to.equal('<button type="button" class="salus-button salus-button-default salus-button-small"><span>取消</span></button>');
        expect(addOn.children[1].outerHTML).to.equal('<button type="button" class="salus-button salus-button-primary salus-button-default salus-button-small"><span>确定</span></button>');
    })

    /*test disabled*/
    it('disabled', async () => {
        const disabledHours = [ 1, 2, 3 ],
              disabledMinutes = [ 20, 21, 22, 23, 24, 25 ],
              disabledSeconds = [ 20, 21, 22, 23, 24, 25 ];
        vm = createVue({
            template: `
                <sl-time-picker
                    open
                    :disabledHours="disabledHours" 
                    :disabledMinutes="disabledMinutes"
                    :disabledSeconds="disabledSeconds"
                 />
            `,
            methods: {
                disabledHours() {
                    return disabledHours;
                },
                disabledMinutes() {
                    return disabledMinutes;
                },
                disabledSeconds() {
                    return disabledSeconds;
                },
            }
        });
        await promiseNextTick(vm);
        // 是否时、分、秒都有对应禁用
        const selectPanel = document.querySelectorAll('.salus-time-picker-panel-select');
        [...selectPanel].forEach((panel, index) => {
            const lst = panel.querySelectorAll('ul li');
            // 时
            index === 0 && disabledHours.forEach(time => {
                expect(lst[time].classList.contains('salus-time-picker-panel-select-option-disabled')).to.be.true;
            });
            // 分
            index === 1 && disabledMinutes.forEach(time => {
                expect(lst[time].classList.contains('salus-time-picker-panel-select-option-disabled')).to.be.true;
            });
            // 秒
            index === 2 && disabledSeconds.forEach(time => {
                expect(lst[time].classList.contains('salus-time-picker-panel-select-option-disabled')).to.be.true;
            })
        });
    })

    /*test format*/
    it('format', async () => {
        vm = createVue({
            template: `
                <sl-time-picker open format='HH:mm' />
            `,
        });
        await promiseNextTick(vm);
        // 弹框是否只有2列时间列表
        const portal = document.querySelector('div.salus-time-picker-panel'),
            selectPanel = portal.querySelectorAll('.salus-time-picker-panel-select');
        expect(selectPanel.length).to.equal(2);

        // 点击时间 05:05
        const selectPanels = portal.querySelectorAll('.salus-time-picker-panel-select');
        await promiseEach(selectPanels, panel => {
            panel.querySelectorAll('ul li')[5].click();
            return promiseNextTick(vm);
        })
        const input = vm.$el.querySelector('input.salus-time-picker-input');
        expect(input.value).to.equal('05:05');
    })

    /*test hourStep、minuteStep、secondStep*/
    it('hourStep、minuteStep、secondStep', async () => {
        vm = createVue({
            template: `
                <sl-time-picker open :hourStep='2' :minuteStep='3' :secondStep='4' />
            `,
        });
        await promiseNextTick(vm);
        // 时间列表是否有符合间隔
        const selectPanel = document.querySelectorAll('.salus-time-picker-panel .salus-time-picker-panel-select');
        let hourStep = 0, minuteStep = 0, secondStep = 0;
        [...selectPanel].forEach((panel, index) => {
            // 时
            index === 0 && panel.querySelectorAll('ul li').forEach( time => {
                expect(parseInt(time.innerText)).to.equal(hourStep);
                hourStep += 2;
            });
            // 分
            index === 1 && panel.querySelectorAll('ul li').forEach( time => {
                expect(parseInt(time.innerText)).to.equal(minuteStep);
                minuteStep += 3;
            });
            // 秒
            index === 2 && panel.querySelectorAll('ul li').forEach( time => {
                expect(parseInt(time.innerText)).to.equal(secondStep);
                secondStep += 4;
            });
        })
    })

    /*test popupClassName*/
    it('popupClassName', async () => {
        vm = createVue({
            template: `
                <sl-time-picker open popupClassName='pop-panel' />
            `,
        });
        await promiseNextTick(vm);
        const popWrapper = document.querySelector('.salus-time-picker-panel');
        expect(popWrapper.classList.contains('pop-panel')).to.be.true;
    })

    /*test suffixIcon*/
    it('suffixIcon', async () => {
        vm = createVue({
            template: `
                <sl-time-picker>
                    <i slot="suffixIcon" class="salus-icon-check-o"></i>
                </sl-time-picker>
            `,
        });
        expect(vm.$el.querySelector('i.salus-icon-check-o')).to.exist;
    })

    /*test clearText*/
    it('clearText', async () => {
        vm = createVue({
            template: `
                <sl-time-picker clearText="clear-all" />
            `,
        });
        expect(vm.$el.querySelector('.salus-time-picker-panel-clear-btn').title).to.equal('clear-all');
    })

})