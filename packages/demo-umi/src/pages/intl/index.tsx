import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, Typography } from 'antd';
import { useIntl } from 'umi';
import { CodePreview } from '@/components';
import styles from './styles.scss';

export default function Intl() {
    const intl = useIntl();

    // https://umijs.org/zh-CN/plugins/plugin-locale
    return (
        <PageContainer>
            <Card>
                <Alert
                    className={styles.alert}
                    message={
                        <Typography.Text>
                            内置{' '}
                            <Typography.Link
                                href='https://umijs.org/zh-CN/plugins/plugin-locale'
                                target='_blank'
                            >
                                @umijs/plugin-locale
                            </Typography.Link>{' '}
                            支持国际化
                        </Typography.Text>
                    }
                    // message='内置 @umijs/plugin-locale 支持国际化'
                    type='success'
                    showIcon
                    banner
                />
                <Typography>
                    <Typography.Paragraph>
                        在配置 <code>.umirc</code> 文件中开启国际化 <code>locale: {`{}`}</code>
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        umi 会自动解析 <code>src/locales</code> 中 <code>zh-CH.ts</code>、
                        <code>en-US.ts</code> 作为国际化配置文件资源
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        在页面中引入 <code>useIntl</code> 即可使用，路由菜单的 name 会自动识别
                        menu.[key] 的配置项
                    </Typography.Paragraph>
                    <Typography.Text type='success'>
                        {intl.formatMessage({
                            id: 'pages.intl.example',
                            defaultMessage: '这段话会随着右上角的语言切换而变化',
                        })}
                    </Typography.Text>
                </Typography>
                <Alert
                    className={styles.warning}
                    message='配置了国际化，menu 会默认把 name 作为 menu.[key] 去 locales 查找，如果希望部分菜单不走国际化，可以在 routes 对应项的 menu 配置 locale: false'
                    type='warning'
                    showIcon
                />
            </Card>
        </PageContainer>
    );
}
