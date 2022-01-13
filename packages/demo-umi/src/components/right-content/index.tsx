import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { SelectLang, useModel } from 'umi';
import AvatarDropdown from './avatar-dropdown';
import styles from './styles.scss';

const RightContent: React.FC = () => {
    const { initialState } = useModel('@@initialState');

    if (!initialState || !initialState.settings) {
        return null;
    }

    return (
        <Space>
            <span
                className={styles.action}
                onClick={() => {
                    window.open('https://pro.ant.design/docs/getting-started');
                }}
            >
                <QuestionCircleOutlined />
            </span>
            <AvatarDropdown />
            <SelectLang className={styles.action} />
        </Space>
    );
};
export default RightContent;
