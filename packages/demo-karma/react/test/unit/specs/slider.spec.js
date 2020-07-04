import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Slider from "components/slider";
import InputNumber from "components/input-number";

configure({ adapter: new Adapter() })

describe('Slider', () => {
  let wrapper = null;

  /* test basic */
  it('basic', () => {
    wrapper = mount(
      <Slider defaultValue={10} min={5} max={20} />
    );
    // slider组件实例(createSlider级)
    const sliderInstance = wrapper.children().at(0).instance();
    expect(sliderInstance.state.value).to.equal(10);

    // max min
    wrapper.setProps({
      value: 30
    });
    expect(sliderInstance.state.value).to.equal(20);
    wrapper.setProps({
      value: 1
    });
    expect(sliderInstance.state.value).to.equal(5);
  });

  /* test onChange with InputNumber */
  it('onChange with InputNumber', () => {
    const spy = sinon.spy();
    const Container = class Container extends React.Component {
      state = {
        value: 10,
      }
      onChange = (value) => {
        spy(value);
        this.setState({
          value,
        })
      }
      render() {
        return (
          <div className={'container'}>
            <Slider value={this.state.value} min={1} max={20} onChange={this.onChange} />
            <InputNumber min={1} max={20} value={this.state.value} onChange={this.onChange} />
          </div>
        )
      }
    }
    wrapper = mount(
      <Container />
    );
    const containerWrapper = wrapper.children().at(0),
          sliderWrapper = containerWrapper.children().at(0),
          inputNumberWrapper = containerWrapper.children().at(1);

    // 当前值为10
    const sliderInstance = sliderWrapper.children().at(0).instance();
    expect(sliderInstance.state.value).to.equal(10);

    // inputNumber驱动value变化
    const arrows = inputNumberWrapper.find('.salus-input-number-handler-wrap').children();
    arrows.at(0).simulate('mousedown');

    expect(sliderInstance.state.value).to.equal(11);
    expect(spy.called).to.be.true;

    // 滑块驱动value变化
    sliderInstance.props.onChange(20);
    expect(inputNumberWrapper.find('input').instance().value).to.equal('20');
    expect(spy.args[1][0]).to.equal(20);
  });

  /* test disabled */
  it('disabled', () => {
    wrapper = mount(
      <Slider defaultValue={10} disabled min={1} max={20} />
    );
    expect(wrapper.find('.salus-slider').hasClass('salus-slider-disabled')).to.be.true;
  });

  /* test tipFormatter */
  it('tipFormatter', () => {
    wrapper = mount(
      <Slider defaultValue={30} tipFormatter={null} />
    );
    wrapper.instance().setState({
      visibles: { 0: true }
    });

    // tipFormatter为null时不会在document.body加tip DIV
    expect(document.querySelector('.salus-tooltip')).to.be.null;
    wrapper.setProps({
      tipFormatter: value => `${value}M`
    })
    expect(document.querySelector('.salus-tooltip')).to.not.be.null;
    expect(document.querySelector('.salus-tooltip-inner').innerText).to.equal('30M');
  });

  /* test range slider */
  it('range slider', () => {
    wrapper = mount(
      <Slider range defaultValue={[20, 50]} />
    );
    // 左右2个handle
    const handles = wrapper.find('div.salus-slider-handle');
    expect(handles.at(0).instance().style.left).to.equal('20%');
    expect(handles.at(1).instance().style.left).to.equal('50%');

    // range滑块wrapper
    const rangeWrapper = wrapper.children().at(0);
    rangeWrapper.setState({
      bounds: [10, 70],
    });
    expect(handles.at(0).instance().style.left).to.equal('10%');
    expect(handles.at(1).instance().style.left).to.equal('70%');
  });

  /* test vertical */
  it('vertical', () => {
    wrapper = mount(
      <Slider vertical defaultValue={30} />
    );
    expect(wrapper.find('.salus-slider').hasClass('salus-slider-vertical')).to.be.true;
    const trackInstance = wrapper.find('div.salus-slider-track').instance(),
          handleInstance = wrapper.find('div.salus-slider-handle').instance();
    expect(trackInstance.style.height).to.equal('30%');
    expect(trackInstance.style.bottom).to.equal('0%');
    expect(handleInstance.style.bottom).to.equal('30%');
  });

})