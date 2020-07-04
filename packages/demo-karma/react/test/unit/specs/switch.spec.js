import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Switch from "components/switch";

configure({ adapter: new Adapter() })

describe('Swtich', () => {
  let wrapper = null;

  /* test basic */
  it('basic', () => {
    wrapper = mount(
      <Switch defaultChecked />
    )

    const buttonInstance = wrapper.find('button').instance();
    expect(buttonInstance.getAttribute('aria-checked')).to.equal('true');
    expect(buttonInstance.classList.contains('salus-switch-checked')).to.be.true;

    // 点击切换
    wrapper.find('button').simulate('click');
    expect(buttonInstance.getAttribute('aria-checked')).to.equal('false');
    expect(buttonInstance.classList.contains('salus-switch-checked')).to.be.false;
  });

  /* test onChange */
  it('onChange', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <Switch defaultChecked onChange={spy} />
    )

    // 点击切换
    wrapper.find('button').simulate('click');
    expect(spy.args[0][0]).to.be.false;
  });

  /* test onClick */
  it('onClick', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <Switch defaultChecked onClick={spy} />
    )

    // 点击切换
    wrapper.find('button').simulate('click');
    expect(spy.called).to.be.true;
  });

  /* test disabled */
  it('disabled', () => {
    wrapper = mount(
      <Switch defaultChecked disabled />
    )

    // class
    const buttonInstance = wrapper.find('button').instance();
    expect(buttonInstance.classList.contains('salus-switch-disabled')).to.be.true;
    expect(buttonInstance.classList.contains('salus-switch-checked')).to.be.true;
    // 点击切换
    wrapper.find('button').simulate('click');
    expect(buttonInstance.classList.contains('salus-switch-checked')).to.be.true;
  });

  /* test checkedChildren */
  it('checkedChildren', () => {
    wrapper = mount(
      <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
    )

    // 文本类checkedChildren
    expect(wrapper.find('.salus-switch-inner').contains('开')).to.be.true;
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.salus-switch-inner').contains('关')).to.be.true;

    //设置图标类checkedChildren
    wrapper.setProps({
      checkedChildren: <i className="salus-icon-check-o" />,
      unCheckedChildren: <i className="salus-icon-pop-close-o" />
    })
    expect(wrapper.find('.salus-switch-inner').contains(<i className="salus-icon-pop-close-o" />)).to.be.true;
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.salus-switch-inner').contains(<i className="salus-icon-check-o" />)).to.be.true;
  });

  /* test size */
  it('size', () => {
    wrapper = mount(
      <Switch size="small" defaultChecked />
    )
    expect(wrapper.find('button').hasClass('salus-switch-small')).to.be.true;
  });

  /* test loading */
  it('loading', () => {
    wrapper = mount(
      <Switch loading defaultChecked />
    )
    expect(wrapper.find('button').hasClass('salus-switch-loading')).to.be.true;
  });

})