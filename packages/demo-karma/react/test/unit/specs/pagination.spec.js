import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Pagination from "components/pagination";

configure({ adapter: new Adapter() })

describe('Pagination', () => {
  let wrapper = null;

  /* test create */
  it('create', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <Pagination defaultCurrent={1} total={150} onChange={spy} />
    );
    expect(wrapper.exists('.salus-pagination-prev')).to.be.true;
    expect(wrapper.exists('.salus-pagination-next')).to.be.true;
    expect(wrapper.exists('.salus-pagination-jump-next')).to.be.true;
    expect(wrapper.find('.salus-pagination-prev').hasClass('salus-pagination-disabled')).to.be.true;
    expect(wrapper.find('.salus-pagination-item').at(0).hasClass('salus-pagination-item-active')).to.be.true;
    wrapper.find('.salus-pagination-item').at(4).simulate('click');
    expect(wrapper.exists('.salus-pagination-jump-prev')).to.be.true;
    expect(wrapper.find('.salus-pagination-item').at(3).hasClass('salus-pagination-item-active')).to.be.true; //出现prev的...后，页码2被隐藏
    expect(wrapper.find('.salus-pagination-prev').hasClass('salus-pagination-disabled')).to.be.false;
    expect(spy.called).to.be.true;
  });

  /* test showQuickJumper */
  it('showQuickJumper', () => {
    wrapper = mount(
      <Pagination total={150} showQuickJumper />
    )
    expect(wrapper.exists('.salus-pagination-options-quick-jumper')).to.be.true;
    expect(wrapper.find('.salus-pagination-item').at(0).instance().classList.contains('salus-pagination-item-active')).to.be.true;
    wrapper.children().at(0).children().at(0).instance().handleKeyUp({keyCode: 13, target: {value: 2}}); // 模拟点击事件
    expect(wrapper.find('.salus-pagination-item').at(1).instance().classList.contains('salus-pagination-item-active')).to.be.true;
  });

  /* test showTotal */
  it('showTotal', () => {
    wrapper = mount(
      <Pagination
        total={150}
        showTotal={(total, range) => `当前${range[0]}-${range[1]}条， 共${total}条`}
        defaultCurrent={1}
      />
    )
    expect(wrapper.exists('.salus-pagination-total-text')).to.be.true;
    expect(wrapper.find('.salus-pagination-total-text').text()).to.equal('当前1-10条， 共150条');

    wrapper.find('.salus-pagination-item').at(1).simulate('click');
    expect(wrapper.find('.salus-pagination-total-text').text()).to.equal('当前11-20条， 共150条');
  });

  /* test simple */
  it('simple', () => {
    wrapper = mount(
      <Pagination simple defaultCurrent={2} total={150} />
    )
    expect(wrapper.find('.salus-pagination').exists('.salus-pagination-simple')).to.be.true;
    expect(wrapper.find('.salus-pagination').exists('.salus-pagination-simple-pager')).to.be.true;

    wrapper.find('.salus-pagination-prev').at(0).simulate('click');
    expect(wrapper.find('input').instance().value).to.equal('1');
    wrapper.find('.salus-pagination-next').at(0).simulate('click');
    expect(wrapper.find('input').instance().value).to.equal('2');
  });

  /* test quickClick */
  it('quickClick', () => {
    wrapper = mount(
      <Pagination defaultCurrent={1} total={1500} />
    )
    for(let i = 1; i< 150; i++) {
      wrapper.find('.salus-pagination-next').at(0).simulate('click');
    }
    expect(wrapper.find('.salus-pagination-item-active').text()).to.equal('150');
  });

  /* test pageSize */
  it('pageSize', () => {
    wrapper = mount(
      <Pagination defaultCurrent={1} total={1000} pageSize={20} />
    )
    expect(wrapper.find('.salus-pagination-item').last().text()).to.equal('50');
  });

  /* test onchange */
  it('onchange', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <Pagination defaultCurrent={1} total={1000} onChange={spy} />
    )
    wrapper.find('.salus-pagination-next').at(0).simulate('click');
    wrapper.find('.salus-pagination-next').at(0).simulate('click');
    expect(spy.args.length).to.equal(2);
    expect(spy.args[0][0]).to.equal(2);
    expect(spy.args[1][0]).to.equal(3);
  });

})