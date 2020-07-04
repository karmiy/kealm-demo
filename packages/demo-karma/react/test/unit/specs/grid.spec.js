import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Row, Col } from "components/grid";

configure({ adapter: new Adapter() })

describe('Grid', () => {
  let wrapper = null;
  /* test basic */
  it('basic', () => {
    const span = [12, 8, 6][Math.random()*3 | 0];
    wrapper = mount(
      <Row>
        {
          Array(24/span).fill(1).map((item, index) =>
            <Col key={index} span={span}>col</Col>
          )
        }
      </Row>
    )
    expect(wrapper.exists('.salus-row') && wrapper.exists(`.salus-col-${span}`)).to.be.true;
  });

  /* test gutter */
  it('gutter', () => {
    const power = Math.random()*20 | 0 + 1, gutter = power * 2;
    wrapper = mount(
      <Row gutter={gutter}>
        <Col span={6}><div className="gutter-box salue-panel">col-6</div></Col>
        <Col span={6}><div className="gutter-box salue-panel">col-6</div></Col>
        <Col span={6}><div className="gutter-box salue-panel">col-6</div></Col>
        <Col span={6}><div className="gutter-box salue-panel">col-6</div></Col>
      </Row>
    )
    expect(wrapper.find('.salus-row').prop('style').marginLeft).to.equal(-power);
    expect(wrapper.find('.salus-row').prop('style').marginRight).to.equal(-power);
    wrapper.find('.salus-col-6').forEach(wrap => {
      expect(wrap.prop('style').paddingLeft).to.equal(power);
      expect(wrap.prop('style').paddingRight).to.equal(power);
    });
  });

  /* test flex justify */
  it('flex justify', () => {
    const justyfy = ['start', 'center', 'end', 'space-between', 'space-around'][Math.random()*5 | 0];
    wrapper = mount(
      <Row type='flex' justify={justyfy}>
        <Col span={4}><div className="salue-panel">col-4</div></Col>
        <Col span={4}><div className="salue-panel">col-4</div></Col>
        <Col span={4}><div className="salue-panel">col-4</div></Col>
        <Col span={4}><div className="salue-panel">col-4</div></Col>
      </Row>
    )
    expect(wrapper.exists('.salus-row-flex') && wrapper.exists(`.salus-row-flex-${justyfy}`)).to.be.true;
  });

  /* test flex align */
  it('flex align', () => {
    const align = ['top', 'middle', 'bottom'][Math.random()*3 | 0];
    wrapper = mount(
      <Row type='flex' justify='center' align={align}>
        <Col span={4}><div className="salue-panel" style={{height: 100}}>col-4</div></Col>
        <Col span={4}><div className="salue-panel" style={{height: 50}}>col-4</div></Col>
        <Col span={4}><div className="salue-panel" style={{height: 120}}>col-4</div></Col>
        <Col span={4}><div className="salue-panel" style={{height: 80}}>col-4</div></Col>
      </Row>
    )
    expect(wrapper.exists('.salus-row-flex') && wrapper.exists(`.salus-row-flex-${align}`)).to.be.true;
  });

  /* test flex order */
  it('flex order', () => {
    wrapper = mount(
      <Row>
        <Col span={6} order={4}><div className="salue-panel">1 col-order-4</div></Col>
        <Col span={6} order={3}><div className="salue-panel">2 col-order-3</div></Col>
        <Col span={6} order={2}><div className="salue-panel">3 col-order-2</div></Col>
        <Col span={6} order={1}><div className="salue-panel">4 col-order-1</div></Col>
      </Row>
    )
    const cols = wrapper.find('.salus-col-6');
    expect(cols.at(0).hasClass('salus-col-order-4')).to.be.true;
    expect(cols.at(1).hasClass('salus-col-order-3')).to.be.true;
    expect(cols.at(2).hasClass('salus-col-order-2')).to.be.true;
    expect(cols.at(3).hasClass('salus-col-order-1')).to.be.true;
  });

  /* test media */
  it('media', () => {
    const medias = [
      {xs: 2, sm: 4, md: 6, lg: 8, xl: 10},
      {xs: 20, sm: 16, md: 12, lg: 8, xl: 4},
      {xs: 2, sm: 4, md: 6, lg: 8, xl: 10},
    ];
    wrapper = mount(
      <Row>
        {
          medias.map((item, index) => (
            <Col key={index} xs={item.xs} sm={item.sm} md={item.md} lg={item.lg} xl={item.xl}><div className="salue-panel">Col</div></Col>
          ))
        }
      </Row>
    )
    wrapper.find('.salus-row').children().forEach((col, index) => {
      expect(col.exists(`.salus-col-xs-${medias[index].xs}`)).to.be.true;
      expect(col.exists(`.salus-col-sm-${medias[index].sm}`)).to.be.true;
      expect(col.exists(`.salus-col-md-${medias[index].md}`)).to.be.true;
      expect(col.exists(`.salus-col-lg-${medias[index].lg}`)).to.be.true;
      expect(col.exists(`.salus-col-xl-${medias[index].xl}`)).to.be.true;
    });
  });
})