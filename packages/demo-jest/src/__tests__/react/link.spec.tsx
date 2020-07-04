import React from 'react';
/* 建议将任何呈现和触发组件更新的代码封装到 act() 调用中 */
// https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#testing-hooks
import renderer, { act } from 'react-test-renderer';

/* https://testing-library.com/docs/dom-testing-library */
import { render, fireEvent } from '@testing-library/react';

/* https://enzymejs.github.io/enzyme/ */
/**
 * Enzyme.render 生成 HTML 结构，可用于快照
 * Enzyme.shallow 生成 react tree，只渲染当前组件
 * Enzyme.mount 生成 react tree，渲染当前组件包括子组件
 */
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { Link, CheckboxWithLabel } from '@components/react';


describe('Link', () => {
    /* 快照测试 */
    it('test snapshot that Link changes the class when hovered', async () => {
        const component = renderer.create(
            <Link page='https://github.com/karmiy/demo-jest'>demo-jest</Link>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        act(() => tree?.props.onMouseEnter()); // 需要用 act 包装带副作用的操作，否则 react hooks 的 setXXX 操作会警告
        tree = component.toJSON(); // 触发 onMouseEnter 事件后重新创建 render tree
        expect(tree).toMatchSnapshot();

        act(() => tree?.props.onMouseLeave());
        tree = component.toJSON();  // 触发 onMouseLeave 事件后重新创建 render tree
        expect(tree).toMatchSnapshot();
    });

    /* 测试 react-testing-library */
    it('test with react-testing-library that CheckboxWithLabel changes the text after click', () => {
        const { queryByLabelText, getByLabelText } = render(<CheckboxWithLabel labelOn='On' labelOff='Off' />);

        expect(queryByLabelText(/off/i)).toBeTruthy();
        fireEvent.click(getByLabelText(/off/i));
        expect(queryByLabelText(/on/i)).toBeTruthy();
    });

    /* 测试 enzyme */
    it('test with enzyme that CheckboxWithLabel changes the text after click', () => {
        const checkbox = shallow(<CheckboxWithLabel labelOn='On' labelOff='Off' />);

        expect(checkbox.text()).toEqual('Off');
        checkbox.find('input').simulate('change'); // 触发 change 事件
        expect(checkbox.text()).toEqual('On');
    });
});
