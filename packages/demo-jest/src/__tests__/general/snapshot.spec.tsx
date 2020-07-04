import React from 'react';
import renderer from 'react-test-renderer';

/**
 * 为什么要 snapshot 快照
 * 如果我们测试一个配置文件，如 { baseUrl: xxx, ... }，需要 expect(config).toEqual({ baseUrl: xxx, .... })
 * 每次配置文件更改都要重新调整 test 代码
 * 快照可以把我们内容映射一份结果存储起来
 * 对比前后快照，也可以更直观的看出代码或 UI 变化
 * 下次执行 test 时，与快照内容对比，不匹配报错，需要更新快照也可以进行更新
 */

// 第一次执行生成 snapshot 快照
// 之后测试 node 结构与 snapshot 是否一次
// 可以执行 jest --u / --updateSnapshot 更新 snapshot 快照
// -u 会全部更新快照，当希望快照一个个更新，可以先执行 jest --w 监听，然后会提示快照不匹配，这时控制台会提示可以输入下一步要做的，输入 i，就可以循环对每一个不匹配的项进行操作了，如每一个都输入 u 更新

/* mock names */
describe('renders correctly', () => {
    /* 测试 react 渲染节点内容是否匹配 */
    it('test innerText of wrap is "contents"', () => {
        const node = (
            <div className='wrap'>
                <p>contents</p>
            </div>
        )
        const tree = renderer
            .create(node)
            .toJSON();
        expect(tree).toMatchSnapshot();
        // expect(tree).toMatchInlineSnapshot();
    });

    /* 测试指定属性的类型是否匹配 */
    it('test createdAt is a date type and id is a number type', () => {
        const user = {
            createdAt: new Date(),
            id: Math.floor(Math.random() * 20),
            name: 'LeBron James CV',
        };

        // 匹配看是否属性类型匹配，createdAt 为 Date 类型，id 为 Number 类型
        expect(user).toMatchSnapshot({
            createdAt: expect.any(Date),
            id: expect.any(Number),
        });
    });
});
