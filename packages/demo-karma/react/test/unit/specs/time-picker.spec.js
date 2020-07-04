import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TimePicker from "components/time-picker";
import Button from "components/button";
import moment from 'moment';

configure({ adapter: new Adapter() })

describe('TimePicker', () => {
  let wrapper = null;

  after(() => {
    [...document.body.children].forEach(item => {
      item.nodeName === 'DIV' && document.body.removeChild(item);
    })
  });

  /* test basic */
  it('basic', () => {
    wrapper = mount(
      <TimePicker/>
    );
    // 弹出时间选择框
    wrapper.find('.salus-time-picker-input-header').simulate('click');
    // 是否有弹框
    const portalWrapper = wrapper.find('div.salus-time-picker-panel');
    expect(portalWrapper).to.exist;

    // 点击时间 05:05:05
    const selectPanelWrapper = portalWrapper.find('.salus-time-picker-panel-select');
    selectPanelWrapper.forEach(panel => {
      panel.find('ul li').at(5).simulate('click');
    });
    const inputWrapper = wrapper.find('input.salus-time-picker-input');
    expect(inputWrapper.instance().value).to.equal('05:05:05');
  });

  /* test defaultOpenValue */
  it('defaultOpenValue', () => {
    wrapper = mount(
      <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
    );
    // 弹出时间选择框
    wrapper.find('.salus-time-picker-input-header').simulate('click');

    // 是否有弹框
    const portalWrapper = wrapper.find('div.salus-time-picker-panel');

    // 选中的时间
    const selectedOptions = portalWrapper.find('.salus-time-picker-panel-select-option-selected');
    selectedOptions.forEach(li => {
      expect(li.text()).to.equal('00');
    });
  });

  /* test onChange */
  it('onChange', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <TimePicker onChange={spy} />
    );
    // 弹出时间选择框
    wrapper.find('.salus-time-picker-input-header').simulate('click');
    // 是否有弹框
    const portalWrapper = wrapper.find('div.salus-time-picker-panel');

    // 点击时间 05:05:;05
    const selectPanelWrapper = portalWrapper.find('.salus-time-picker-panel-select');
    selectPanelWrapper.forEach(panel => {
      panel.find('ul li').at(5).simulate('click');
    });
    expect(spy.called).to.be.true;
  });

  /* test allowClear */
  it('allowClear', () => {
    wrapper = mount(
      <TimePicker defaultValue={moment('12:12:12', 'HH:mm:ss')} />
    );
    const clearBtn = wrapper.find('.salus-time-picker-panel-clear-btn'),
          inputWrapper = wrapper.find('input.salus-time-picker-input');
    expect(inputWrapper.instance().value).to.equal('12:12:12');
    clearBtn.simulate('click');
    expect(inputWrapper.instance().value).to.equal('');
  });

  /* test open */
  it('open', () => {
    wrapper = mount(
      <TimePicker open />
    );
    expect(wrapper.find('div.salus-time-picker-panel')).to.exist;
  });

  /* test onOpenChange */
  it('onOpenChange', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <TimePicker onOpenChange={spy} />
    );

    wrapper.find('.salus-time-picker-input-header').simulate('click');
    expect(spy.called).to.be.true;
  });

  /* test addon */
  it('addon', () => {
    const addon = (
      <div>
        <Button size="small">取消</Button>
        <Button size="small" type="primary">确定</Button>
      </div>
    );
    wrapper = mount(
      <TimePicker open addon={() => addon}  />
    );
    expect(wrapper.find('.salus-time-picker-addon').contains(addon)).to.be.true;

  });

  /* test disabled */
  it('disabled', () => {
    const disabledHours = [ 1, 2, 3 ],
          disabledMinutes = [ 20, 21, 22, 23, 24, 25 ],
          disabledSeconds = [ 20, 21, 22, 23, 24, 25 ];
    wrapper = mount(
      <TimePicker
        open
        disabledHours={() => disabledHours}
        disabledMinutes={() => disabledMinutes}
        disabledSeconds={() => disabledSeconds}
      />
    );

    const selectPanelWrapper = wrapper.find('.salus-time-picker-panel-select');
    selectPanelWrapper.forEach((panel, index) => {
      // 时
      index === 0 && disabledHours.forEach(time => {
        expect(panel.find('ul li').at(time).hasClass('salus-time-picker-panel-select-option-disabled')).to.be.true;
      });
      // 分
      index === 1 && disabledMinutes.forEach(time => {
        expect(panel.find('ul li').at(time).hasClass('salus-time-picker-panel-select-option-disabled')).to.be.true;
      });
      // 秒
      index === 2 && disabledSeconds.forEach(time => {
        expect(panel.find('ul li').at(time).hasClass('salus-time-picker-panel-select-option-disabled')).to.be.true;
      })
    });
  });

  /* test format */
  it('format', () => {
    wrapper = mount(
      <TimePicker
        format={'HH:mm'}
        open
      />
    );
    // 弹框是否只有2列时间列表
    const portalWrapper = wrapper.find('div.salus-time-picker-panel'),
          selectPanel = portalWrapper.find('.salus-time-picker-panel-select');
    expect(selectPanel.length).to.equal(2);

    // 点击时间 05:05
    const selectPanelWrapper = portalWrapper.find('.salus-time-picker-panel-select');
    selectPanelWrapper.forEach(panel => {
      panel.find('ul li').at(5).simulate('click');
    });
    const inputWrapper = wrapper.find('input.salus-time-picker-input');
    expect(inputWrapper.instance().value).to.equal('05:05');
  });

  /* test hourStep、minuteStep、secondStep */
  it('hourStep、minuteStep、secondStep', () => {
    wrapper = mount(
      <TimePicker
        hourStep={2}
        minuteStep={3}
        secondStep={4}
        open
      />
    );
    // 时间列表是否有符合间隔
    const selectPanel = wrapper.find('.salus-time-picker-panel-select');
    let hourStep = 0, minuteStep = 0, secondStep = 0;
    selectPanel.forEach((panel, index) => {
      // 时
      index === 0 && panel.find('ul li').forEach( time => {
        expect(parseInt(time.text())).to.equal(hourStep);
        hourStep += 2;
      });
      // 分
      index === 1 && panel.find('ul li').forEach( time => {
        expect(parseInt(time.text())).to.equal(minuteStep);
        minuteStep += 3;
      });
      // 秒
      index === 2 && panel.find('ul li').forEach( time => {
        expect(parseInt(time.text())).to.equal(secondStep);
        secondStep += 4;
      });
    })
  });

  /* test popupStyle popupClassName */
  it('popupStyle popupClassName', () => {
    wrapper = mount(
      <TimePicker
        popupClassName={'pop-panel'}
        popupStyle={{color: 'red'}}
        open
      />
    );
    const popWrapper = wrapper.find('div.salus-time-picker-panel');
    expect(popWrapper.instance().style.color).to.equal('red');
    expect(popWrapper.instance().classList.contains('pop-panel')).to.be.true;
  });

  /* test suffixIcon */
  it('suffixIcon', () => {
    wrapper = mount(
      <TimePicker
        suffixIcon={<i className="salus-icon-check-o"></i>}
      />
    );
    expect(wrapper.contains(<i className="salus-icon-check-o salus-time-picker-clock-icon"></i>)).to.be.true;
  });

  /* test clearText */
  it('clearText', () => {
    wrapper = mount(
      <TimePicker
        clearText={'clear-all'}
      />
    );
    expect(wrapper.find('.salus-time-picker-panel-clear-btn').instance().title).to.equal('clear-all');
  });

})