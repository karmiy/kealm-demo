import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, Typography } from 'antd';
import { CodePreview } from '@/components';
import styles from './styles.scss';

export default function Welcome() {
    return (
        <PageContainer>
            <Card>
                <Alert
                    className={styles.alert}
                    message='在不同菜单页面练习 umi + ant design pro 配置与组件'
                    type='success'
                    showIcon
                    banner
                />
                <Typography.Text strong>
                    <span>表格 </span>
                    <a
                        href='https://procomponents.ant.design/components/table'
                        rel='noopener noreferrer'
                        target='__blank'
                    >
                        请使用
                    </a>
                </Typography.Text>
                <CodePreview>yarn add @ant-design/pro-table</CodePreview>
                <Typography.Text strong>
                    <span>布局 </span>
                    <a
                        href='https://procomponents.ant.design/components/layout'
                        rel='noopener noreferrer'
                        target='__blank'
                    >
                        请使用
                    </a>
                </Typography.Text>
                <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
            </Card>
        </PageContainer>
    );
}
