import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Breadcrumb from "components/breadcrumb";

configure({ adapter: new Adapter() })

describe('Breadcrumb', () => {
  let wrapper = null;

  /* test create */
  it('create', () => {
    wrapper = mount(
      <Breadcrumb>
        <Breadcrumb.Item>一级页面</Breadcrumb.Item>
        <Breadcrumb.Item>二级页面</Breadcrumb.Item>
        <Breadcrumb.Item>三级页面</Breadcrumb.Item>
      </Breadcrumb>
    )
    expect(wrapper.exists('.salus-breadcrumb')).to.be.true;
    expect(wrapper.find('.salus-breadcrumb-link').at(0).text()).to.equal('一级页面');
    expect(wrapper.find('.salus-breadcrumb-link').at(1).text()).to.equal('二级页面');
    expect(wrapper.find('.salus-breadcrumb-link').at(2).text()).to.equal('三级页面');
    expect(wrapper.find('.salus-breadcrumb-separator').at(0).text()).to.equal('/');
  });

  /* test separator */
  it('separator', () => {
    wrapper = mount(
      <Breadcrumb separator=">">
        <Breadcrumb.Item>一级页面</Breadcrumb.Item>
        <Breadcrumb.Item>二级页面</Breadcrumb.Item>
        <Breadcrumb.Item>三级页面</Breadcrumb.Item>
      </Breadcrumb>
    )
    expect(wrapper.find('.salus-breadcrumb-separator').at(0).text()).to.equal('>');
    wrapper = mount(
      <Breadcrumb separator={<span>>></span>}>
        <Breadcrumb.Item>一级页面</Breadcrumb.Item>
        <Breadcrumb.Item>二级页面</Breadcrumb.Item>
        <Breadcrumb.Item>三级页面</Breadcrumb.Item>
      </Breadcrumb>
    )
    expect(wrapper.find('.salus-breadcrumb-separator').contains(<span>>></span>)).to.be.true;
  });

  /* test routerLink */
  it('routerLink', () => {
    wrapper = mount(
      <Router>
        <Breadcrumb>
          <Breadcrumb.Item><Link to="component/breadcrumb">一级页面</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="component/breadcrumb">二级页面</Link></Breadcrumb.Item>
        </Breadcrumb>
      </Router>
    )
    expect(wrapper.find('.salus-breadcrumb-link').at(0).contains(<Link to="component/breadcrumb">一级页面</Link>)).to.be.true;
    expect(wrapper.find('.salus-breadcrumb-link').at(1).contains(<Link to="component/breadcrumb">二级页面</Link>)).to.be.true;
  });

})