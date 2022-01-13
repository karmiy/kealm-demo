import { stringify } from 'querystring';
import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { history, useModel } from 'umi';
import { outLogin } from '@/services/user';
// import { outLogin } from '@/services/ant-design-pro/api';
// import HeaderDropdown from '../HeaderDropdown';
import styles from './styles.scss';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
    // await outLogin();
    console.log(history.location);
    const { query = {}, search, pathname } = history.location;
    const { redirect } = query;
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
            pathname: '/login',
            search: stringify({
                redirect: pathname + search,
            }),
        });
    }
};

const AvatarDropdown: React.FC = () => {
    const { initialState, setInitialState } = useModel('@@initialState');

    const onMenuClick = useCallback(
        (event: MenuInfo) => {
            const { key } = event;
            if (key === 'logout') {
                setInitialState(s => ({ ...s, currentUser: undefined } as any));
                loginOut();
                return;
            }
            history.push(`/${key}`);
        },
        [setInitialState],
    );

    const loading = (
        <span>
            <Spin size='small' className={styles.spin} />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const { currentUser } = initialState;

    if (!currentUser || !currentUser.name) {
        return loading;
    }

    const menuHeaderDropdown = (
        <Menu selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key='logout'>
                <LogoutOutlined />
                退出登录
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menuHeaderDropdown}>
            <span className={styles.action}>
                <Avatar
                    className={styles.avatar}
                    size='small'
                    src={currentUser.avatar}
                    alt='avatar'
                />
                <span>{currentUser.name}</span>
            </span>
        </Dropdown>
    );
};

export default AvatarDropdown;
