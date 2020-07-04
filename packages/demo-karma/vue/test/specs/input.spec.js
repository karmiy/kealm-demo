import { createVue, destroyVM, triggerEvent } from '../utils';

describe('Input', () => {
  let vm;

  afterEach(() => {
    destroyVM(vm);
  });

  /* test basic */
  it('basic', done => {
    vm = createVue({
      template: `
          <sl-input placeholder="Basic usage" :value="value"/>
      `,
      data() {
        return {
          value: 'myInput'
        }
      }
    });
    expect(vm.$el.classList.contains('salus-input')).to.be.true;
    expect(vm.$el.getAttribute('placeholder')).to.equal('Basic usage');
    expect(vm.$el.value).to.equal('myInput');
    vm.value = 'yourInput';
    vm.$nextTick(() => {
      expect(vm.$el.value).to.equal('yourInput');
      done();
    })
  });

  /* test defaultValue */
  it('defaultValue', () => {
    vm = createVue({
      template: `
          <sl-input placeholder="Basic usage" defaultValue="myInput"/>
      `,
    });
  });

  /* test size */
  it('size', done => {
    vm = createVue({
      template: `
          <sl-input :size="size"/>
      `,
      data() {
        return {
          size: 'large',
        }
      }
    });
    expect(vm.$el.classList.contains('salus-input-lg'));
    vm.size = 'middle';
    vm.$nextTick(() => {
      expect(vm.$el.classList.contains('salus-input-md'));
      vm.size = 'small';
      vm.$nextTick(() => {
        expect(vm.$el.classList.contains('salus-input-sm'));
        done();
      })
    })
  });

  /* test addonBefore addonAfter */
  it('addonBefore addonAfter', () => {
    vm = createVue({
      template: `
          <sl-input addonBefore="Http://" addonAfter=".com" />
      `,
    });
    expect(vm.$el.querySelectorAll('.salus-input-group-addon')[0].textContent === 'Http://').to.be.true;
    expect(vm.$el.querySelectorAll('.salus-input-group-addon')[1].textContent === '.com').to.be.true;
    destroyVM(vm);
    vm = createVue({
      template: `
          <sl-input placeholder="addon">
              <i slot="addonAfter" class="salus-icon-setting-o"/>
          </sl-input>
      `,
    });
    expect(vm.$el.querySelector('.salus-input-group-addon').innerHTML).to.equal('<i class="salus-icon-setting-o"></i>');
  });

  /* test input group basic */
  it('input group basic', () => {
    vm = createVue({
      template: `
          <sl-input-group>
              <sl-input style="width: 20%" defaultValue="0571" />
              <sl-input style="width: 30%" defaultValue="26888888" />
          </sl-input-group>
      `,
    });
    expect(vm.$el.classList.contains('salus-input-group')).to.be.true;
    expect(vm.$el.classList.contains('salus-input-group-inner-container')).to.be.true;
    expect(vm.$el.querySelectorAll('input').length === 2).to.be.true;
    const [inputLeft, inputRight] = vm.$el.querySelectorAll('input');
    expect(inputLeft.value === '0571').to.be.true;
    expect(inputLeft.style.width === '20%').to.be.true;
    expect(inputRight.value === '26888888').to.be.true;
    expect(inputRight.style.width === '30%').to.be.true;
  });

  /* test input group compact */
  it('input group compact', () => {
    vm = createVue({
      template: `
          <sl-input-group compact>
              <sl-input style="width: 20%" defaultValue="0571" />
              <sl-input style="width: 30%" defaultValue="26888888" />
          </sl-input-group>
      `,
    });
    expect(vm.$el.classList.contains('salus-input-group-compact')).to.be.true;
  });

  /* test input search basic */
  it('input search basic', done => {
    const spy = sinon.spy();
    vm = createVue({
      template: `
         <sl-input-search placeholder="input search text" @search="onSearch" value="search input" />
      `,
      methods: {
        onSearch(value) {
          spy(value);
        }
      }
    });
    expect(vm.$el.classList.contains('salus-input-search')).to.be.true;
    expect(vm.$el.classList.contains('salus-input-affix-wrapper')).to.be.true;
    expect(vm.$el.querySelector('.salus-icon-search-o')).to.exist;

    vm.$el.querySelector('.salus-icon-search-o').click();
    vm.$nextTick(() => {
      expect(spy.called).to.be.true;
      expect(spy.firstCall.args[0]).to.equal('search input');
      done();
    })
  });

  /* test input search enterButton */
  it('input search enterButton', done => {
    vm = createVue({
      template: `
         <sl-input-search placeholder="input search text" :enterButton="enterButton" />
      `,
      data() {
        return {
          enterButton: true
        }
      }
    });
    const button = vm.$el.querySelector('.salus-input-suffix button');
    expect(button.classList.contains('salus-button')).to.be.true;
    expect(button.classList.contains('salus-input-search-button')).to.be.true;
    expect(button.classList.contains('salus-button-primary')).to.be.true;
    expect(button.innerHTML === `<i class="salus-icon-search-o"></i>`).to.be.true;

    vm.enterButton = 'Search';
    vm.$nextTick(() => {
      expect(button.textContent).to.equal('Search');
      done();
    })
  });

  /* test textarea autosize */
  it('textarea autosize', done => {
    vm = createVue({
      template: `
        <div>
          <sl-textarea ref="textareaBasic" placeholder="Autosize height based on content lines" autosize :defaultValue="textareaValue" />
          <sl-textarea ref="textareaLimit" placeholder="Autosize height with minimum and maximum number of lines" :autosize="autosize" :defaultValue="textareaValue" />
        </div>
      `,
      data() {
        return {
          autosize: { minRows: 2, maxRows: 6 },
          textareaValue: 'sda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasd',
        }
      },
    }, true);
    const {textareaBasic, textareaLimit} = vm.$refs;
    setTimeout(() => {
      expect(textareaBasic.$el.offsetHeight).to.equal(169);
      expect(textareaLimit.$el.offsetHeight).to.equal(115);
      textareaBasic.$el.value = textareaLimit.$el.value = '';
      // 要触发input事件才能收缩
      triggerEvent(textareaBasic.$el, 'input');
      triggerEvent(textareaLimit.$el, 'input');
      vm.$nextTick(() => {
        expect(textareaBasic.$el.offsetHeight).to.equal(80);
        expect(textareaLimit.$el.offsetHeight).to.equal(43);
        done();
      })
    }, 200);
  });

  /* test input group limitCount */
  it('input group limitCount', done => {
    vm = createVue({
      template: `
        <div>
          <sl-input ref="inputLimit" :maxLength="10" :defaultValue="text" />
          <sl-textarea ref="textareaLimit" :maxLength="10" :defaultValue="text" />
        </div>
      `,
      data() {
        return {
          text: '1234567890abcde',
        }
      }
    });
    const {inputLimit, textareaLimit} = vm.$refs,
          input = inputLimit.$el.querySelector('input'),
          textarea = textareaLimit.$el.querySelector('textarea');
    setTimeout(() => {
      expect(textarea.getAttribute('maxlength')).to.equal('10');
      expect(input.getAttribute('maxlength')).to.equal('10');
      expect(textarea.value.length).to.equal(10);
      expect(input.value.length).to.equal(10);
      done();
    }, 200);
  });

  /* test prefix suffix */
  it('prefix suffix', () => {
    vm = createVue({
      template: `
        <sl-input>
            <i class="salus-icon-account-o" slot="prefix"></i>
            <i class="salus-icon-search-o" slot="suffix"></i>
        </sl-input>
      `,
    });
    expect(vm.$el.querySelector('.salus-input-prefix').innerHTML === `<i class="salus-icon-account-o"></i>`).to.be.true;
    expect(vm.$el.querySelector('.salus-input-suffix').innerHTML === `<i class="salus-icon-search-o"></i>`).to.be.true;
  });

})
