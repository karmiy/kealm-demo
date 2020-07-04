import {createVue, destroyVM, triggerEvent} from '../utils';

describe('test Tabs', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /* test is valid */
    it('valid', done => {
        let result;
        vm = createVue({
            template: `
                <sl-tabset @change="handleChange">
                    <sl-tab title="Tab 1" key="1">Content of Tab Pane 1</sl-tab>
                    <sl-tab title="Tab 2" key="2">Content of Tab Pane 2</sl-tab>
                    <sl-tab title="Tab 3" key="3">Content of Tab Pane 3</sl-tab>
                </sl-tabset>
            `,
            methods: {
                handleChange(evt) {
                    result = evt;
                }
            }
        });

        expect(vm.$el.querySelectorAll('.salus-tabs-tab').item(0).classList.contains('salus-tabs-tab-active')).to.be.true;
        expect(vm.$el.querySelectorAll('.salus-tabs-tabpane').item(0).classList.contains('salus-tabs-tabpane-active')).to.be.true;
        triggerEvent(vm.$el.querySelectorAll('.salus-tabs-tab')[1], 'click')
        setTimeout(_ => {
            expect(vm.$el.querySelectorAll('.salus-tabs-tab').item(1).classList.contains('salus-tabs-tab-active')).to.be.true;
            expect(vm.$el.querySelectorAll('.salus-tabs-tabpane').item(1).classList.contains('salus-tabs-tabpane-active')).to.be.true;
            expect(result).to.exist;

            done();
        }, 20)
    });

    /* test disabled */
    it('disabled', () => {
        vm = createVue({
            template: `
                <sl-tabset defaultActiveKey="1">
                    <sl-tab title="Tab 1" key="1">Content of Tab Pane 1</sl-tab>
                    <sl-tab title="Tab 2" key="2" disabled>Content of Tab Pane 2</sl-tab>
                    <sl-tab title="Tab 3" key="3">Content of Tab Pane 3</sl-tab>
                </sl-tabset>
            `
        });
        expect(vm.$el.querySelectorAll('.salus-tabs-tab').item(1).classList.contains('salus-tabs-tab-disabled')).to.be.true;
    });

    /* test tabPosition */
    it('tabPosition', () => {
        const posArr = ['top', 'bottom', 'right', 'left'];
        let tabsStr = posArr.map(pos =>
            `<sl-tabset tabPosition="${pos}">
                <sl-tab title="Tab 1" key="1">Content of Tab Pane 1</sl-tab>
                <sl-tab title="Tab 2" key="2" disabled>Content of Tab Pane 2</sl-tab>
                <sl-tab title="Tab 3" key="3">Content of Tab Pane 3</sl-tab>
            </sl-tabset>`
        ).join('');
        vm = createVue({
            template: `
                <div>
                    ${tabsStr}
                </div>
            `
        });

        let tabs = vm.$el.querySelectorAll('.salus-tabs');
        [0, 1, 2, 3].forEach(index => {
            expect(tabs.item(index).classList.contains(`salus-tabs-${posArr[index]}`)).to.be.true;
            expect(tabs.item(index).querySelector('.salus-tabs-bar').classList.contains(`salus-tabs-${posArr[index]}-bar`)).to.be.true;
        })
    });

    /* test card */
    it('card', () => {
        vm = createVue({
            template: `
                <sl-tabset type="card">
                    <sl-tab title="Tab 1" key="1">Content of Tab Pane 1</sl-tab>
                    <sl-tab title="Tab 2" key="2">Content of Tab Pane 2</sl-tab>
                    <sl-tab title="Tab 3" key="3">Content of Tab Pane 3</sl-tab>
                </sl-tabset>
            `
        });
        expect(vm.$el.classList.contains('salus-tabs-card')).to.be.true;
        expect(vm.$el.querySelector('.salus-tabs-bar').classList.contains('salus-tabs-card-bar')).to.be.true;
        expect(vm.$el.querySelector('.salus-tabs-content').classList.contains('salus-tabs-card-content')).to.be.true;
    });

    /* test tab icon */
    it('tab icon', () => {
        vm = createVue({
            template: `
                <sl-tabset>
                    <sl-tab key="1">
                        <span slot="title">
                            <i class="salus-icon-global-resource"/>Tab 1
                        </span>
                        Tab 1
                    </sl-tab>
                    <sl-tab key="2">
                        <span slot="title">
                            <i class="salus-icon-container-service"/>Tab 2
                        </span>
                        Tab 2
                    </sl-tab>
                </sl-tabset>
            `
        });
        [0, 1].forEach(index => {
            expect(vm.$el.querySelectorAll('.salus-tabs-tab').item(index).querySelector('i')).to.exist;
        })
    });

    /* test scroll */
    it('scroll', done => {
        const TabPanes = Array(17).fill('').map((tab, index) =>
            `<sl-tab title="${index + 1}" key="${index}">Content of ${index + 1}</sl-tab>`
        ).join('');

        let nextRes, prevRes;

        createVue({
            template: `
                <sl-tabset @prevClick="handlePrevClick" @nextClick="handleNextClick" >
                    ${TabPanes}
                </sl-tabset>
            `,
            methods: {
                handlePrevClick(evt) {
                    prevRes = evt;
                },
                handleNextClick(evt) {
                    nextRes = evt;
                }
            }
        }, true);

        setTimeout(() => {
            expect(document.querySelector('.salus-tabs-nav-container').classList.contains('salus-tabs-nav-container-scrolling')).to.be.true;
            let nav = document.querySelector('.salus-tabs-nav');
            // 点右侧按钮
            document.querySelector('.salus-tabs-tab-next').click();
            setTimeout(() => {
                let transform = getComputedStyle(nav, null).transform,
                    translateX = transform.substring(7, transform.length - 1).split(',')[4];
                expect(translateX < 0).to.be.true;
                expect(nextRes).to.exist;
                setTimeout(() => {
                    // 点左侧按钮
                    document.querySelector('.salus-tabs-tab-prev').click();
                    setTimeout(() => {
                        transform = getComputedStyle(nav, null).transform;
                        translateX = transform.substring(7, transform.length - 1).split(',')[4];
                        expect(translateX == 0).to.be.true;
                        expect(prevRes).to.exist;
                        done();
                    }, 500)
                }, 1000);
            }, 500)
        }, 1000);
    });
})
