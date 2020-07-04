import { createTest, createVue, destroyVM } from '../utils';
import Button from 'components/button/public_api'; 

describe('Button', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('type', () => {
        ['default', 'primary', 'dashed', 'link', 'success', 'danger'].forEach(type => {
            vm = createTest(Button, {
                type
            }, true);
            expect(vm.$el.classList.contains(`salus-button-${type}`)).to.be.true;
        })
    })
    
    it('disabled', () => {
        vm = createTest(Button, {
            disabled: true
        })
        // expect(vm.$el.attributes.getNamedItem('disabled')).to.be.true;
    })

    it('size', () => {
        ['default', 'small', 'middle'].forEach(size => {
            vm = createTest(Button, {
                size
            }, true);
            expect(vm.$el.classList.contains(`salus-button-${size}`)).to.be.true;
        })
    })

    it('full', () => {
        vm = createTest(Button, {
            full: true
        })
        expect(vm.$el.classList.contains(`salus-button-full`)).to.be.true;
    })

    it('shape', () => {
        ['circle', 'default'].forEach(shape => {
            vm = createTest(Button, {
                shape
            }, true);
            expect(vm.$el.classList.contains(`salus-button-${shape}`)).to.be.true;
        })
    })

    it('icon with text', () => {
        vm = createTest(Button, {
            icon: true
        })
        expect(vm.$el.classList.contains(`salus-button-icon1`)).to.be.true;
    })
    
    /*it('icon only', () => {
        vm = createTest(Button, {
            iconOnly: true
        })
        expect(vm.$el.classList.contains(`salus-button-icon`)).to.be.true;
    })*/
    
    it('loading', () => {
        vm = createTest(Button, {
            loading: true
        })
        expect(vm.$el.classList.contains(`salus-button-loading`)).to.be.true;
    })
    
    it('button group', () => {
        vm = createTest(Button.Group, {
            gap: true
        })
        expect(vm.$el.classList.contains(`salus-button-group`)).to.be.true;
    })

    it('button group size', () => {
        ['default', 'small', 'middle'].forEach(size => {
            vm = createTest(Button.Group, {
                size
            }, true);
            expect(vm.$el.classList.contains(`salus-button-group-${size}`)).to.be.true;
        })
    })

    it('button group gap', () => {
        vm = createTest(Button.Group, {
            gap: true
        })
        expect(vm.$el.classList.contains(`salus-button-group-gap`)).to.be.true;
    })

    it('click', done => {
        let result;
        vm = createVue({
          template: `
            <sl-button @click="handleClick"></sl-button>
          `,
          methods: {
            handleClick(evt) {
              result = evt;
            }
          }
        }, true);
        vm.$el.click();
    
        setTimeout(_ => {
          expect(result).to.exist;
          done();
        }, 20);
    });
})
