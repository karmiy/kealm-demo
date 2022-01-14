import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, Typography } from 'antd';
import styles from './styles.scss';

export default function Theme() {
    return (
        <PageContainer>
            <Card>
                <Alert
                    className={styles.alert}
                    message={
                        <Typography.Text>
                            框架支持
                            <Typography.Link
                                href='https://pro.ant.design/zh-CN/docs/dynamic-theme'
                                target='_blank'
                            >
                                动态主题
                            </Typography.Link>
                        </Typography.Text>
                    }
                    // message='内置 @umijs/plugin-locale 支持国际化'
                    type='success'
                    showIcon
                    banner
                />
                <Typography>
                    <Typography.Paragraph>
                        在配置 <code>.umirc</code> 文件中开启变量{' '}
                        <code>theme: {`{ 'root-entry-name': 'variable', }`}</code>
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        全局样式 global.less 中加入{' '}
                        <code>@import '~antd/es/style/variable.less';</code>
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        可以在 js 代码中通过 <code>ConfigProvider</code> 配置主题
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        开发环境可以在右侧小齿轮动态设置体验
                    </Typography.Paragraph>
                </Typography>
            </Card>
        </PageContainer>
    );
}
