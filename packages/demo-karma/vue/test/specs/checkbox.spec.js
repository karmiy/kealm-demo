import {createVue, destroyVM, triggerEvent} from '../utils';
import * as sinon from "sinon";
import Checkbox from 'components/checkbox/public_api';
import Vue from 'vue';

describe('Checkbox', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', (done) => {
        vm = createVue({
            template: `
                <sl-checkbox>普通复选框</sl-checkbox>
            `
        }, true);
        expect(vm.$el.textContent).to.equal('普通复选框');
        let input = vm.$el.querySelector('input');
        expect(input.type).to.equal('checkbox');
        expect(input.classList.contains('salus-checkbox-input')).to.be.true;
        // input.click();
        triggerEvent(input, 'click');
        setTimeout(() => {
            expect(vm.$el.classList.contains('salus-checkbox-wrapper-checked')).to.be.true;
            expect(vm.$el.querySelector('.salus-checkbox').classList.contains('salus-checkbox-checked')).to.be.true;
            done();
        });
    });

    /* test defaultChecked */
    it('defaultChecked', () => {
        vm = createVue({
            template: `
                <sl-checkbox defaultChecked>普通复选框</sl-checkbox>
            `
        });
        expect(vm.$el.classList.contains('salus-checkbox-wrapper-checked')).to.be.true;
        expect(vm.$el.querySelector('.salus-checkbox').classList.contains('salus-checkbox-checked')).to.be.true;
    })

    /* test disabled */
    it('disabled', () => {
        vm = createVue({
            template: `
                <div>
                    <sl-checkbox disabled>禁用复选框(未选中)</sl-checkbox>
                    <sl-checkbox disabled defaultChecked>禁用复选框(选中)</sl-checkbox>
                </div>
            `
        });
        Array.from(vm.$el.querySelectorAll('.salus-checkbox-wrapper')).forEach(
            wrapper => {
                expect(wrapper.classList.contains('salus-checkbox-wrapper-disabled')).to.be.true;
                expect(wrapper.querySelector('.salus-checkbox').classList.contains('salus-checkbox-disabled')).to.be.true;
            }
        )
    })

    /* test onChange */
    it('onChange', (done) => {
        const spy = sinon.spy();
        // vm = createVue({
        //     template: `
        //         <sl-checkbox @change="${spy}">普通复选框</sl-checkbox>
        //     `
        // }, true);
        let app = document.createElement('div');
        document.body.appendChild(app);
        vm = new Vue({
            render() {
                return (
                    <Checkbox onChange={spy}>普通复选框</Checkbox>
                )
            }
        }).$mount(app);
        triggerEvent(vm.$el.querySelector('input'), 'click');
        setTimeout(() => {
            expect(spy.called).to.be.true;
            done();
        });
    });

    /* test checkAll */
    it('checkAll', (done) => {
        vm = createVue({
            template: `
                <div>
                    <sl-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">Check all</sl-checkbox>
                    <sl-checkbox-group :options="plainOptions" v-model="checkedList" @change="updateSingleChecked" />
                </div>           
            `,
            data() {
                return {
                    plainOptions: ['Apple', 'Pear', 'Orange'],
                    indeterminate: true,
                    checkAll: false,
                    checkedList: ['Apple', 'Orange']
                }
            },
            methods: {
                onCheckAllChange(e) {
                    Object.assign(this, {
                        checkedList: e.target.checked ? this.plainOptions : [],
                        indeterminate: false,
                        checkAll: e.target.checked,
                    })
                },
                updateSingleChecked(checkedList) {
                    this.indeterminate = !!checkedList.length && (checkedList.length < this.plainOptions.length)
                    this.checkAll = checkedList.length === this.plainOptions.length
                }
            }
        }, true);
        let checkAll = vm.$el.querySelector('.salus-checkbox');
        expect(checkAll.classList.contains('salus-checkbox-indeterminate')).to.be.true;

        /*checkbox组中1,3项被选中*/
        let groupItems = vm.$el.querySelector('.salus-checkbox-group').querySelectorAll('.salus-checkbox-wrapper');
        expect(groupItems[0].classList.contains('salus-checkbox-wrapper-checked')).to.be.true;
        expect(groupItems[0].querySelector('.salus-checkbox').classList.contains('salus-checkbox-checked')).to.be.true;
        expect(groupItems[1].classList.contains('salus-checkbox-wrapper-checked')).to.be.false;
        expect(groupItems[1].querySelector('.salus-checkbox').classList.contains('salus-checkbox-checked')).to.be.false;
        expect(groupItems[2].classList.contains('salus-checkbox-wrapper-checked')).to.be.true;
        expect(groupItems[2].querySelector('.salus-checkbox').classList.contains('salus-checkbox-checked')).to.be.true;
        triggerEvent(vm.$el.querySelector('input'), 'click');
        setTimeout(() => {
            expect(vm.$el.querySelector('.salus-checkbox-wrapper').classList.contains('salus-checkbox-wrapper-checked')).to.be.true;
            expect(vm.$el.querySelector('.salus-checkbox').classList.contains('salus-checkbox-checked')).to.be.true;

            groupItems = vm.$el.querySelector('.salus-checkbox-group').querySelectorAll('.salus-checkbox-wrapper');
            groupItems.forEach(item => {
                expect(item.classList.contains('salus-checkbox-wrapper-checked')).to.be.true;
                expect(item.querySelector('.salus-checkbox').classList.contains('salus-checkbox-checked')).to.be.true;
            })
            done();
        });
    });

    /* test checkbox grid */
    it('checkbox grid', () => {
        let values = ['A', 'B', 'C', 'D', 'E'];
        let cols = values.map((value, index) =>
            `<sl-col :span="8" key="${index}"><sl-checkbox value="${value}">${value}</sl-checkbox></sl-col>`
        ).join('');
        vm = createVue({
            template: `
                <sl-checkbox-group>
                    <sl-row>
                        ${cols}
                    </sl-row>
                </sl-checkbox-group>
            `
        });
        expect(vm.$el.querySelector('.salus-row')).to.be.exist;
        let cols1 = vm.$el.querySelectorAll('.salus-col-8');
        expect(cols1.length).to.be.equal(5);
        cols1.forEach((col, index) => {
            let checkbox = col.querySelector('.salus-checkbox-wrapper');
            expect(checkbox).to.be.exist;
            expect(checkbox.querySelector('input').value).to.equal(values[index]);
        });
    });

    /* test checkbox button */
    it('checkbox button', () => {
        vm = createVue({
            template: `
                    <sl-checkbox displayButton defaultChecked disabled>普通复选框</sl-checkbox>
                `
        });
        console.log(vm.$el);
        expect(vm.$el.classList.contains('salus-checkbox-button-wrapper')).to.be.true;
        expect(vm.$el.classList.contains('salus-checkbox-button-wrapper-checked')).to.be.true;
        expect(vm.$el.classList.contains('salus-checkbox-button-wrapper-disabled')).to.be.true;
    })
});