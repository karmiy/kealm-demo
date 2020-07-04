import React from 'react';
import ReactDom from 'react-dom';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Input from "components/input";

configure({ adapter: new Adapter() })

describe('Button', () => {
  let wrapper = null;

  /* test basic input */
  it('basic', () => {
    wrapper = mount(
      <Input placeholder="Basic usage" value="myInput" />
    )
    const input = wrapper.find('input').instance();
    expect(input.classList.contains('salus-input')).to.be.true;
    expect(input.getAttribute('placeholder')).to.equal('Basic usage');
    expect(input.value).to.equal('myInput');
  });

  /* test defaultValue */
  it('defaultValue', () => {
    wrapper = mount(
      <Input placeholder="Basic usage" defaultValue="myInput" />
    )
    expect(wrapper.find('input').instance().value).to.equal('myInput');
  });

  /* test size */
  it('size', () => {
    wrapper = mount(
      <Input size="large" placeholder="large size" />
    )
    expect(wrapper.hasClass('salus-input-lg'));
    wrapper.setProps({
      size: 'middle'
    })
    expect(wrapper.hasClass('salus-input-md'));
    wrapper.setProps({
      size: 'small'
    })
    expect(wrapper.hasClass('salus-input-sm'));
  });

  /* test addonBefore addonAfter */
  it('addonBefore addonAfter', () => {
    wrapper = mount(
      <Input addonBefore="Http://" addonAfter=".com" />
    )
    //console.log(wrapper.find('.salus-input-group-addon'));
    expect(wrapper.find('.salus-input-group-addon').at(0).contains('Http://')).to.be.true;
    expect(wrapper.find('.salus-input-group-addon').at(1).contains('.com')).to.be.true;
    wrapper.setProps({
      addonAfter: <i className="salus-icon-setting-o" />
    })
    expect(wrapper.find('.salus-input-group-addon').at(1).contains(<i className="salus-icon-setting-o" />)).to.be.true;
  });

  /* test input group basic */
  it('input group basic', () => {
    wrapper = mount(
      <Input.Group>
        <Input style={{ width: '20%' }} defaultValue="0571" />
        <Input style={{ width: '30%' }} defaultValue="26888888" />
      </Input.Group>
    )
    expect(wrapper.exists('.salus-input-group')).to.be.true;
    expect(wrapper.exists('.salus-input-group-inner-container')).to.be.true;
    expect(wrapper.find('input').length === 2).to.be.true;
    expect(wrapper.find('input').at(0).instance().value === '0571').to.be.true;
    expect(wrapper.find('input').at(0).instance().style.width === '20%').to.be.true;
    expect(wrapper.find('input').at(1).instance().value === '26888888').to.be.true;
    expect(wrapper.find('input').at(1).instance().style.width === '30%').to.be.true;
  });

  /* test input group compact */
  it('input group compact', () => {
    wrapper = mount(
      <Input.Group compact>
        <Input style={{ width: '20%' }} defaultValue="0571" />
        <Input style={{ width: '30%' }} defaultValue="26888888" />
      </Input.Group>
    )
    expect(wrapper.find('.salus-input-group').hasClass('salus-input-group-compact')).to.be.true;
  });

  /* test input search basic */
  it('input search basic', () => {
    const spy = sinon.spy();
    wrapper = mount(
      <Input.Search
        placeholder="input search text"
        onSearch={spy}
      />
    )
    expect(wrapper.exists('.salus-input-search')).to.be.true;
    expect(wrapper.exists('.salus-input-affix-wrapper')).to.be.true;
    expect(wrapper.find('.salus-input-suffix').exists('.salus-icon-search-o')).to.be.true;

    wrapper.find('input').instance().value = 'search input';
    wrapper.find('.salus-icon-search-o').simulate('click');
    expect(spy.called).to.be.true;
    expect(spy.firstCall.args[0]).to.equal('search input');
    wrapper.children().at(0).instance().focus();
    wrapper.children().at(0).instance().handleKeyDown({keyCode: 13});
    expect(spy.callCount).to.equal(2);
  });

  /* test input search enterButton */
  it('input search enterButton', () => {
    wrapper = mount(
      <Input.Search
        placeholder="input search text"
        enterButton
      />
    )
    const button = wrapper.find('.salus-input-suffix').find('button')
    expect(button.hasClass('salus-button')).to.be.true;
    expect(button.hasClass('salus-input-search-button')).to.be.true;
    expect(button.hasClass('salus-button-primary')).to.be.true;
    expect(button.exists('.salus-icon-search-o')).to.be.true;

    wrapper.setProps({
      enterButton: 'Search'
    })
    expect(button.text()).to.equal('Search');
  });

  /* test textarea autosize */
  it('textarea autosize', done => {
    const textareaValue= 'sda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasd';
    let textareaBasic = null, textareaLimit = null
    wrapper = (
      <div>
        <Input.TextArea ref={area => textareaBasic = area} placeholder="Autosize height based on content lines" defaultValue={textareaValue} autosize />
        <Input.TextArea ref={area => textareaLimit = area} placeholder="Autosize height with minimum and maximum number of lines" defaultValue={textareaValue} autosize={{ minRows: 2, maxRows: 6 }} />
      </div>
    )
    const app = document.createElement('div');
    document.body.appendChild(app);
    ReactDom.render(wrapper, app);
    expect(textareaBasic.state.textareaStyles.height).to.equal(169);
    expect(textareaLimit.state.textareaStyles.height).to.equal(115);
    textareaLimit.textAreaRef.value = textareaBasic.textAreaRef.value = '';
    setTimeout(() => {
      expect(textareaBasic.textAreaRef.offsetHeight).to.equal(80);
      expect(textareaLimit.textAreaRef.offsetHeight).to.equal(43);
      done();
    }, 200);
  });

  /* test input group limitCount */
  it('input group limitCount', () => {
    const text = '1234567890abcde';
    wrapper = mount(
      <div>
        <Input.Group limitCount={10}>
          <Input.TextArea placeholder="limit count 10" defaultValue={text} />
        </Input.Group>
        <Input.Group limitCount={10}>
          <Input placeholder="limit count 10" defaultValue={text} />
        </Input.Group>
      </div>
    )
    const textarea = wrapper.find('textarea').instance(),
          input = wrapper.find('input').instance();
    expect(textarea.getAttribute('maxlength')).to.equal('10');
    expect(input.getAttribute('maxlength')).to.equal('10');
    expect(textarea.value.length).to.equal(10);
    expect(input.value.length).to.equal(10);
  });

  /* test prefix suffix */
  it('prefix suffix', () => {
    wrapper = mount(
      <Input
        placeholder="Enter your username"
        defaultValue="input info"
        prefix={<i className='salus-icon-account-o' />}
        suffix={<i className='salus-icon-error-msg-o' />}
      />
    )
    expect(wrapper.find('.salus-input-prefix').contains(<i className='salus-icon-account-o' />)).to.be.true;
    expect(wrapper.find('.salus-input-suffix').contains(<i className='salus-icon-error-msg-o' />)).to.be.true;
  });
})