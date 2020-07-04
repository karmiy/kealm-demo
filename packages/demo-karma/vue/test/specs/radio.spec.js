import {createVue, destroyVM, triggerEvent} from '../utils';

describe('Radio', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', (done) => {
        vm = createVue({
            template: `
                <sl-radio value="1">普通单选框</sl-radio>
            `
        }, true);
        expect(vm.$el.textContent).to.equal('普通单选框');
        let input = vm.$el.querySelector('input');
        expect(input.type).to.equal('radio');
        expect(input.classList.contains('salus-radio-input')).to.be.true;
        expect(input.value).to.equal('1');
        triggerEvent(input, 'click');
        setTimeout(() => {
            expect(vm.$el.querySelector('.salus-radio').classList.contains('salus-radio-checked')).to.be.true;
            done();
        })
    })

    /* test defaultChecked */
    it('defaultChecked', () => {
        vm = createVue({
            template: `
                <sl-radio defaultChecked>普通单选框</sl-radio>
            `
        });
        expect(vm.$el.querySelector('.salus-radio').classList.contains('salus-radio-checked')).to.be.true;
    })

    /* test disabled */
    it('disabled', () => {
        vm = createVue({
            template: `
                <sl-radio disabled>普通单选框</sl-radio>
            `
        });
        expect(vm.$el.classList.contains('salus-radio-wrapper-disabled')).to.be.true;
        expect(vm.$el.querySelector('.salus-radio').classList.contains('salus-radio-disabled')).to.be.true;
    })

    /* test onChange */
    it('change', (done) => {
        let result;
        vm = createVue({
            template: `
                <sl-radio @change="onChange">普通单选框</sl-radio>
            `,
            methods: {
                onChange(evt) {
                    result = evt;
                }
            }
        }, true);
        triggerEvent(vm.$el.querySelector('input'), 'click');
        setTimeout(() => {
            expect(result).to.exist;
            done();
        })
    });

    /* test radio-group-horizontal */
    it('radio-group-horizontal', (done) => {
        vm = createVue({
            template: `
                <sl-radio-group v-model="radioValue">
                    <sl-radio value="A">A</sl-radio>
                    <sl-radio value="B">B</sl-radio>
                    <sl-radio value="C">C</sl-radio>
                    <sl-radio value="D">D</sl-radio>
                </sl-radio-group>
            `,
            data() {
                return {
                    radioValue: 'A'
                }
            },
        }, true)
        expect(vm.$el.classList.contains('salus-radio-group')).to.be.true;
        expect(vm.$el.querySelectorAll('.salus-radio-wrapper')[0].classList.contains('salus-radio-wrapper-checked')).to.be.true;
        expect(vm.$el.querySelectorAll('.salus-radio')[0].classList.contains('salus-radio-checked')).to.be.true;

        triggerEvent(vm.$el.querySelectorAll('input')[1], 'click');
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.salus-radio-wrapper')[1].classList.contains('salus-radio-wrapper-checked')).to.be.true;
            expect(vm.$el.querySelectorAll('.salus-radio')[1].classList.contains('salus-radio-checked')).to.be.true;
            done();
        });
    })

    /* test radio-group-vertical */
    it('radio-group-vertical', () => {
        vm = createVue({
            template: `
                <sl-radio-group v-model="radioValue" vertical>
                    <sl-radio value="A">A</sl-radio>
                    <sl-radio value="B">B</sl-radio>
                    <sl-radio value="C">C</sl-radio>
                    <sl-radio value="M">More...
                        <sl-input type="text" v-if="radioValue === 'M'" style="width: 100px; margin-left: 10px;"/>
                    </sl-radio>
                </sl-radio-group>
            `,
            data() {
                return {
                    radioValue: 'A'
                }
            },
        })
        expect(vm.$el.classList.contains('salus-radio-vertical')).to.be.true;
    })

    /* test radio-group-name */
    it('radio-group-name', () => {
        vm = createVue({
            template: `
                <sl-radio-group v-model="radioValue" name="radioGroup">
                    <sl-radio value="A">A</sl-radio>
                    <sl-radio value="B">B</sl-radio>
                    <sl-radio value="C">C</sl-radio>
                    <sl-radio value="D">D</sl-radio>
                </sl-radio-group>
            `,
            data() {
                return {
                    radioValue: 'A'
                }
            },
        })
        vm.$el.querySelectorAll('input').forEach(input => {
            expect(input.name).to.equal('radioGroup');
        })
    })

    /* test radio-group-size */
    it('radio-button-group-size', () => {
        vm = createVue({
            template: `
                <sl-radio-group v-model="radioValue" size="small">
                    <sl-radio-button value="A">单选按钮</sl-radio-button>
                    <sl-radio-button value="B">单选按钮</sl-radio-button>
                    <sl-radio-button value="C">单选按钮</sl-radio-button>
                    <sl-radio-button value="D">单选按钮</sl-radio-button>
                    <sl-radio-button value="E" disabled>单选按钮-禁用</sl-radio-button>
                </sl-radio-group>
            `,
            data() {
                return {
                    radioValue: 'A'
                }
            }
        });
        expect(vm.$el.classList.contains('salus-radio-group-small')).to.be.true;
    })

    /* test radio-button-horizontal */
    it('radio-button-horizontal', (done) => {
        vm = createVue({
            template: `
                <sl-radio-group v-model="radioValue">
                    <sl-radio-button value="A">单选按钮</sl-radio-button>
                    <sl-radio-button value="B">单选按钮</sl-radio-button>
                    <sl-radio-button value="C">单选按钮</sl-radio-button>
                    <sl-radio-button value="D">单选按钮</sl-radio-button>
                    <sl-radio-button value="E" disabled>单选按钮-禁用</sl-radio-button>
                </sl-radio-group>
            `,
            data() {
                return {
                    radioValue: 'A'
                }
            }
        }, true);
        /***button style***/
        expect(vm.$el.querySelectorAll('.salus-radio-button-wrapper').length).to.be.equal(5);
        expect(vm.$el.querySelectorAll('.salus-radio-button').length).to.be.equal(5);
        expect(vm.$el.querySelectorAll('.salus-radio-button-input').length).to.be.equal(5);
        expect(vm.$el.querySelectorAll('.salus-radio-button-inner').length).to.be.equal(5);

        /***disabled**/
        expect(vm.$el.querySelectorAll('.salus-radio-button-wrapper')[4].classList.contains('salus-radio-button-wrapper-disabled')).to.be.true;
        expect(vm.$el.querySelectorAll('.salus-radio-button')[4].classList.contains('salus-radio-button-disabled')).to.be.true;

        /***checked item***/
        expect(vm.$el.querySelectorAll('.salus-radio-button-wrapper')[0].classList.contains('salus-radio-button-wrapper-checked')).to.be.true;
        expect(vm.$el.querySelectorAll('.salus-radio-button')[0].classList.contains('salus-radio-button-checked')).to.be.true;

        /***click event***/
        triggerEvent(vm.$el.querySelectorAll('input')[1], 'click');
        setTimeout(() => {
            /***checked item changed***/
            expect(vm.$el.querySelectorAll('.salus-radio-button-wrapper')[1].classList.contains('salus-radio-button-wrapper-checked')).to.be.true;
            expect(vm.$el.querySelectorAll('.salus-radio-button')[1].classList.contains('salus-radio-button-checked')).to.be.true;
            done();
        })
    })

    /* test radio-button-vertical */
    it('radio-button-vertical', () => {
        vm = createVue({
            template: `
                <sl-radio-group v-model="radioValue" vertical>
                    <sl-radio-button value="A">单选按钮</sl-radio-button>
                    <sl-radio-button value="B">单选按钮</sl-radio-button>
                    <sl-radio-button value="C">单选按钮</sl-radio-button>
                    <sl-radio-button value="D">单选按钮</sl-radio-button>
                    <sl-radio-button value="E" disabled>单选按钮-禁用</sl-radio-button>
                </sl-radio-group>
            `,
            data() {
                return {
                    radioValue: 'A'
                }
            }
        });
        expect(vm.$el.classList.contains('salus-radio-vertical')).to.be.true;
    })

    /* test radio-button-buttonStyle */
    it('radio-button-buttonStyle', () => {
        vm = createVue({
            template: `
                <sl-radio-group vertical buttonStyle="solid">
                    <sl-radio-button value="A">单选按钮</sl-radio-button>
                    <sl-radio-button value="B">单选按钮</sl-radio-button>
                    <sl-radio-button value="C">单选按钮</sl-radio-button>
                    <sl-radio-button value="D">单选按钮</sl-radio-button>
                    <sl-radio-button value="E" disabled>单选按钮-禁用</sl-radio-button>
                </sl-radio-group>
            `
        })

        expect(vm.$el.classList.contains('salus-radio-group-solid')).to.be.true;
    })
})