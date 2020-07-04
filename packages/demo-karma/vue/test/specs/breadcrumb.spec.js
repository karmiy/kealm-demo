import {createTest, destroyVM} from '../utils';
import Vue from 'vue';
import Router from 'vue-router'
Vue.use(Router);
describe('Breadcrumb', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /* test create */
    it('create', () => {
        vm = createTest({
            template: `
                <sl-breadcrumb>
                <sl-breadcrumb-item>一级页面</sl-breadcrumb-item>
                <sl-breadcrumb-item>二级页面</sl-breadcrumb-item>
                <sl-breadcrumb-item>三级页面</sl-breadcrumb-item>
            </sl-breadcrumb>
           `
        });
        expect(vm.$el.classList.contains('salus-breadcrumb')).to.be.true;
        let items = vm.$el.querySelectorAll('.salus-breadcrumb-link');
        expect(items[0].textContent).to.equal('一级页面');
        expect(items[1].textContent).to.equal('二级页面');
        expect(items[2].textContent).to.equal('三级页面');
        expect(vm.$el.querySelectorAll('.salus-breadcrumb-separator')[0].textContent).to.equal('/');
    });

    /* test separator */
    it('separator', () => {
        vm = createTest({
            template: `
                <sl-breadcrumb separator=">">
                    <sl-breadcrumb-item>一级页面</sl-breadcrumb-item>
                    <sl-breadcrumb-item>二级页面</sl-breadcrumb-item>
                    <sl-breadcrumb-item>三级页面</sl-breadcrumb-item>
                </sl-breadcrumb>
            `
        });
        expect(vm.$el.querySelectorAll('.salus-breadcrumb-separator')[0].textContent).to.equal('>');
    });

    /* test routerLink */
    it('routerLink', () => {
        vm = createTest({
            template: `
                <sl-breadcrumb>
                    <sl-breadcrumb-item><router-link to="component/breadcrumb">一级页面</router-link></sl-breadcrumb-item>
                    <sl-breadcrumb-item><router-link to="component/breadcrumb">二级页面</router-link></sl-breadcrumb-item>
                </sl-breadcrumb>
            `,
            router: new Router({linkActiveClass: 'active'})
        });
        expect(vm.$el.querySelectorAll('.salus-breadcrumb-link')[0].innerHTML).to.equal('<a href="#/component/breadcrumb" class="">一级页面</a>');
    });
});