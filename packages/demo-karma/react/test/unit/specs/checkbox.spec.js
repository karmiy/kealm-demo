import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Checkbox from "components/checkbox";
import { Row, Col } from "components/grid";

configure({ adapter: new Adapter() })

describe('Checkbox', () => {
  let wrapper = null;
  /* 触发checkbox点击事件 */
  const dispatchCheckboxClick = checkboxWrapper => {
    checkboxWrapper.instance().click();
    checkboxWrapper.simulate('change');
  }
  /* test basic */
  it('basic', () => {
    wrapper = mount(<Checkbox>普通复选框</Checkbox>);

    expect(wrapper.contains(<span>普通复选框</span>)).to.be.true;
    const checkboxInstance = wrapper.find('input').instance();
    expect(checkboxInstance.type).to.equal('checkbox');
    expect(checkboxInstance.classList.contains('salus-checkbox-input')).to.be.true;
    dispatchCheckboxClick(wrapper.find('input'));
    expect(wrapper.find('.salus-checkbox').hasClass('salus-checkbox-checked')).to.be.true;
    expect(wrapper.find('.salus-checkbox-wrapper').hasClass('salus-checkbox-wrapper-checked')).to.be.true;
  });

  /* test defaultChecked */
  it('defaultChecked', () => {
    wrapper = mount(<Checkbox defaultChecked>普通复选框</Checkbox>);

    expect(wrapper.find('.salus-checkbox').hasClass('salus-checkbox-checked')).to.be.true;
    expect(wrapper.find('.salus-checkbox-wrapper').hasClass('salus-checkbox-wrapper-checked')).to.be.true;
  });

  /* test disabled */
  it('disabled', () => {
    wrapper = mount(<Checkbox defaultChecked disabled>禁用复选框(选中)</Checkbox>);

    expect(wrapper.find('.salus-checkbox').hasClass('salus-checkbox-disabled')).to.be.true;
    expect(wrapper.find('.salus-checkbox-wrapper').hasClass('salus-checkbox-wrapper-disabled')).to.be.true;
  });

  /* test onChange */
  it('onChange', () => {
    const spy = sinon.spy();
    wrapper = mount(<Checkbox onChange={spy}>普通复选框</Checkbox>);
    dispatchCheckboxClick(wrapper.find('input'));
    expect(spy.called).to.be.true;
    expect(spy.firstCall.args[0].target.checked).to.be.true;
  });

  /* test checkAll */
  it('checkAll', () => {
    // onChange、onCheckAllChange
    const changeSpy = sinon.spy();
    // 全部checkbox数据
    const plainOptions = [
      {
        label: '选项1',
        value: 'item1'
      },
      {
        label: '选项2',
        value: 'item2'
      },
      {
        label: '选项3',
        value: 'item3'
      }
    ];
    // 检查部分选则样式
    wrapper = mount(
      <Checkbox
        indeterminate={true}
      >
        全选
      </Checkbox>
    )
    expect(wrapper.find('.salus-checkbox').hasClass('salus-checkbox-indeterminate')).to.be.true;
    // 检查全选状态
    wrapper.setProps({
      checked: true
    });
    expect(wrapper.find('.salus-checkbox-wrapper').hasClass('salus-checkbox-wrapper-checked')).to.be.true;
    expect(wrapper.find('.salus-checkbox').hasClass('salus-checkbox-checked')).to.be.true;

    // 受控CheckBox部分（注：设置了value后需要改成value数据才能重新渲染）
    wrapper = mount(
      <Checkbox.Group options={plainOptions} value={['item1']} />
    )
    expect(wrapper.find('.salus-checkbox-wrapper-checked').length).to.equal(1);
    expect(wrapper.find('.salus-checkbox-wrapper').at(0).hasClass('salus-checkbox-wrapper-checked')).to.be.true;
    expect(wrapper.find('.salus-checkbox').at(0).hasClass('salus-checkbox-checked')).to.be.true;
    expect(wrapper.find('input').at(0).instance().checked === true).to.be.true;
    // 修改选中
    wrapper.setProps({
      value: ['item2', 'item3']
    })
    expect(wrapper.find('.salus-checkbox-wrapper-checked').length).to.equal(2);
    expect(wrapper.find('.salus-checkbox-wrapper').at(1).hasClass('salus-checkbox-wrapper-checked')).to.be.true;
    expect(wrapper.find('.salus-checkbox').at(1).hasClass('salus-checkbox-checked')).to.be.true;
    expect(wrapper.find('input').at(1).instance().checked === true).to.be.true;
    expect(wrapper.find('.salus-checkbox-wrapper').at(2).hasClass('salus-checkbox-wrapper-checked')).to.be.true;
    expect(wrapper.find('.salus-checkbox').at(2).hasClass('salus-checkbox-checked')).to.be.true;
    expect(wrapper.find('input').at(2).instance().checked === true).to.be.true;
  });

  /* test checkbox grid */
  it('checkbox grid', () => {
    const values = ['A', 'B', 'C', 'D', 'E'];
    wrapper = mount(
      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
          {
            values.map((item, index) => <Col span={8} key={index}><Checkbox value={item}>{item}</Checkbox></Col>)
          }
        </Row>
      </Checkbox.Group>
    );
    expect(wrapper.exists('.salus-row')).to.be.true;
    const cols = wrapper.find('.salus-col-8');
    expect(cols.length).to.equal(5);
    cols.forEach((col, index) => {
      expect(col.contains(<Checkbox value={values[index]}>{values[index]}</Checkbox>)).to.be.true;
    })
  });

  /* test checkbox button */
  it('checkbox button', () => {
    wrapper = mount(
      <Checkbox displayButton={true} defaultChecked>普通复选框</Checkbox>
    );
    expect(wrapper.find('.salus-checkbox-wrapper').hasClass('salus-checkbox-button-wrapper')).to.be.true;
    expect(wrapper.find('.salus-checkbox-wrapper').hasClass('salus-checkbox-button-wrapper-checked')).to.be.true;
    wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('.salus-checkbox-wrapper').hasClass('salus-checkbox-button-wrapper-disabled')).to.be.true;
    wrapper.setProps({
      defaultChecked: true
    })
  });
})