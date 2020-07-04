import React from 'react';
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from "components/button";

configure({ adapter: new Adapter() })

describe('Button', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = mount(<Button>按钮</Button>);
  })

  /* test is button */
  it('isButton', () => {
    expect(wrapper.find('button').exists()).to.be.true;
  });

  /* test prop type */
  it('type', () => {
    ['primary', 'dashed', 'link', 'danger', 'success'].forEach(type => {
      wrapper.setProps({type});
      expect(wrapper.find('button').hasClass(`salus-button-${type}`)).to.be.true;
    });
  });

  /* test prop disabled */
  it('disabled', () => {
    wrapper.setProps({disabled: true});
    expect(wrapper.find('button').instance().hasAttribute('disabled')).to.be.true;
  });

  /* test prop size */
  it('size', () => {
    ['small', 'middle'].forEach(size => {
      wrapper.setProps({size});
      expect(wrapper.find('button').hasClass(`salus-button-${size}`)).to.be.true;
    });
  });

  /* test prop full */
  it('full', () => {
    wrapper.setProps({full: true});
    expect(wrapper.find('button').hasClass(`salus-button-full`)).to.be.true;
  });
  /* test prop icon */
  it('icon', () => {
    wrapper.setProps({icon: "salus-icon-search-o"});
    expect(wrapper.find('button').contains(<i className={'salus-icon-search-o'}></i>)).to.be.true;
  });

  /* test prop shap */
  it('shap', () => {
    wrapper.setProps({shap: "circle"});
    expect(wrapper.find('button').hasClass(`salus-button-circle`)).to.be.true;
  });

  /* test prop loading */
  it('loading', () => {
    wrapper.setProps({loading: true});
    expect(wrapper.find('button').instance().classList.contains('salus-button-loading')).to.be.true;
  });

  /* test prop click */
  it('click', done => {
    let context = null;
    const fn = () => {
      context = true;
    }
    wrapper.setProps({onClick: fn});
    wrapper.find('button').simulate('click');
    setTimeout(() => {
      expect(context).not.to.be.null;
      done();
    }, 20);
  });

  /* test prop click disabled */
  it('click disabled', done => {
    let context = null;
    const fn = () => {
      context = true;
    }
    wrapper.setProps({onClick: fn, disabled: true});
    wrapper.find('button').simulate('click');
    setTimeout(() => {
      expect(context).to.be.null;
      done();
    }, 20);
  });
})