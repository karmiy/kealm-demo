import { createVue, destroyVM, triggerClick } from '../utils';

describe('InputNumber', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', done => {
        vm = createVue({
            template: `
                <sl-input-number :min="1" :max="10" v-model="value" />
            `,
            data() {
                return {
                    value: 3,
                }
            }
        });
        const input = vm.$el.querySelector('.salus-input-number-input');
        // value、max、min、step是否正确
        expect(input.value).to.equal('3');
        expect(input.getAttribute('max')).to.equal('10');
        expect(input.getAttribute('min')).to.equal('1');
        expect(input.getAttribute('step')).to.equal('1');

        // 点击箭头是否累加减
        const arrows = vm.$el.querySelector('.salus-input-number-handler-wrap').children;
        triggerClick(arrows[0]);
        vm.$nextTick(() => {
            expect(vm.value).to.equal(4);
            triggerClick(arrows[1]);
            vm.$nextTick(() => {
                expect(vm.value).to.equal(3);
                done();
            })
        })
    })

    /*test defaultValue*/
    it('defaultValue', () => {
        vm = createVue({
            template: `
                <sl-input-number :min="1" :max="10" :defaultValue="3" />
            `,
        });
        const input = vm.$el.querySelector('.salus-input-number-input');
        expect(input.value).to.equal('3');
    })

    /*test onChange*/
    it('onChange', done => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-input-number :min="1" :max="10" :defaultValue="3" @change="change" />
            `,
            methods: {
                change(value) {
                    spy(value);
                }
            }
        });
        // 点击+号是否触发change
        triggerClick(vm.$el.querySelector('.salus-input-number-handler-wrap').children[0]);
        vm.$nextTick(() => {
            expect(spy.called).to.equal(true);
            expect(spy.args[0][0]).to.equal(4);
            done();
        })
    })

    /*test max*/
    it('max', done => {
        vm = createVue({
            template: `
                <sl-input-number :min="1" :max="10" v-model="value" />
            `,
            data() {
                return {
                    value: 9,
                }
            }
        });
        // 点击+号是否到10就不能加了
        expect(vm.$el.querySelector('.salus-input-number-input').getAttribute('max')).to.equal('10');
        const arrows = vm.$el.querySelector('.salus-input-number-handler-wrap').children;
        triggerClick(arrows[0]);
        vm.$nextTick(() => {
            expect(vm.value).to.equal(10);
            triggerClick(arrows[0]);
            vm.$nextTick(() => {
                expect(vm.value).to.equal(10);
                done();
            })
        })
    })

    /*test min*/
    it('min', done => {
        vm = createVue({
            template: `
                <sl-input-number :min="1" :max="10" v-model="value" />
            `,
            data() {
                return {
                    value: 2,
                }
            }
        });
        // 点击-号是否到1就不能减了
        expect(vm.$el.querySelector('.salus-input-number-input').getAttribute('min')).to.equal('1');
        const arrows = vm.$el.querySelector('.salus-input-number-handler-wrap').children;
        triggerClick(arrows[1]);
        vm.$nextTick(() => {
            expect(vm.value).to.equal(1);
            triggerClick(arrows[1]);
            vm.$nextTick(() => {
                expect(vm.value).to.equal(1);
                done();
            })
        })
    })

    /*test step*/
    it('step', done => {
        vm = createVue({
            template: `
                <sl-input-number :min="1" :max="10" v-model="value" :step="step" />
            `,
            data() {
                return {
                    value: 2,
                    step: 1,
                }
            }
        });
        // 点击+号1次从2变成3，step变为0.1，点击+号是否变成3.1
        expect(vm.$el.querySelector('.salus-input-number-input').getAttribute('step')).to.equal('1');
        const arrows = vm.$el.querySelector('.salus-input-number-handler-wrap').children;
        triggerClick(arrows[0]);
        vm.$nextTick(() => {
            expect(vm.value).to.equal(3);
            vm.step = 0.1;
            vm.$nextTick(() => {
                triggerClick(arrows[0]);
                vm.$nextTick(() => {
                    expect(vm.value).to.equal(3.1)
                    done();
                })
            })
        })
    })

    /*test handleType symbols*/
    it('handleType symbols', done => {
        vm = createVue({
            template: `
                <sl-input-number :min="1" :max="10" v-model="value" handleType="symbols" />
            `,
            data() {
                return {
                    value: 3,
                }
            }
        });
        const input = vm.$el.querySelector('.salus-input-number-input');
        // value、max、min、step是否正确
        expect(input.value).to.equal('3');
        expect(input.getAttribute('max')).to.equal('10');
        expect(input.getAttribute('min')).to.equal('1');
        expect(input.getAttribute('step')).to.equal('1');

        // 对应class是否存在
        expect(vm.$el.classList.contains('salus-input-number-sysmbols-handler')).to.be.true;

        // 点击箭头是否累加减
        const arrows = vm.$el.querySelector('.salus-input-number-handler-wrap').children;
        triggerClick(arrows[0]);
        vm.$nextTick(() => {
            expect(vm.value).to.equal(4);
            triggerClick(arrows[1]);
            vm.$nextTick(() => {
                expect(vm.value).to.equal(3);
                done();
            })
        })
    })

    /*test disabled*/
    it('disabled', done => {
        vm = createVue({
            template: `
                <sl-input-number :min="1" :max="10" v-model="value" disabled />
            `,
            data() {
                return {
                    value: 3,
                }
            }
        });
        // 对应class是否存在
        expect(vm.$el.classList.contains('salus-input-number-disabled')).to.be.true;
        // 是否点击没反应
        const arrows = vm.$el.querySelector('.salus-input-number-handler-wrap').children;
        triggerClick(arrows[0]);
        vm.$nextTick(() => {
            expect(vm.value).to.equal(3);
            triggerClick(arrows[1]);
            vm.$nextTick(() => {
                expect(vm.value).to.equal(3);
                done();
            })
        })
    })

    /*test size*/
    it('size', done => {
        vm = createVue({
            template: `
                <sl-input-number :min="1" :max="10" v-model="value" :size="size" />
            `,
            data() {
                return {
                    value: 3,
                    size: 'large',
                }
            }
        });
        // 对应class是否存在
        expect(vm.$el.classList.contains('salus-input-number-lg')).to.be.true;
        vm.size = 'small';
        vm.$nextTick(() => {
            expect(vm.$el.classList.contains('salus-input-number-sm')).to.be.true;
            done();
        })
    })

    /*test decimal*/
    it('decimal', done => {
        vm = createVue({
            template: `
                <sl-input-number :min="0" :max="10" v-model="value" :step="step" />
            `,
            data() {
                return {
                    value: 3,
                    step: 0.1,
                }
            }
        });
        const input = vm.$el.querySelector('.salus-input-number-input');
        // value、max、min、step是否正确
        expect(input.value).to.equal('3.0');
        expect(input.getAttribute('max')).to.equal('10');
        expect(input.getAttribute('min')).to.equal('0');
        expect(input.getAttribute('step')).to.equal('0.1');
        // 累加减是否每次差值0.1
        const arrows = vm.$el.querySelector('.salus-input-number-handler-wrap').children;
        triggerClick(arrows[0]);
        vm.$nextTick(() => {
            expect(vm.value).to.equal(3.1);
            triggerClick(arrows[1]);
            vm.$nextTick(() => {
                expect(vm.value).to.equal(3.0);
                done();
            })
        })
    })

    /*test format*/
    it('format', done => {
        vm = createVue({
            template: `
                <sl-input-number v-model="value" :formatter="formatter" :parser="parser" />
            `,
            data() {
                return {
                    value: 3,
                    step: 0.1,
                }
            },
            methods: {
                formatter(value) {
                    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                },
                parser(value) {
                    return value.replace(/\$\s?|(,*)/g, '');
                },
            }
        });
        const input = vm.$el.querySelector('.salus-input-number-input');
        // 文本内容是否含$
        expect(input.value).to.equal('$ 3');
        const arrows = vm.$el.querySelector('.salus-input-number-handler-wrap').children;
        triggerClick(arrows[0]);
        vm.$nextTick(() => {
            expect(input.value).to.equal('$ 4');
            triggerClick(arrows[1]);
            vm.$nextTick(() => {
                expect(input.value).to.equal('$ 3');
                done();
            })
        })
    })

})