import { createVue, destroyVM } from '../utils';

describe('Rate', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', done => {
        vm = createVue({
            template: `
                <sl-rate v-model="value" />
            `,
            data() {
              return {
                  value: 0,
              }
            },
        });
        expect(vm.$el.children.length).to.equal(5);
        expect(vm.$el.querySelectorAll('.salus-rate-star-zero').length).to.equal(5);
        const stars = vm.$el.querySelectorAll('.salus-rate-star');
        // 点击第2个
        stars[2].click();
        vm.$nextTick(() => {
            expect(vm.$el.querySelectorAll('.salus-rate-star-zero').length).to.equal(2);
            expect(vm.$el.querySelectorAll('.salus-rate-star-full').length).to.equal(3);
            expect(vm.value).to.equal(3);
            // 再次点击清空
            stars[2].click();
            vm.$nextTick(() => {
                expect(vm.$el.querySelectorAll('.salus-rate-star-zero').length).to.equal(5);
                expect(vm.value).to.equal(0);
                done();
            })
        })
    })

    /*test allowHalf*/
    it('allowHalf', done => {
        vm = createVue({
            template: `
                <sl-rate :defaultValue="2.5" allowHalf />
            `,
        });
        const stars = vm.$el.querySelectorAll('.salus-rate-star');
        expect(vm.$el.querySelectorAll('.salus-rate-star-zero').length).to.equal(2);
        expect(vm.$el.querySelectorAll('.salus-rate-star-full').length).to.equal(2);
        expect(stars[2].classList.contains('salus-rate-star-half')).to.be.true;
        expect(stars[2].classList.contains('salus-rate-star-active')).to.be.true;
        // 点击第二颗星的后半部分
        stars[2].children[1].click();
        vm.$nextTick(() => {
            expect(vm.$el.querySelectorAll('.salus-rate-star-full').length).to.equal(3);
            done();
        })
    })

    /*test onChange*/
    it('onChange', done => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-rate @change="change" allowHalf />
            `,
            methods: {
                change(value) {
                    spy(value);
                }
            }
        });
        const stars = vm.$el.querySelectorAll('.salus-rate-star');
        stars[2].children[1].click();
        vm.$nextTick(() => {
            expect(spy.called).to.be.true;
            expect(spy.args[0][0]).to.equal(3);
            done();
        })
    })

    /*test value change for tips*/
    it('value change for tips', done => {
        vm = createVue({
            template: `
                <div>
                    <sl-rate allowHalf v-model='value'/>
                    <span>{{value}} stars</span>
                </div>
            `,
            data() {
                return {
                    value: 1.5,
                }
            },
        });
        const container = vm.$el,
              rate = container.children[0],
              tips = container.children[1];

        // 点击第二颗星的后半部分
        rate.querySelectorAll('.salus-rate-star')[2].children[1].click();
        vm.$nextTick(() => {
            expect(tips.innerText).to.equal('3 stars');
            done();
        })
    })

    /*test disabled*/
    it('disabled', done => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-rate @change="change" disabled />
            `,
            methods: {
                change(value) {
                    spy(value);
                }
            }
        });
        const stars = vm.$el.querySelectorAll('.salus-rate-star');
        stars[2].click();
        vm.$nextTick(() => {
            expect(spy.called).to.be.false;
            done();
        })
    })

    /*test allowClear*/
    it('allowClear', done => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-rate v-model="value" :allowClear="allowClear" />
            `,
            data() {
                return {
                    value: 3,
                    allowClear: true,
                }
            }
        });
        const stars = vm.$el.querySelectorAll('.salus-rate-star');
        // 点击清空
        stars[2].click();
        vm.$nextTick(() => {
            expect(vm.value).to.equal(0);
            // 不允许清空
            vm.allowClear = false;
            vm.$nextTick(() => {
                stars[2].click();
                vm.$nextTick(() => {
                    expect(vm.value).to.equal(3);
                    stars[2].click();
                    vm.$nextTick(() => {
                        expect(vm.value).to.equal(3);
                        done();
                    })
                })
            })
        })
    })

    /*test character*/
    it('character', () => {
        vm = createVue({
            template: `
                <sl-rate character="A" />
            `,
        });
        const stars = vm.$el.querySelectorAll('.salus-rate-star');
        stars.forEach(star => {
            expect(star.children[0].innerText).to.equal('A');
            expect(star.children[1].innerText).to.equal('A');
        });
    })

    /*test style*/
    it('style', () => {
        vm = createVue({
            template: `
                <sl-rate style="fontSize: 36px" />
            `,
        });
        expect(vm.$el.style.fontSize).to.equal('36px')
    })

    /*test count*/
    it('count', () => {
        vm = createVue({
            template: `
                <sl-rate :count="20" />
            `,
        });
        expect(vm.$el.children.length).to.equal(20);
    })
})