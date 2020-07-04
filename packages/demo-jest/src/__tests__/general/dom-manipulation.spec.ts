import $ from 'jquery';

interface IUser {
    name: string;
    loggedIn: boolean;
}

const fetchCurrentUser = jest.fn().mockImplementation((cb: (user: IUser) => any) => {
    cb({
        name: 'Karmiy',
        loggedIn: true,
    });
});

/**
 * jest 附带 JSDOM 模拟浏览器的 DOM 效果
 */
describe('DOM manipulation', () => {
    /* 测试引入 jpg 图片不报错 */
    it('test displays a user after a click', () => {
        // Set up our document body
        document.body.innerHTML =
            '<div>' +
            '  <span id="username" />' +
            '  <button id="button" />' +
            '</div>';

        // 绑定事件
        $('#button').click(() => {
            fetchCurrentUser((user: IUser) => {
                const loggedText = 'Logged ' + (user.loggedIn ? 'In' : 'Out');
                $('#username').text(user.name + ' - ' + loggedText);
            });
        });

        $('#button').click(); // 触发 click 事件
        expect(fetchCurrentUser).toBeCalled();
        expect($('#username').text()).toEqual('Karmiy - Logged In');
    });
});