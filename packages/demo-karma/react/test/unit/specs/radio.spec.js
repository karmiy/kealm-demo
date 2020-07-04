import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Radio from "components/radio";

configure({ adapter: new Adapter() })

describe('Radio', () => {
  let wrapper = null;
  /* 触发radio点击事件 */
  const dispatchRadioClick = radioWrapper => {
    radioWrapper.instance().click();
    radioWrapper.simulate('change');
  }
  /* test basic */
  it('basic', () => {
    wrapper = mount(<Radio value={1}>普通单选框</Radio>);

    expect(wrapper.contains(<span>普通单选框</span>)).to.be.true;
    const radioInstance = wrapper.find('input').instance();
    expect(radioInstance.type).to.equal('radio');
    expect(radioInstance.classList.contains('salus-radio-input')).to.be.true;
    expect(radioInstance.value).to.equal('1');
    //wrapper.find('input').at(0).simulate('click'); // simulate click好像只能触发手动绑定的onclick
    dispatchRadioClick(wrapper.find('input'));
    expect(wrapper.find('.salus-radio').hasClass('salus-radio-checked')).to.be.true;
  });

  /* test defaultChecked */
  it('defaultChecked', () => {
    wrapper = mount(<Radio value={1} defaultChecked>普通单选框</Radio>);
    expect(wrapper.find('.salus-radio').hasClass('salus-radio-checked')).to.be.true;
  });

  /* test disabled */
  it('disabled', () => {
    wrapper = mount(<Radio value={1} disabled>禁用单选框-未选中</Radio>);
    expect(wrapper.find('.salus-radio').hasClass('salus-radio-disabled')).to.be.true;
    expect(wrapper.find('.salus-radio-wrapper').hasClass('salus-radio-wrapper-disabled')).to.be.true;
  });

  /* test onChange */
  it('onChange', () => {
    const spy = sinon.spy();
    wrapper = mount(<Radio onChange={spy} value={1}>普通单选框</Radio>);
    dispatchRadioClick(wrapper.find('input'));
    expect(spy.called).to.be.true;
  });

  /* test radio-group-horizontal */
  it('radio-group-horizontal', () => {
    wrapper = mount(
      <Radio.Group value={1}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    );
    expect(wrapper.exists('.salus-radio-group')).to.be.true;
    // 初始选中第1个
    expect(wrapper.find('.salus-radio-wrapper').at(0).hasClass('salus-radio-wrapper-checked')).to.be.true;
    expect(wrapper.find('.salus-radio').at(0).hasClass('salus-radio-checked')).to.be.true;
    // 改变选中第3个
    wrapper.setProps({value: 3});
    expect(wrapper.find('.salus-radio-wrapper').at(2).hasClass('salus-radio-wrapper-checked')).to.be.true;
    expect(wrapper.find('.salus-radio').at(2).hasClass('salus-radio-checked')).to.be.true;
  });
  /* test radio-group-vertical */
  it('radio-group-vertical', () => {
    wrapper = mount(
      <Radio.Group value={1} vertical>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    );
    expect(wrapper.find('.salus-radio-group').hasClass('salus-radio-vertical')).to.be.true;
  });

  /* test radio-group-name */
  it('radio-group-name', () => {
    wrapper = mount(
      <Radio.Group value={1} name='radioGroup'>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    );
    wrapper.find('input').forEach(inputWrapper => {
      expect(inputWrapper.instance().name === 'radioGroup').to.be.true;
    })
  });

  /* test radio-group-size */
  it('radio-group-size', () => {
    wrapper = mount(
      <Radio.Group value={1} size="large">
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    );
    expect(wrapper.find('.salus-radio-group').hasClass('salus-radio-group-large')).to.be.true;
    wrapper.setProps({
      size: 'small'
    });
    expect(wrapper.find('.salus-radio-group').hasClass('salus-radio-group-small')).to.be.true;
  });

  /* test radio-button-horizontal */
  it('radio-button-horizontal', () => {
    wrapper = mount(
      <Radio.Group defaultValue="a">
        <Radio.Button value="a">单选按钮</Radio.Button>
        <Radio.Button value="b">单选按钮</Radio.Button>
        <Radio.Button value="c">单选按钮</Radio.Button>
        <Radio.Button value="d" disabled>单选按钮-禁用</Radio.Button>
        <Radio.Button value="e">单选按钮</Radio.Button>
      </Radio.Group>
    );
    // 查看button样式
    expect(wrapper.find('.salus-radio-button-wrapper').length === 5).to.be.true;
    expect(wrapper.find('.salus-radio-button').length === 5).to.be.true;
    expect(wrapper.find('.salus-radio-button-input').length === 5).to.be.true;
    expect(wrapper.find('.salus-radio-button-inner').length === 5).to.be.true;
    // 第四个disabled
    expect(wrapper.find('.salus-radio-button-wrapper').at(3).hasClass('salus-radio-button-wrapper-disabled')).to.be.true;
    expect(wrapper.find('.salus-radio-button').at(3).hasClass('salus-radio-button-disabled')).to.be.true;
    // 初始第一个选中
    expect(wrapper.find('.salus-radio-button-wrapper').at(0).hasClass('salus-radio-button-wrapper-checked')).to.be.true;
    // 点击第二个RadioButton
    dispatchRadioClick(wrapper.find('input').at(1));
    expect(wrapper.find('.salus-radio-button-wrapper').at(1).hasClass('salus-radio-button-wrapper-checked')).to.be.true;
    // 点击第四个RadioButton（disabled），选中应该还是在第二个
    dispatchRadioClick(wrapper.find('input').at(3));
    expect(wrapper.find('.salus-radio-button-wrapper').at(1).hasClass('salus-radio-button-wrapper-checked')).to.be.true;
  });

  /* test radio-button-vertical */
  it('radio-button-vertical', () => {
    wrapper = mount(
      <Radio.Group defaultValue="a" vertical>
        <Radio.Button value="a">单选按钮</Radio.Button>
        <Radio.Button value="b">单选按钮</Radio.Button>
        <Radio.Button value="c">单选按钮</Radio.Button>
        <Radio.Button value="d" disabled>单选按钮-禁用</Radio.Button>
        <Radio.Button value="e">单选按钮</Radio.Button>
      </Radio.Group>
    );
    // 查看vertical样式
    expect(wrapper.find('.salus-radio-group').hasClass('salus-radio-vertical')).to.be.true;
  });

  /* test radio-button-buttonStyle */
  it('radio-button-buttonStyle', () => {
    wrapper = mount(
      <Radio.Group defaultValue="a" vertical buttonStyle="solid">
        <Radio.Button value="a">单选按钮</Radio.Button>
        <Radio.Button value="b">单选按钮</Radio.Button>
        <Radio.Button value="c">单选按钮</Radio.Button>
        <Radio.Button value="d" disabled>单选按钮-禁用</Radio.Button>
      </Radio.Group>
    );
    // 查看solid样式
    expect(wrapper.find('.salus-radio-group').hasClass('salus-radio-group-solid')).to.be.true;
    // 改为outline
    wrapper.setProps({
      buttonStyle: 'outline'
    })
    expect(wrapper.find('.salus-radio-group').hasClass('salus-radio-group-outline')).to.be.true;

  });

})