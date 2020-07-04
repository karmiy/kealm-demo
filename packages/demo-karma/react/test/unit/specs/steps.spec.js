import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Steps from "components/steps";

configure({ adapter: new Adapter() })

describe('Steps', () => {
  let wrapper = null;

  /* test basic */
  it('basic', () => {
    wrapper = mount(
      <Steps current={1}>
        <Steps.Step title="步骤1" description="描述（可选）" />
        <Steps.Step title="步骤2" description="描述（可选）" />
        <Steps.Step title="步骤3" description="描述（可选）" />
        <Steps.Step title="步骤4" description="描述（可选）" />
      </Steps>
    )
    // 测试每个步骤样式是否正确
    expect(wrapper.find('.salus-steps-item').at(0).hasClass('salus-steps-item-finish')).to.be.true;
    expect(wrapper.find('.salus-steps-item').at(1).hasClass('salus-steps-item-process')).to.be.true;
    expect(wrapper.find('.salus-steps-item').at(2).hasClass('salus-steps-item-wait')).to.be.true;
    expect(wrapper.find('.salus-steps-item').at(3).hasClass('salus-steps-item-wait')).to.be.true;
    // 测试完成步骤图标是否正确
    expect(wrapper.find('.salus-steps-item-finish').contains(<i className={'salus-steps-icon salus-icon-check-o'}></i>)).to.be.true;
    // 测试每个步骤title是否正确
    expect(wrapper.find('.salus-steps-item-title').at(0).text()).to.equal('步骤1');
    expect(wrapper.find('.salus-steps-item-title').at(1).text()).to.equal('步骤2');
    expect(wrapper.find('.salus-steps-item-title').at(2).text()).to.equal('步骤3');
    expect(wrapper.find('.salus-steps-item-title').at(3).text()).to.equal('步骤4');
    // 测试每个步骤description是否正常
    expect(wrapper.find('.salus-steps-item-description').at(0).text()).to.equal('描述（可选）');
    expect(wrapper.find('.salus-steps-item-description').at(1).text()).to.equal('描述（可选）');
    expect(wrapper.find('.salus-steps-item-description').at(2).text()).to.equal('描述（可选）');
    expect(wrapper.find('.salus-steps-item-description').at(3).text()).to.equal('描述（可选）');
  });

  /* test size */
  it('size', () => {
    wrapper = mount(
      <Steps current={1} size="small">
        <Steps.Step title="步骤1" description="描述（可选）" />
        <Steps.Step title="步骤2" description="描述（可选）" />
        <Steps.Step title="步骤3" description="描述（可选）" />
        <Steps.Step title="步骤4" description="描述（可选）" />
      </Steps>
    )
    expect(wrapper.find('.salus-steps').hasClass('salus-steps-small')).to.be.true;
  });

  /* test direction */
  it('direction', () => {
    wrapper = mount(
      <Steps current={1} direction="vertical">
        <Steps.Step title="步骤1" description="描述（可选）" />
        <Steps.Step title="步骤2" description="描述（可选）" />
        <Steps.Step title="步骤3" description="描述（可选）" />
        <Steps.Step title="步骤4" description="描述（可选）" />
      </Steps>
    )
    expect(wrapper.find('.salus-steps').hasClass('salus-steps-vertical')).to.be.true;

    wrapper = mount(
      <Steps current={1} direction="horizontal">
        <Steps.Step title="步骤1" description="描述（可选）" />
        <Steps.Step title="步骤2" description="描述（可选）" />
        <Steps.Step title="步骤3" description="描述（可选）" />
        <Steps.Step title="步骤4" description="描述（可选）" />
      </Steps>
    )
    expect(wrapper.find('.salus-steps').hasClass('salus-steps-horizontal')).to.be.true;
    expect(wrapper.find('.salus-steps').hasClass('salus-steps-label-vertical')).to.be.true;
  });

  /* test vertical small */
  it('vertical small', () => {
    wrapper = mount(
      <Steps current={1} direction="vertical" size="small">
        <Steps.Step title="步骤1" description="描述（可选）" />
        <Steps.Step title="步骤2" description="描述（可选）" />
        <Steps.Step title="步骤3" description="描述（可选）" />
        <Steps.Step title="步骤4" description="描述（可选）" />
      </Steps>
    )
    expect(wrapper.find('.salus-steps').hasClass('salus-steps-vertical')).to.be.true;
    expect(wrapper.find('.salus-steps').hasClass('salus-steps-small')).to.be.true;
  });

  /* test status */
  it('status', () => {
    const status = ['wait', 'process', 'finish', 'error'][Math.random() * 4 | 0];
    wrapper = mount(
      <Steps current={2} status={status}>
        <Steps.Step title="步骤1" description="描述（可选）" />
        <Steps.Step title="步骤2" description="描述（可选）" />
        <Steps.Step title="步骤3" description="描述（可选）" />
        <Steps.Step title="步骤4" description="描述（可选）" />
      </Steps>
    )
    expect(wrapper.find('.salus-steps-item').at(2).hasClass(`salus-steps-item-${status}`)).to.be.true;
  });

  /* test step switch */
  it('step switch', () => {
    wrapper = mount(
      <Steps current={0}>
        <Steps.Step title="步骤1" description="描述（可选）" />
        <Steps.Step title="步骤2" description="描述（可选）" />
        <Steps.Step title="步骤3" description="描述（可选）" />
        <Steps.Step title="步骤4" description="描述（可选）" />
      </Steps>
    )
    // 初始在第一步， 没有完成项
    expect(wrapper.exists('.salus-steps-item-finish')).to.be.false;
    // 至第二步
    wrapper.setProps({
      current: 1
    })
    expect(wrapper.find('.salus-steps-item').at(0).hasClass('salus-steps-item-finish')).to.be.true;
    // 至第三步
    wrapper.setProps({
      current: 2
    })
    expect(wrapper.find('.salus-steps-item').at(0).hasClass('salus-steps-item-finish')).to.be.true;
    expect(wrapper.find('.salus-steps-item').at(1).hasClass('salus-steps-item-finish')).to.be.true;
    // 至第四步
    wrapper.setProps({
      current: 3
    })
    expect(wrapper.find('.salus-steps-item').at(0).hasClass('salus-steps-item-finish')).to.be.true;
    expect(wrapper.find('.salus-steps-item').at(1).hasClass('salus-steps-item-finish')).to.be.true;
    expect(wrapper.find('.salus-steps-item').at(2).hasClass('salus-steps-item-finish')).to.be.true;
    // 至完成
    wrapper.setProps({
      current: 4
    })
    expect(wrapper.find('.salus-steps-item').at(0).hasClass('salus-steps-item-finish')).to.be.true;
    expect(wrapper.find('.salus-steps-item').at(1).hasClass('salus-steps-item-finish')).to.be.true;
    expect(wrapper.find('.salus-steps-item').at(2).hasClass('salus-steps-item-finish')).to.be.true;
    expect(wrapper.find('.salus-steps-item').at(3).hasClass('salus-steps-item-finish')).to.be.true;
  });
})