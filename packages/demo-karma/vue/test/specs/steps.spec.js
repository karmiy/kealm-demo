import {createVue, destroyVM, triggerEvent} from '../utils';

describe('Steps', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /*test basic*/
    it('basic', () => {
        vm = createVue({
            template: `
                <sl-steps :current="1">
                    <sl-step title="步骤1" description="描述（可选）"></sl-step>
                    <sl-step title="步骤2" description="描述（可选）"></sl-step>
                    <sl-step title="步骤3" description="描述（可选）"></sl-step>
                    <sl-step title="步骤4" description="描述（可选）"></sl-step>
                </sl-steps>
            `
        });
        let status = ['finish', 'process', 'wait', 'wait'],
            steps = vm.$el.querySelectorAll('.salus-steps-item');
        steps.forEach((step, index) => {
            expect(step.classList.contains(`salus-steps-item-${status[index]}`)).to.be.true;
            expect(step.querySelector('.salus-steps-item-title').textContent).to.equal(`步骤${index+1}`);
            expect(step.querySelector('.salus-steps-item-description').textContent).to.equal(`描述（可选）`);
        });
        expect(vm.$el.querySelector('.salus-steps-item-finish').querySelector('.salus-steps-icon').classList.contains('salus-icon-check-o')).to.be.true;
    })

    /* test size */
    it('size', () => {
        vm = createVue({
            template: `
                <sl-steps :current="1" size="small">
                    <sl-step title="步骤1" description="描述（可选）"></sl-step>
                    <sl-step title="步骤2" description="描述（可选）"></sl-step>
                    <sl-step title="步骤3" description="描述（可选）"></sl-step>
                    <sl-step title="步骤4" description="描述（可选）"></sl-step>
                </sl-steps>
            `
        });
        expect(vm.$el.classList.contains('salus-steps-small')).to.be.true;
    })

    /* test direction */
    it('direction', () => {
        vm = createVue({
            template: `
                <sl-steps :current="1" direction="vertical">
                    <sl-step title="步骤1" description="描述（可选）"></sl-step>
                    <sl-step title="步骤2" description="描述（可选）"></sl-step>
                    <sl-step title="步骤3" description="描述（可选）"></sl-step>
                    <sl-step title="步骤4" description="描述（可选）"></sl-step>
                </sl-steps>
            `
        });
        expect(vm.$el.classList.contains('salus-steps-vertical')).to.be.true;
        destroyVM(vm);
        vm = createVue({
            template: `
                <sl-steps :current="1" direction="horizontal">
                    <sl-step title="步骤1" description="描述（可选）"></sl-step>
                    <sl-step title="步骤2" description="描述（可选）"></sl-step>
                    <sl-step title="步骤3" description="描述（可选）"></sl-step>
                    <sl-step title="步骤4" description="描述（可选）"></sl-step>
                </sl-steps>
            `
        });
        expect(vm.$el.classList.contains('salus-steps-horizontal')).to.be.true;
        expect(vm.$el.classList.contains('salus-steps-label-vertical')).to.be.true;
    });

    /* test vertical small */
    it('vertical small', () => {
        vm = createVue({
            template: `
                <sl-steps :current="1" direction="vertical" size="small">
                    <sl-step title="步骤1" description="描述（可选）"></sl-step>
                    <sl-step title="步骤2" description="描述（可选）"></sl-step>
                    <sl-step title="步骤3" description="描述（可选）"></sl-step>
                    <sl-step title="步骤4" description="描述（可选）"></sl-step>
                </sl-steps>
            `
        });
        expect(vm.$el.classList.contains('salus-steps-small')).to.be.true;
        expect(vm.$el.classList.contains('salus-steps-vertical')).to.be.true;
    })

    /* test status */
    it('status', () => {
        const status = ['wait', 'process', 'finish', 'error'][Math.random() * 4 | 0];
        vm = createVue({
            template: `
                <sl-steps :current="1" status="${status}">
                    <sl-step title="步骤1" description="描述（可选）"></sl-step>
                    <sl-step title="步骤2" description="描述（可选）"></sl-step>
                    <sl-step title="步骤3" description="描述（可选）"></sl-step>
                    <sl-step title="步骤4" description="描述（可选）"></sl-step>
                </sl-steps>
            `
        }, true)
        expect(vm.$el.querySelectorAll('.salus-steps-item')[1].classList.contains(`salus-steps-item-${status}`)).to.be.true;
    });

    /* test step switch */
    it('step switch', (done) => {
        vm = createVue({
            template: `
                <div>
                    <sl-steps :current="current">
                        <sl-step title="步骤1" description="描述（可选）"></sl-step>
                        <sl-step title="步骤2" description="描述（可选）"></sl-step>
                        <sl-step title="步骤3" description="描述（可选）"></sl-step>
                        <sl-step title="步骤4" description="描述（可选）"></sl-step>
                    </sl-steps>
                    <sl-button @click="next">next</sl-button>
                </div>
            `,
            data() {
                return {
                    current: 0
                }
            },
            methods: {
                next() {
                    this.current++;
                }
            }
        });
        expect(vm.$el.querySelector('.salus-steps-item-finish')).to.not.exist;
        triggerEvent(vm.$el.querySelector('button'), 'click');
        setTimeout(() => {
            expect(vm.$el.querySelector('.salus-steps-item').classList.contains('salus-steps-item-finish')).to.be.true;
            triggerEvent(vm.$el.querySelector('button'), 'click');
            setTimeout(() => {
                let items = vm.$el.querySelectorAll('.salus-steps-item');
                expect(items[0].classList.contains('salus-steps-item-finish')).to.be.true;
                expect(items[1].classList.contains('salus-steps-item-finish')).to.be.true;
                triggerEvent(vm.$el.querySelector('button'), 'click');
                setTimeout(() => {
                    let items = vm.$el.querySelectorAll('.salus-steps-item');
                    expect(items[0].classList.contains('salus-steps-item-finish')).to.be.true;
                    expect(items[1].classList.contains('salus-steps-item-finish')).to.be.true;
                    expect(items[2].classList.contains('salus-steps-item-finish')).to.be.true;
                    triggerEvent(vm.$el.querySelector('button'), 'click');
                    setTimeout(() => {
                        let items = vm.$el.querySelectorAll('.salus-steps-item');
                        expect(items[0].classList.contains('salus-steps-item-finish')).to.be.true;
                        expect(items[1].classList.contains('salus-steps-item-finish')).to.be.true;
                        expect(items[2].classList.contains('salus-steps-item-finish')).to.be.true;
                        expect(items[3].classList.contains('salus-steps-item-finish')).to.be.true;
                        done();
                    })
                })
            })
        })
    })
})