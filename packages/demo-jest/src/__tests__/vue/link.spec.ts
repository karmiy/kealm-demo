import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Link from '@components/vue/link';

describe('Link', () => {
    it('test snapshot that Link changes the class when hovered', async () => {
        const wrapper = mount(Link, {
            propsData: {
                page: 'https://github.com/karmiy/demo-jest',
            }
        });
        expect(wrapper.element).toMatchSnapshot();

        wrapper.trigger('mouseenter'); // 触发 mouseenter 事件
        await Vue.nextTick(); // 等待 nextTick 渲染
        expect(wrapper.element).toMatchSnapshot();

        wrapper.trigger('mouseleave'); // 触发 mouseenter 事件
        await Vue.nextTick(); // 等待 nextTick 渲染
        expect(wrapper.element).toMatchSnapshot();
    });
});
