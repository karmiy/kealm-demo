import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import InputNumber from "components/input-number";

configure({ adapter: new Adapter() })

describe('InputNumber', () => {
  let wrapper = null;

  /* test basic */
  it('basic', () => {
    wrapper = mount(
      <InputNumber min={1} max={10} defaultValue={3} />
    )
    const inputInstance = wrapper.find('.salus-input-number-input').instance();
    expect(inputInstance.value).to.equal('3');
    expect(inputInstance.getAttribute('max')).to.equal('10');
    expect(inputInstance.getAttribute('min')).to.equal('1');
    expect(inputInstance.getAttribute('step')).to.equal('1');

    const arrows = wrapper.find('.salus-input-number-handler-wrap').children();
    // 点击上箭头+
    arrows.at(0).simulate('mousedown');
    expect(inputInstance.value).to.equal('4');
    // 点击下箭头-
    arrows.at(1).simulate('mousedown');
    expect(inputInstance.value).to.equal('3');
  });

  /* test onChange */
  it('onChange', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <InputNumber min={1} max={10} defaultValue={3} onChange={spy} />
    )
    // 点击上箭头+
    wrapper.find('.salus-input-number-handler-wrap').children().at(0).simulate('mousedown');
    expect(spy.called).to.be.true;
    expect(spy.args[0][0]).to.equal(4);
  });

  /* test max */
  it('max', () => {
    wrapper = mount(
      <InputNumber min={1} max={10} defaultValue={9} />
    )
    const inputInstance = wrapper.find('.salus-input-number-input').instance();
    expect(inputInstance.getAttribute('max')).to.equal('10');

    const arrows = wrapper.find('.salus-input-number-handler-wrap').children();
    // 点击上箭头+
    arrows.at(0).simulate('mousedown');
    expect(inputInstance.value).to.equal('10');
    // 超过10没反应
    arrows.at(0).simulate('mousedown');
    expect(inputInstance.value).to.equal('10');
  });

  /* test min */
  it('min', () => {
    wrapper = mount(
      <InputNumber min={1} max={10} defaultValue={2} />
    )
    const inputInstance = wrapper.find('.salus-input-number-input').instance();
    expect(inputInstance.getAttribute('min')).to.equal('1');

    const arrows = wrapper.find('.salus-input-number-handler-wrap').children();
    // 点击下箭头-
    arrows.at(1).simulate('mousedown');
    expect(inputInstance.value).to.equal('1');
    // 小于1没反应
    arrows.at(1).simulate('mousedown');
    expect(inputInstance.value).to.equal('1');
  });

  /* test step */
  it('step', () => {
    wrapper = mount(
      <InputNumber min={1} max={10} defaultValue={2} />
    )
    const inputInstance = wrapper.find('.salus-input-number-input').instance();
    expect(inputInstance.getAttribute('step')).to.equal('1');

    const arrows = wrapper.find('.salus-input-number-handler-wrap').children();
    // 点击下箭头+， step每次进1
    arrows.at(0).simulate('mousedown');
    expect(inputInstance.value).to.equal('3');

    // 改变step为0.1
    wrapper.setProps({
      step: 0.1
    });
    // 点击下箭头+， step每次进0.1
    arrows.at(0).simulate('mousedown');
    expect(inputInstance.value).to.equal('3.1');
  });

  /* test handleType symbols */
  it('handleType symbols', () => {
    wrapper = mount(
      <InputNumber min={1} max={10} defaultValue={3} handleType='symbols' />
    )
    const inputInstance = wrapper.find('.salus-input-number-input').instance();
    expect(inputInstance.value).to.equal('3');
    expect(inputInstance.getAttribute('max')).to.equal('10');
    expect(inputInstance.getAttribute('min')).to.equal('1');
    expect(inputInstance.getAttribute('step')).to.equal('1');

    // class
    expect(wrapper.find('.salus-input-number').hasClass('salus-input-number-sysmbols-handler')).to.be.true;

    const arrows = wrapper.find('.salus-input-number-handler-wrap').children();
    // 点击 + 箭头
    arrows.at(0).simulate('mousedown');
    expect(inputInstance.value).to.equal('4');
    // 点击 - 箭头
    arrows.at(1).simulate('mousedown');
    expect(inputInstance.value).to.equal('3');

  });

  /* test disabled */
  it('disabled', () => {
    wrapper = mount(
      <InputNumber min={1} max={10} defaultValue={3} handleType='symbols' disabled />
    )

    // class disabled
    expect(wrapper.find('.salus-input-number').hasClass('salus-input-number-disabled')).to.be.true;

    // 是否点击没反应
    const inputInstance = wrapper.find('.salus-input-number-input').instance(),
          arrows = wrapper.find('.salus-input-number-handler-wrap').children();
    // 点击 + 箭头
    arrows.at(0).simulate('mousedown');
    expect(inputInstance.value).to.equal('3');
    // 点击 - 箭头
    arrows.at(1).simulate('mousedown');
    expect(inputInstance.value).to.equal('3');

  });

  /* test size */
  it('size', () => {
    wrapper = mount(
      <InputNumber size="large" min={1} max={100000} defaultValue={3} />
    )

    // class large
    expect(wrapper.find('.salus-input-number').hasClass('salus-input-number-lg')).to.be.true;

    // class small
    wrapper.setProps({
      size: 'small',
    })
    expect(wrapper.find('.salus-input-number').hasClass('salus-input-number-sm')).to.be.true;
  });

  /* test decimal */
  it('decimal', () => {
    wrapper = mount(
      <InputNumber min={0} max={10} step={0.1} defaultValue={3} />
    )

    const inputInstance = wrapper.find('.salus-input-number-input').instance();
    expect(inputInstance.value).to.equal('3.0');
    expect(inputInstance.getAttribute('max')).to.equal('10');
    expect(inputInstance.getAttribute('min')).to.equal('0');
    expect(inputInstance.getAttribute('step')).to.equal('0.1');

    const arrows = wrapper.find('.salus-input-number-handler-wrap').children();
    // 点击上箭头+
    arrows.at(0).simulate('mousedown');
    expect(inputInstance.value).to.equal('3.1');
    // 点击下箭头-
    arrows.at(1).simulate('mousedown');
    expect(inputInstance.value).to.equal('3.0');
  });

  /* test format */
  it('format', () => {
    wrapper = mount(
      <InputNumber
        defaultValue={3}
        formatter={value => `$ ${value}`}
        parser={value => parseFloat(value.replace('$ ', ''))}
      />
    )

    // 文本内容是否含$
    const inputInstance = wrapper.find('.salus-input-number-input').instance();
    expect(inputInstance.value).to.equal('$ 3');

    const arrows = wrapper.find('.salus-input-number-handler-wrap').children();
    // 点击上箭头+
    arrows.at(0).simulate('mousedown');
    expect(inputInstance.value).to.equal('$ 4');
    // 点击下箭头-
    arrows.at(1).simulate('mousedown');
    expect(inputInstance.value).to.equal('$ 3');
  });

})