import { createVue, destroyVM } from '../utils';

describe('Pagination', () => {
  let vm;

  afterEach(() => {
    destroyVM(vm);
  });

  /* test create */
  it('create', done => {
    const spy = sinon.spy();
    vm = createVue({
      template: `
          <sl-pagination v-model="current" :total="150" @change="onChange"></sl-pagination>
      `,
      data() {
        return {
          current: 1
        }
      },
      methods: {
        onChange() {
          spy();
        }
      },
    });
    expect(vm.$el.querySelector('.salus-pagination-prev')).to.exist;
    expect(vm.$el.querySelector('.salus-pagination-next')).to.exist;
    expect(vm.$el.querySelector('.salus-pagination-jump-next')).to.exist;
    expect(vm.$el.querySelector('.salus-pagination-prev').classList.contains('salus-pagination-disabled')).to.be.true;
    expect(vm.$el.querySelector('.salus-pagination-item').classList.contains('salus-pagination-item-active')).to.be.true;
    vm.$el.querySelectorAll('.salus-pagination-item')[4].click();
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.salus-pagination-jump-prev')).to.exist;
      expect(vm.$el.querySelectorAll('.salus-pagination-item')[3].classList.contains('salus-pagination-item-active')).to.be.true; //出现prev的...后，页码2被隐藏
      expect(vm.$el.querySelector('.salus-pagination-prev').classList.contains('salus-pagination-disabled')).to.be.false;
      expect(spy.called).to.be.true;
      done()
    });
  });

  /* test showQuickJumper */
  it('showQuickJumper', done => {
    vm = createVue({
      template: `
           <sl-pagination showQuickJumper :total="500" />
      `,
      mounted() {
        // 找到options的Vue实例层
        this.optionsWrapper = [...this.$children[0].$children[0].$children[0].$children].slice(-1)[0];
      }
    });
    expect(vm.$el.querySelector('.salus-pagination-options-quick-jumper')).to.exist;
    expect(vm.$el.querySelector('.salus-pagination-item').classList.contains('salus-pagination-item-active')).to.be.true;

    const changeValue = (value) => {
      vm.optionsWrapper.handleChange({target: {value}});
      vm.optionsWrapper.go({
        keyCode: 13,
        type: 'click',
      })
    }
    changeValue(2);
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('.salus-pagination-item')[1].classList.contains('salus-pagination-item-active')).to.be.true;
      done();
    })
  });

  /* test showTotal */
  it('showTotal', done => {
    vm = createVue({
      template: `
           <sl-pagination :total="150" :defaultCurrent="1" :showTotal="showTotal"/>
      `,
      methods: {
        showTotal(total, range) {
          return `当前${range[0]}-${range[1]}条，共${total}条`;
        }
      }
    });
    expect(vm.$el.querySelector('.salus-pagination-total-text')).to.exist;
    expect(vm.$el.querySelector('.salus-pagination-total-text').textContent).to.equal('当前1-10条，共150条');
    vm.$el.querySelectorAll('.salus-pagination-item')[1].click();
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.salus-pagination-total-text').textContent).to.equal('当前11-20条，共150条');
      done()
    });
  });

  /* test simple */
  it('simple', done => {
    vm = createVue({
      template: `
            <sl-pagination simple :defaultCurrent="2" :total="150" />
      `,
    });
    expect(vm.$el.classList.contains('.salus-pagination-simple')).to.exist;
    expect(vm.$el.querySelector('.salus-pagination-simple-pager')).to.exist;

    vm.$el.querySelector('.salus-pagination-prev').click();
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('input').value).to.equal('1');
      vm.$el.querySelector('.salus-pagination-next').click();
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('input').value).to.equal('2');
        done();
      })
    })
  });

  /* test quickClick */
  it('quickClick', done => {
    vm = createVue({
      template: `
            <sl-pagination :defaultCurrent="1" :total="1500" />
      `,
    });
    for(let i = 1; i< 150; i++) {
      vm.$el.querySelector('.salus-pagination-next').click();
    }
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.salus-pagination-item-active').textContent).to.equal('150');
      done()
    })
  });

  /* test pageSize */
  it('pageSize', () => {
    vm = createVue({
      template: `
            <sl-pagination :defaultCurrent="1" :total="1000" :pageSize="20" />
      `,
    });
    expect([...vm.$el.querySelectorAll('.salus-pagination-item')].slice(-1)[0].textContent).to.equal('50');

  });

  /* test onchange */
  it('onchange', done => {
    const spy = sinon.spy();
    vm = createVue({
      template: `
            <sl-pagination :defaultCurrent="1" :total="1000" @change="onChange" />
      `,
      methods: {
        onChange(value) {
          spy(value);
        }
      },
    });
    vm.$el.querySelector('.salus-pagination-next').click();
    vm.$el.querySelector('.salus-pagination-next').click();
    vm.$nextTick(() => {
      expect(spy.args.length).to.equal(2);
      expect(spy.args[0][0]).to.equal(2);
      expect(spy.args[1][0]).to.equal(3);
      done();
    })

  });

})
