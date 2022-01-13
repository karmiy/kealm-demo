import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, Typography } from 'antd';
import styles from './styles.scss';

export default function Welcome() {
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
                <Typography.Title className={styles.title} level={2}>
                    <SmileTwoTone /> Everyone <HeartTwoTone twoToneColor='#eb2f96' /> You
                </Typography.Title>
            </Card>
        </PageHeaderWrapper>
    );
}
