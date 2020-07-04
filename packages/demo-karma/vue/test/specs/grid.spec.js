import {createVue, destroyVM} from "../utils";

describe('test Grid', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /* test basic grid */
    it('basic', () => {
        let span = [12, 8, 6][Math.random() * 3 | 0];
        let cols = Array(24 / span).fill(1).map((item, index) =>
            `<sl-col key="${index}" span="${span}">col</sl-col>`
        );

        vm = createVue({
            template: `
                <sl-row>
                    ${cols}
                </sl-row>
            `
        });

        expect(vm.$el.classList.contains('salus-row')).to.be.true;
        expect(vm.$el.querySelector(`.salus-col-${span}`)).to.exist;
    });


    /* test gutter */
    it('gutter', () => {
        let power = Math.random() * 20 | 0 + 1, gutter = power * 2;
        vm = createVue({
            template: `
                <sl-row :gutter="${gutter}">
                    <sl-col :span="6">
                        <div class="salue-panel">col-6</div>
                    </sl-col>
                    <sl-col :span="6">
                        <div class="salue-panel">col-6</div>
                    </sl-col>
                    <sl-col :span="6">
                        <div class="salue-panel">col-6</div>
                    </sl-col>
                    <sl-col :span="6">
                        <div class="salue-panel">col-6</div>
                    </sl-col>
                </sl-row>
            `
        });

        expect(parseFloat(vm.$el.style.marginLeft)).to.equal(-power);
        expect(parseFloat(vm.$el.style.marginRight)).to.equal(-power);
        vm.$el.querySelectorAll('.salus-col-6').forEach(col => {
            expect(parseFloat(col.style.paddingLeft)).to.equal(power);
            expect(parseFloat(col.style.paddingRight)).to.equal(power);
        })
    });

    /* test flex justify */
    it('flex justify', () => {
        let justify = ['start', 'center', 'end', 'space-between', 'space-around'][Math.random() * 5 | 0];
        vm = createVue({
            template: `
                <sl-row type='flex' justify="${justify}">
                    <sl-col :span="4">
                        <div class="salue-panel">col-4</div>
                    </sl-col>
                    <sl-col :span="4">
                        <div class="salue-panel">col-4</div>
                    </sl-col>
                    <sl-col :span="4">
                        <div class="salue-panel">col-4</div>
                    </sl-col>
                    <sl-col :span="4">
                        <div class="salue-panel">col-4</div>
                    </sl-col>
                </sl-row>
            `
        });
        expect(vm.$el.classList.contains('salus-row-flex')).to.be.true;
        expect(vm.$el.classList.contains(`salus-row-flex-${justify}`)).to.be.true;
    });

    /* test flex align */
    it('flex align', () => {
        const align = ['top', 'middle', 'bottom'][Math.random() * 3 | 0];
        vm = createVue({
            template: `
                <sl-row type='flex' justify="center" align="${align}">
                    <sl-col :span="4">
                        <div class="salue-panel" style="height: 100px;">col-4</div>
                    </sl-col>
                    <sl-col :span="4">
                        <div class="salue-panel" style="height: 50px;">col-4</div>
                    </sl-col>
                    <sl-col :span="4">
                        <div class="salue-panel" style="height: 120px;">col-4</div>
                    </sl-col>
                    <sl-col :span="4">
                        <div class="salue-panel" style="height: 80px;">col-4</div>
                    </sl-col>
                </sl-row>
            `
        });
        expect(vm.$el.classList.contains('salus-row-flex')).to.be.true;
        expect(vm.$el.classList.contains(`salus-row-flex-${align}`)).to.be.true;
    });

    /* test flex order */
    it('flex order', () => {
        vm = createVue({
            template: `
                <sl-row type='flex'>
                    <sl-col :span="6" :order="4">
                        <div class="salue-panel">1 col-order-4</div>
                    </sl-col>
                    <sl-col :span="6" :order="3">
                        <div class="salue-panel">2 col-order-3</div>
                    </sl-col>
                    <sl-col :span="6" :order="2">
                        <div class="salue-panel">3 col-order-2</div>
                    </sl-col>
                    <sl-col :span="6" :order="1">
                        <div class="salue-panel">4 col-order-1</div>
                    </sl-col>
                </sl-row>
            `
        });

        let cols = vm.$el.querySelectorAll('.salus-col-6');
        expect(cols.item(0).classList.contains('salus-col-order-4')).to.be.true;
        expect(cols.item(1).classList.contains('salus-col-order-3')).to.be.true;
        expect(cols.item(2).classList.contains('salus-col-order-2')).to.be.true;
        expect(cols.item(3).classList.contains('salus-col-order-1')).to.be.true;
    });

    /* test media */
    it('media', () => {
        let medias = [
            {xs: 2, sm: 4, md: 6, lg: 8, xl: 10},
            {xs: 20, sm: 16, md: 12, lg: 8, xl: 4},
            {xs: 2, sm: 4, md: 6, lg: 8, xl: 10},
        ];
        let cols = medias.map((item, index) => (
            `<sl-col key="${index}" :xs="${item.xs}" :sm="${item.sm}" :md="${item.md}" :lg="${item.lg}" :xl="${item.xl}">
                <div class="salus-panel">Col</div>
            </sl-col>`
        ))
        vm = createVue({
            template: `
                <sl-row>
                    ${cols}
                </sl-row>
            `
        });
        Array.from(vm.$el.children).forEach((col, index) => {
            expect(col.classList.contains(`salus-col-xs-${medias[index].xs}`)).to.be.true;
            expect(col.classList.contains(`salus-col-sm-${medias[index].sm}`)).to.be.true;
            expect(col.classList.contains(`salus-col-md-${medias[index].md}`)).to.be.true;
            expect(col.classList.contains(`salus-col-lg-${medias[index].lg}`)).to.be.true;
            expect(col.classList.contains(`salus-col-xl-${medias[index].xl}`)).to.be.true;
        });
    });
});