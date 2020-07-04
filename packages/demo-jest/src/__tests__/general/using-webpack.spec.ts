/**
 * jest.config.js 提供了一些属性对应 webpack 里的配置
 * 
 * 资源加载:
 * jest 似乎认为资源、样式等在测试中无足轻重，在引入时让它不报错即可
 * 处理静态资源，如图片，使用 moduleNameMapper 将路径指向一个空文件
 * 处理静态资源，还可以自定义 transform 配置，不过需要注意的是，transform 的话需要路径下真的能引入该资源，如 import './a.png'，那旁边没有 a.png 图片的话会报错
 * 处理样式 css，使用 identity-obj-proxy 模拟，会原样返回样式
 * 
 * 配置项:
 * moduleFileExtensions 相当于 webpack resolve.extensions
 * moduleDirectories 相当于 webpack resolve.modules
 * moduleNameMapper 还可以配置 webpack 的 alias 别名
 */

describe('using with webpack ', () => {
    /* 测试引入 jpg 图片不报错 */
    it('test import jpg', () => {
        const jpg = require('a.jpg');
        expect(jpg).toEqual({});
    });

    /* 测试引入 png 图片不报错 */
    it('test import png', () => {
        const logo = require('@imgs/logo.png');
        expect(logo).toBe('logo.png');
    });

    /* 测试引入样式不报错 */
    it('test import style', () => {
        const styleObj = require('./a.css');
        expect(styleObj.foo).toBe('foo');
    });
});