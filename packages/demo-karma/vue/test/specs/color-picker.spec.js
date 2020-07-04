import { createVue, destroyVM } from '../utils';

describe('ColorPicker', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', done => {
        vm = createVue({
            template: `
                <sl-color-picker />
            `,
        });
        const switchButton = vm.$el,
              triggerIcon = switchButton.querySelector('i');
        expect(triggerIcon.classList.contains('salus-icon-triangle-down')).to.be.true;
        switchButton.click();
        vm.$nextTick(() => {
            expect(triggerIcon.classList.contains('salus-icon-pop-close-o')).to.be.true;
            done();
        })
    })

    /*test defaultColor*/
    it('defaultColor', done => {
        vm = createVue({
            template: `
                <sl-color-picker defaultColor='#1394ff' />
            `,
        });
        const switchButton = vm.$el;
        switchButton.click();
        setTimeout(() => {
            expect(document.querySelector('.salus-color-picker-dropdown input').value).to.equal('#1394ff');
            done();
        }, 0);
    })

    /*test clear onChange*/
    it('clear onChange', done => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-color-picker defaultColor='#1394ff' @change="change" />
            `,
            methods: {
                change(color) {
                    spy(color);
                }
            }
        });
        const switchButton = vm.$el;
        switchButton.click();
        setTimeout(() => {
            const input = document.querySelector('.salus-color-picker-dropdown input');
            expect(input.value).to.equal('#1394ff');
            // 点击清空
            document.querySelector('.salus-color-picker-bottom button').click();
            vm.$nextTick(() => {
                expect(input.value).to.equal('');
                expect(spy.called).to.be.true;
                expect(spy.args[0][0]).to.equal('');
                done();
            })
        }, 0);
    })

    /*test buttonStyle*/
    it('buttonStyle', () => {
        vm = createVue({
            template: `
                <sl-color-picker :buttonStyle="{width: '30px', height: '30px'}" />
            `,
        });
        const switchButton = vm.$el;
        expect(switchButton.style.width).to.equal('30px');
        expect(switchButton.style.height).to.equal('30px');
    })

    /*test zIndex*/
    it('zIndex', done => {
        vm = createVue({
            template: `
                <sl-color-picker :zIndex="1000" />
            `,
        });
        const switchButton = vm.$el;
        switchButton.click();
        setTimeout(() => {
            expect(document.querySelector('.salus-drop-layer').style.zIndex).to.equal('1000');
            done();
        }, 0);
    })

    /*test init right color for hueBar*/
    it('init right color for hueBar', done => {
        vm = createVue({
            template: `
                <sl-color-picker v-model="color" />
            `,
            data() {
                return {
                    color: '#0f0',
                }
            }
        });
        const switchButton = vm.$el;
        switchButton.click();
        setTimeout(() => {
            expect(parseInt(document.querySelector('.salus-color-picker-slider-thumb').style.top)).to.equal(59);
            done();
        }, 0);
    })

    /*test change hue for ok button*/
    it('change hue for ok button', done => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-color-picker v-model="color" @change="change" />
            `,
            data() {
                return {
                    color: '#1394ff',
                }
            },
            methods: {
                change(color) {
                    spy(color);
                }
            },
        });
        const switchButton = vm.$el;
        switchButton.click();
        setTimeout(() => {
            const slider = document.querySelector('.salus-color-picker-slider'),
                    thumb = slider.querySelector('.salus-color-picker-slider-thumb');
            expect(parseInt(thumb.style.top)).to.equal(102);
            // 修改color的hue
            slider.__vue__.color.set({
                hue: 0,
            });
            vm.$nextTick(() => {
                expect(parseInt(thumb.style.top)).to.equal(0);
                // 点击确认按钮
                const okBtn = document.querySelectorAll('.salus-color-picker-bottom button')[1];
                okBtn.click();
                vm.$nextTick(() => {
                    expect(spy.called).to.be.true;
                    expect(spy.args[0][0]).to.equal('#FF1313');
                    done();
                })
            });
        }, 0);
    })

})