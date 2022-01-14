import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, Typography } from 'antd';
import { Access, useAccess } from 'umi';
import styles from './styles.scss';

export default function Admin() {
    const access = useAccess();
    console.log(access);

    return (
        <PageHeaderWrapper content='这个页面只有管理员可以看到'>
            <Card>
                <Alert
                    className={styles.alert}
                    message='配置 access 限制页面可访问权限'
                    type='success'
                    showIcon
                    banner
                />
                <Access accessible={access.canUpdate} fallback={<div>Can not read content.</div>}>
                    <Typography.Title className={styles.title} level={2}>
                        <SmileTwoTone /> Everyone <HeartTwoTone twoToneColor='#eb2f96' /> You
                    </Typography.Title>
                </Access>
            </Card>
        </PageHeaderWrapper>
    );
}
