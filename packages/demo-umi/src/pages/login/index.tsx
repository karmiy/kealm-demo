import { useState } from 'react';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { message, Space, Tabs } from 'antd';
import { history, useModel } from 'umi';
import { login } from '@/services/user';
import { LoginType } from './types';
import styles from './styles.scss';

export default function LoginPage() {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const { initialState, setInitialState } = useModel('@@initialState');

    /* 请求并更新用户信息 */
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            // 更新全局状态
            await setInitialState(
                s =>
                    ({
                        ...s,
                        currentUser: userInfo,
                    } as any),
            );
        }
    };

    /* 提交 */
    const handleSubmit = async (values: ApiNS.LoginParams) => {
        try {
            // 登录
            const msg = await login({ ...values, type: loginType });
            if (msg.status === 'ok') {
                message.success('登录成功！');
                await fetchUserInfo();

                /** 此方法会跳转到 redirect 参数所在的位置 */
                if (!history) return;
                const { query } = history.location;
                const { redirect } = query as { redirect: string };
                history.push(redirect || '/');
                return;
            }

            message.error(msg.message || '登录失败，请重试！');
        } catch (error) {
            message.error('登录失败，请重试！');
        }
    };

    return (
        <LoginForm
            logo='https://github.githubassets.com/images/modules/logos_page/Octocat.png'
            title='Kealm'
            subTitle='全球最大的管理后台'
            actions={
                <Space>
                    其他登录方式
                    <AlipayCircleOutlined className={styles.icon} />
                    <TaobaoCircleOutlined className={styles.icon} />
                    <WeiboCircleOutlined className={styles.icon} />
                </Space>
            }
            onFinish={async values => {
                await handleSubmit(values as ApiNS.LoginParams);
            }}
        >
            <Tabs
                activeKey={loginType}
                onChange={activeKey => setLoginType(activeKey as LoginType)}
            >
                <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                <Tabs.TabPane key={'mobile'} tab={'手机号登录'} />
            </Tabs>
            {loginType === 'account' && (
                <>
                    <ProFormText
                        name='username'
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'用户名: karmiy/karloy/test'}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name='password'
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'密码: 123456'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </>
            )}
            {loginType === 'mobile' && (
                <>
                    <ProFormText
                        fieldProps={{
                            size: 'large',
                            prefix: <MobileOutlined className={'prefixIcon'} />,
                        }}
                        name='mobile'
                        placeholder={'188888888'}
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式错误！',
                            },
                        ]}
                    />
                    <ProFormCaptcha
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        captchaProps={{
                            size: 'large',
                        }}
                        placeholder={'请输入验证码'}
                        captchaTextRender={(timing, count) => {
                            if (timing) {
                                return `${count} ${'获取验证码'}`;
                            }
                            return '获取验证码';
                        }}
                        name='captcha'
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码！',
                            },
                        ]}
                        onGetCaptcha={async () => {
                            message.success('获取验证码成功！验证码为：1234');
                        }}
                    />
                </>
            )}
            <div className={styles.additional}>
                <ProFormCheckbox noStyle name='autoLogin'>
                    自动登录
                </ProFormCheckbox>
                <a className={styles.forget}>忘记密码</a>
            </div>
        </LoginForm>
    );
}
