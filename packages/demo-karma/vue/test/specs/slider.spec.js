import { createVue, destroyVM } from '../utils';

describe('Slider', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', done => {
        vm = createVue({
            template: `
                <sl-slider v-model="value" :min="5" :max="20" />
            `,
            data() {
              return {
                  value: 10,
              }
            },
        });
        expect(vm.$el.querySelector('.salus-slider-handle').getAttribute('aria-valuenow')).to.equal('10');
        // 是否最大最小值有效
        vm.value = 30;
        vm.$nextTick(() => {
            expect(vm.value).to.equal(20);
            vm.value = 1;
            vm.$nextTick(() => {
                expect(vm.value).to.equal(5);
                done();
            })
        })
    })

    /*test disabled*/
    it('disabled', () => {
        vm = createVue({
            template: `
                <sl-slider v-model="value" disabled />
            `,
            data() {
                return {
                    value: 10,
                }
            },
        });
        expect(vm.$el.classList.contains('salus-slider-disabled')).to.be.true;
    })

    /*test tipFormatter*/
    it('tipFormatter', done => {
        vm = createVue({
            template: `
                <sl-slider v-model="value" :tipFormatter="showTip ? tip : null" />
            `,
            data() {
                return {
                    showTip: false,
                    value: 10,
                }
            },
            methods: {
                tip(value) {
                    return `${value}M`;
                }
            }
        });
        vm.$children[0].visibles = {0: true};
        setTimeout(() => {
            expect(document.querySelector('.salus-tooltip')).to.be.null;
            vm.showTip = true;
            setTimeout(() => {
                expect(document.querySelector('.salus-tooltip').innerText).to.equal('10M');
                done();
            }, 0)
        },0)
    })

    /*test range slider*/
    it('range slider', done => {
        vm = createVue({
            template: `
                <sl-slider v-model="value" range />
            `,
            data() {
                return {
                    value: [20, 50],
                }
            },
        });
        const handles = vm.$el.querySelectorAll('.salus-slider-handle');
        expect(handles[0].style.left).to.equal('20%');
        expect(handles[1].style.left).to.equal('50%');
        vm.value = [10, 70];
        vm.$nextTick(() => {
            expect(handles[0].style.left).to.equal('10%');
            expect(handles[1].style.left).to.equal('70%');
            done();
        })
    })

    /*test vertical*/
    it('vertical', () => {
        vm = createVue({
            template: `
                <sl-slider v-model="value" vertical />
            `,
            data() {
                return {
                    value: 30,
                }
            },
        });
        expect(vm.$el.classList.contains('salus-slider-vertical')).to.be.true;
        const track = vm.$el.querySelector('.salus-slider-track'),
              handle = vm.$el.querySelector('.salus-slider-handle');
        expect(track.style.height).to.equal('30%');
        expect(track.style.bottom).to.equal('0%');
        expect(handle.style.bottom).to.equal('30%');
    })
})