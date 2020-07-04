import {createVue, destroyVM} from "../utils";

describe('test Card', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    /* test title */
    it('title', () => {
        vm = createVue({
            template: `
                <sl-card title="Card Title">
                    <a href="#" slot="extra">more</a>
                        <p>card content</p>
                        <p>card content</p>
                        <p>card content</p>
                </sl-card>
            `
        });
        expect(vm.$el.querySelector('.salus-card-head-title').innerHTML).to.equal('Card Title');
    });

    /* test style */
    it('style', () => {
        vm = createVue({
            template: `
                <sl-card title="Card Title" style="width: 300px">
                    <p>card content</p>
                    <p>card content</p>
                    <p>card content</p>
                </sl-card>
            `
        });
        expect(vm.$el.style.width).to.equal('300px');
    });

    /* test extra */
    it('extra', () => {
        vm = createVue({
            template: `
                <sl-card title="Card Title">
                    <a href="#" slot="extra">more</a>
                    <p>card content</p>
                    <p>card content</p>
                    <p>card content</p>
                </sl-card>
            `
        });
        expect(vm.$el.querySelector('.salus-card-extra')).to.be.exist;
    })

    /* test bordered */
    it('bordered', () => {
        vm = createVue({
            template: `
                <sl-card title="Card Title">
                    <a href="#" slot="extra">more</a>
                    <p>card content</p>
                    <p>card content</p>
                    <p>card content</p>
                </sl-card>
            `
        });
        expect(vm.$el.classList.contains('salus-card-bordered')).to.be.true;
    })

    /* test img */
    it('img', () => {
        vm = createVue({
            template: `
                <sl-card>
                    <img alt="example" src="#" slot="cover"/>
                    <sl-card-meta timeInfo="2018-08-08 18:00:00">
                        <template slot="description">description</template>
                        <a href="#" slot="metaExtra">more</a>
                    </sl-card-meta> 
                </sl-card>
            `
        });
        expect(vm.$el.querySelector('.salus-card-cover')).to.exist;
        expect(vm.$el.querySelector('.salus-card-cover').querySelector('img')).to.exist;
    });

    /* test meta */
    it('meta', () => {
        vm = createVue({
            template: `
                <sl-card>
                    <img alt="example" src="#" slot="cover"/>
                    <sl-card-meta timeInfo="2018-08-08 18:00:00">
                        <template slot="description">description</template>
                        <a href="#" slot="metaExtra">more</a>
                    </sl-card-meta> 
                </sl-card>
            `
        });
        const detail = vm.$el.querySelector('.salus-card-meta')
            .querySelector('.salus-card-meta-detail');
        expect(detail.querySelector('.salus-card-meta-description')).to.exist;
        expect(detail.querySelector('.salus-card-meta-description').innerHTML).to.equal('description');
        expect(detail.querySelector('.salus-card-meta-time-info')).to.exist;
        expect(detail.querySelector('.salus-card-meta-time-info').innerHTML).to.equal('2018-08-08 18:00:00');
        expect(detail.querySelector('.salus-card-extra')).to.exist;
    });

    /* test shadow */
    it('shadow', () => {
        vm = createVue({
            template: `
                <sl-card defaultShadow>
                    <p>card content</p>
                    <p>card content</p>
                    <p>card content</p>
                </sl-card>
            `
        });
        expect(vm.$el.classList.contains('salus-card-shadow')).to.be.true;
    });

    /* test hoverable */
    it('hoverable', () => {
        vm = createVue({
            template: `
                <sl-card hoverable>
                    <p>card content</p>
                    <p>card content</p>
                    <p>card content</p>
                </sl-card>
            `
        });
        expect(vm.$el.classList.contains('salus-card-hoverable')).to.be.true;
    });
})