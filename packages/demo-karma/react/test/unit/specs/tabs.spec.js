import React from 'react';
import ReactDom from 'react-dom';
import { mount, render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Tabs from "components/tabs";
//import '@salus/styles-react';

configure({ adapter: new Adapter() })

describe('Tabs', () => {
  let wrapper = null;
  /* test is valid */
  it('tab valid', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <Tabs defaultActiveKey="1" onChange={spy}>
        <Tabs.TabPane tab="Tab 1" key="1">Content of Tab Pane 1</Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">Content of Tab Pane 2</Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">Content of Tab Pane 3</Tabs.TabPane>
      </Tabs>
    );
    expect(wrapper.find('.salus-tabs-tab').at(0).hasClass('salus-tabs-tab-active')).to.be.true; //tab0激活状态
    expect(wrapper.find('.salus-tabs-tabpane').at(0).hasClass('salus-tabs-tabpane-active')).to.be.true; //content0激活状态

    wrapper.find('.salus-tabs-tab').at(1).simulate('click');

    expect(wrapper.find('.salus-tabs-tab').at(1).hasClass('salus-tabs-tab-active')).to.be.true;  //tab1激活状态
    expect(wrapper.find('.salus-tabs-tabpane').at(1).hasClass('salus-tabs-tabpane-active')).to.be.true; //content1激活状态
    expect(spy.called).to.be.true; // onChange被触发过
  });

  /* test tab icon */
  it('tab icon', () => {
    wrapper = mount(
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={<span><i className="salus-icon-child-account" />Tab 1</span>} key="1">Tab1</Tabs.TabPane>
        <Tabs.TabPane tab={<span><i className="salus-icon-online" />Tab 2</span>} key="2">Tab2</Tabs.TabPane>
      </Tabs>
    );
    expect(wrapper.find('.salus-tabs-tab').at(0).contains(<span><i className="salus-icon-child-account" />Tab 1</span>)).to.be.true;
    expect(wrapper.find('.salus-tabs-tab').at(1).contains(<span><i className="salus-icon-online" />Tab 2</span>)).to.be.true;
  });

  /* test tabPosition */
  it('tabPosition', () => {
    const position = ['top', 'bottom', 'left', 'right'][Math.random()*4 | 0],
          vertical = ['left', 'right'].includes(position) ? true : false;
    wrapper = mount(
      <Tabs tabPosition={position}>
        <Tabs.TabPane tab="Tab 1" key="1">Content of Tab 1</Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">Content of Tab 2</Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">Content of Tab 3</Tabs.TabPane>
      </Tabs>
    );
    expect(wrapper.find('.salus-tabs').hasClass(`salus-tabs-${position}`)).to.be.true;
    vertical && expect(wrapper.find('.salus-tabs').hasClass(`salus-tabs-vertical`)).to.be.true;
    expect(wrapper.find('.salus-tabs-bar').hasClass(`salus-tabs-${position}-bar`)).to.be.true;
    expect(wrapper.find('.salus-tabs-content').hasClass(`salus-tabs-${position}-content`)).to.be.true;
  });

  /* test disabled */
  it('disabled', () => {
    wrapper = mount(
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Tab 1" key="1">Tab 1</Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" disabled key="2">Tab 2</Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">Tab 3</Tabs.TabPane>
      </Tabs>
    );
    expect(wrapper.find('.salus-tabs-tab').at(1).hasClass(`salus-tabs-tab-disabled`)).to.be.true;
  });

  /* test scroll */
  it('scroll', done => {
    const spyPrev = sinon.spy(),
          spyNext = sinon.spy();
    wrapper = (
      <Tabs defaultActiveKey="0" style={{width: 200}} onPrevClick={spyPrev} onNextClick={spyNext}>
        {
          Array(3).fill('').map((item, index) => (
            <Tabs.TabPane key={index} tab={`Tab${index + 1}`}>Content of tab {index + 1}</Tabs.TabPane>
          ))
        }
      </Tabs>
    );
    const app = document.createElement('div');
    document.body.appendChild(app);
    ReactDom.render(wrapper, app);
    expect(app.querySelector('.salus-tabs-nav-container').classList.contains('salus-tabs-nav-container-scrolling')).to.be.true;
    const tabArrows = app.querySelectorAll('.salus-tabs-tab-arrow-show'),
          nav = app.querySelector('.salus-tabs-nav');
    setTimeout(() => {
      // 点右侧按钮
      tabArrows[1].click();
      setTimeout(() => {
        let transform = getComputedStyle(nav, null).transform,
          translateX = transform.substring(7, transform.length -1).split(',')[4];
        expect(translateX < 0).to.be.true;
        expect(spyNext.called).to.be.true;
        setTimeout(() => {
          // 点左侧按钮
          tabArrows[0].click();
          setTimeout(() => {
            transform = getComputedStyle(nav, null).transform;
            translateX = transform.substring(7, transform.length -1).split(',')[4];
            expect(translateX == 0).to.be.true;
            expect(spyPrev.called).to.be.true;
            done();
          }, 500)
        },1000);
      }, 500)
    }, 1000);
  });

  /* test card */
  it('card', () => {
    wrapper = mount(
      <Tabs type="card" >
        <Tabs.TabPane tab="Tab 1" key="1">Content of Tab Pane 1</Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">Content of Tab Pane 2</Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">Content of Tab Pane 3</Tabs.TabPane>
      </Tabs>
    );
    expect(wrapper.find('.salus-tabs').hasClass('salus-tabs-card')).to.be.true;
    expect(wrapper.find('.salus-tabs-bar').hasClass('salus-tabs-card-bar')).to.be.true;
    expect(wrapper.find('.salus-tabs-content').hasClass('salus-tabs-card-content')).to.be.true;
  });
})