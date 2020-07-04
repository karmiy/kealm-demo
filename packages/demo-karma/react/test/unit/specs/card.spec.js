import React from 'react';
import ReactDom from 'react-dom';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Card from "components/card";

configure({ adapter: new Adapter() })

describe('Card', () => {
  let wrapper = null;
  /* test title */
  it('title', () => {
    wrapper = mount(
      <Card
        title={<span className="code-left-line">很秀的标题</span>}
      >
      </Card>
    );
    expect(wrapper.find('.salus-card-head-title').contains(<span className="code-left-line">很秀的标题</span>)).to.be.true;
  });

  /* test style */
  it('style', () => {
    wrapper = mount(
      <Card
        title="style标题"
        style={{ width: 300 }}
      >
      </Card>
    );
    expect(wrapper.props().style.width).to.equal(300);
    expect(ReactDom.findDOMNode(wrapper.instance()).style.width).to.equal('300px');
  });

  /* test extra */
  it('extra', () => {
    wrapper = mount(
      <Card
        title="extra标题"
        extra={<a href="#">更多</a>}
      >
      </Card>
    );
    expect(wrapper.exists('.salus-card-extra')).to.be.true;
    expect(wrapper.contains(<a href="#">更多</a>)).to.be.true;
  });

  /* test bordered */
  it('bordered', () => {
    wrapper = mount(
      <Card
        title="border标题"
        bordered={true}
      >
      </Card>
    );
    expect(wrapper.find('.salus-card').hasClass('salus-card-bordered')).to.be.true;

    wrapper = mount(
      <Card
        title="border标题"
        bordered={false}
      >
      </Card>
    );
    expect(wrapper.find('.salus-card').hasClass('salus-card-bordered')).to.be.false;
  });

  /* test img */
  it('img', () => {
    wrapper = mount(
      <Card
        title="img标题"
        cover={ <img alt="example" src="" /> }
      >
      </Card>
    );
    expect(wrapper.exists('.salus-card-cover')).to.be.true;
    expect(wrapper.contains(<img alt="example" src="" />)).to.be.true;
  });

  /* test Meta */
  it('Meta', () => {
    wrapper = mount(
      <Card
        title="Meta标题"
      >
        <Card.Meta
          description="描述"
          timeInfo="2018-08-08 18:00:00"
          metaExtra={<a href="#">更多</a>}
        />
      </Card>
    );
    expect(wrapper.exists('.salus-card-meta')).to.be.true;
    expect(wrapper.find('.salus-card-meta-description').text()).to.equal("描述");
    expect(wrapper.find('.salus-card-meta-time-info').text()).to.equal("2018-08-08 18:00:00");
    expect(wrapper.find('.salus-card-extra').contains(<a href="#">更多</a>)).to.be.true;
  });

  /* test shadow */
  it('shadow', () => {
    wrapper = mount(
      <Card defaultShadow>
        <p>卡片内容</p>
        <p>卡片内容</p>
        <p>卡片内容</p>
      </Card>
    );
    expect(wrapper.find('.salus-card').hasClass('salus-card-shadow')).to.be.true;
  });

  /* test hoverable */
  it('hoverable', () => {
    wrapper = mount(
      <Card hoverable>
        <p>卡片内容</p>
        <p>卡片内容</p>
        <p>卡片内容</p>
      </Card>
    );
    expect(wrapper.find('.salus-card').hasClass('salus-card-hoverable')).to.be.true;
  });
})