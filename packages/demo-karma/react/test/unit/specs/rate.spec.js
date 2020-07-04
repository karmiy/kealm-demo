import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Rate from "components/rate";

configure({ adapter: new Adapter() })

describe('Rate', () => {
  let wrapper = null;

  /* test basic */
  it('basic', () => {
    wrapper = mount(
      <Rate />
    )
    expect(wrapper.find('.salus-rate').children().length).to.equal(5);
    expect(wrapper.find('.salus-rate-star-zero').length).to.equal(5);

    // 点击第3个，显示3个高亮
    const stars = wrapper.find('.salus-rate-star');
    stars.at(2).simulate('click');
    expect(wrapper.find('.salus-rate-star-zero').length).to.equal(2);
    expect(wrapper.find('.salus-rate-star-full').length).to.equal(3);

    // 再次点击第3个，高亮全部清空
    stars.at(2).simulate('click');
    expect(wrapper.find('.salus-rate-star-zero').length).to.equal(5);
  });

  /* test allowHalf */
  it('allowHalf', () => {
    wrapper = mount(
      <Rate allowHalf defaultValue={2.5}  />
    )
    const stars = wrapper.find('.salus-rate-star');
    expect(wrapper.find('.salus-rate-star-zero').length).to.equal(2);
    expect(wrapper.find('.salus-rate-star-full').length).to.equal(2);
    expect(stars.at(2).hasClass('salus-rate-star-half')).to.be.true;
    expect(stars.at(2).hasClass('salus-rate-star-active')).to.be.true;

    // 点击第二颗星的后半部分
    stars.at(2).find('.salus-rate-star-second').simulate('click');
    expect(wrapper.find('.salus-rate-star-full').length).to.equal(3);
  });

  /* test onChange */
  it('onChange', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <Rate allowHalf onChange={spy} />
    )
    const stars = wrapper.find('.salus-rate-star');
    stars.at(2).find('.salus-rate-star-second').simulate('click');
    expect(spy.called).to.be.true;
    expect(spy.args[0][0]).to.equal(3);
  });

  /* test value change for tips */
  it('value change for tips', () => {
    const Container = class extends React.Component {
      state = {
        value: 1.5
      }
      changeTooltip = (value) => {
        this.setState({
          value
        })
      }
      render() {
        return (
          <div className={'container'}>
            <Rate allowHalf value={this.state.value} onChange={this.changeTooltip} />
            <span className={'tips'}>{this.state.value} stars</span>
          </div>
        )
      }
    }
    wrapper = mount(
      <Container />
    );
    const containerWrapper = wrapper.children().at(0),
          rateWrapper = containerWrapper.children().at(0),
          tipsWrapper = containerWrapper.children().at(1);

    // 点击第二颗星的后半部分
    rateWrapper.find('.salus-rate-star').at(2).find('.salus-rate-star-second').simulate('click');
    expect(tipsWrapper.text()).to.equal('3 stars');

  });

  /* test disabled */
  it('disabled', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <Rate defaultValue={3} disabled onChange={spy} />
    )
    const stars = wrapper.find('.salus-rate-star');
    stars.at(2).simulate('click');
    expect(spy.called).to.be.false;
  });

  /* test allowClear */
  it('allowClear', () => {
    wrapper = mount(
      <Rate defaultValue={3} allowClear />
    )

    // 点击清空
    const stars = wrapper.find('.salus-rate-star');
    stars.at(2).simulate('click');
    expect(wrapper.find('.salus-rate-star-zero').length).to.equal(5);

    // 不允许清空
    wrapper.setProps({
      allowClear: false,
    });
    stars.at(2).simulate('click');
    expect(wrapper.find('.salus-rate-star-full').length).to.equal(3);
    stars.at(2).simulate('click');
    expect(wrapper.find('.salus-rate-star-full').length).to.equal(3);
  });

  /* test character */
  it('character', () => {
    wrapper = mount(
      <Rate character="A" allowHalf />
    )
    const stars = wrapper.find('.salus-rate-star');
    stars.forEach(star => {
      expect(star.children().at(0).text()).to.equal('A');
      expect(star.children().at(1).text()).to.equal('A');
    });
  });

  /* test style */
  it('style', () => {
    wrapper = mount(
      <Rate style={{ fontSize: 36 }} />
    )
    expect(wrapper.find('.salus-rate').instance().style.fontSize).to.equal('36px');
  });

  /* test count */
  it('count', () => {
    wrapper = mount(
      <Rate count={20} />
    )
    expect(wrapper.find('.salus-rate').children().length).to.equal(20);
  });

})