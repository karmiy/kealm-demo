import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ColorPicker from "components/color-picker";

configure({ adapter: new Adapter() })

describe('ColorPicker', () => {
  let wrapper = null;

  /*after(() => {
    [...document.body.children].forEach(item => {
      item.nodeName === 'DIV' && document.body.removeChild(item);
    })
  });*/

  /* test basic */
  it('basic', () => {
    wrapper = mount(<ColorPicker />);
    const switchButtonWrapper = wrapper.find('button'),
          triggerIcon = switchButtonWrapper.find('i');
    expect(triggerIcon.instance().classList.contains('salus-icon-triangle-down')).to.be.true;
    switchButtonWrapper.simulate('click');
    expect(triggerIcon.instance().classList.contains('salus-icon-pop-close-o')).to.be.true;

    // 是否有生成颜色选择框
    expect(wrapper.find('.salus-color-picker-dropdown').length).to.equal(1);

  });

  /* test default */
  it('default', () => {
    wrapper = mount(<ColorPicker defaultColor='#1394ff' />);
    const switchButtonWrapper = wrapper.find('button');
    switchButtonWrapper.simulate('click');

    const dropdownWrapper = wrapper.find('.salus-color-picker-dropdown');
    expect(dropdownWrapper.find('.salus-color-picker-bottom input').instance().value).to.equal('#1394ff');

  });

  /* test clear */
  it('clear', () => {
    const spy = sinon.spy();
    wrapper = mount(<ColorPicker defaultColor='#1394ff' colorChange={spy} />);
    const switchButtonWrapper = wrapper.find('button');
    switchButtonWrapper.simulate('click');

    const dropdownWrapper = wrapper.find('.salus-color-picker-dropdown');
    // 点击清空
    dropdownWrapper.find('.salus-color-picker-bottom button').at(0).simulate('click');
    expect(dropdownWrapper.find('.salus-color-picker-bottom input').instance().value).to.equal('');
    expect(spy.called).to.be.true;

  });

  /* test buttonStyle */
  it('buttonStyle', () => {
    wrapper = mount(<ColorPicker buttonStyle={{width: 30, height: 30}} />);
    const switchButtonWrapper = wrapper.find('button');
    expect(switchButtonWrapper.instance().style.width).to.equal('30px');
    expect(switchButtonWrapper.instance().style.height).to.equal('30px');
  });

  /* test zIndex */
  it('zIndex', () => {
    wrapper = mount(<ColorPicker zIndex={1000} />);
    const switchButtonWrapper = wrapper.find('button');
    switchButtonWrapper.simulate('click');
    expect(wrapper.find('div.salus-drop-layer').at(0).instance().style.zIndex).to.equal('1000');
  });


})