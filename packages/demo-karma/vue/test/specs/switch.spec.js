import { createVue, destroyVM } from '../utils';

describe('Switch', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', done => {
        vm = createVue({
            template: `
                <sl-switch defaultChecked />
            `,
        });
        const button  = vm.$el;
        expect(button.getAttribute('aria-checked')).to.equal('true');
        expect(button.classList.contains('salus-switch-checked')).to.be.true;

        // 点击切换
        button.click();
        vm.$nextTick(() => {
            expect(button.classList.contains('salus-switch-checked')).to.be.false;
            done();
        })
    })

    /*test onChange*/
    it('onChange', done => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-switch defaultChecked @change="change" />
            `,
            methods: {
                change(checked) {
                    spy(checked);
                }
            }
        });
        // 点击后是否触发change
        const button  = vm.$el;
        button.click();
        vm.$nextTick(() => {
            expect(spy.args[0][0]).to.be.false;
            done();
        })
    })

    /*test onClick*/
    it('onClick', done => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                <sl-switch defaultChecked @click="click" />
            `,
            methods: {
                click() {
                    spy();
                }
            }
        });
        // 点击后是否触发click
        const button  = vm.$el;
        button.click();
        vm.$nextTick(() => {
            expect(spy.called).to.be.true;
            done();
        })
    })

    /*test disabled*/
    it('disabled', done => {
        vm = createVue({
            template: `
                <sl-switch defaultChecked disabled />
            `,
        });
        // 对应class是否存在
        const button  = vm.$el;
        expect(button.classList.contains('salus-switch-disabled')).to.be.true;
        expect(button.classList.contains('salus-switch-checked')).to.be.true;

        button.click();
        vm.$nextTick(() => {
            expect(button.classList.contains('salus-switch-checked')).to.be.true;
            done();
        })
    })

    /*test checkedChildren*/
    it('checkedChildren', done => {
        vm = createVue({
            template: `
                <div>
                    <sl-switch v-if="!isSlot" defaultChecked checkedChildren="开" unCheckedChildren="关" />
                    <sl-switch v-else defaultChecked >
                        <i class="salus-icon-check-o" slot="checkedChildren" />
                        <i class="salus-icon-pop-close-o" slot="unCheckedChildren" />
                    </sl-switch>
                </div>
            `,
            data() {
              return {
                  isSlot: false,
              }
            },
        });
        // 对应内容是否存在
        const switchInner = vm.$el.querySelector('.salus-switch-inner');
        expect(switchInner.innerText).to.equal('开');
        const button  = vm.$el.querySelector('button');
        button.click();
        vm.$nextTick(() => {
            expect(switchInner.innerText).to.equal('关');
            vm.isSlot = true;
            vm.$nextTick(() => {
                expect(switchInner.innerHTML).to.equal('<i class="salus-icon-pop-close-o"></i>');
                button.click();
                vm.$nextTick(() => {
                    expect(switchInner.innerHTML).to.equal('<i class="salus-icon-check-o"></i>');
                    done();
                })
            })
        })
    })

    /*test size*/
    it('size', () => {
        vm = createVue({
            template: `
                <sl-switch defaultChecked :size="size" />
            `,
            data() {
                return {
                    size: 'small',
                }
            },
        });
        // 对应class是否存在
        const button  = vm.$el;
        expect(button.classList.contains('salus-switch-small')).to.be.true;
    })

    /*test loading*/
    it('loading', () => {
        vm = createVue({
            template: `
                <sl-switch defaultChecked loading />
            `,
        });
        // 对应class是否存在
        const button  = vm.$el;
        expect(button.classList.contains('salus-switch-loading')).to.be.true;
    })
})