import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Button, Card, Form, Input, InputNumber, Spin } from 'antd';
import { useModel } from 'umi';
import styles from './styles.scss';

const LAYOUT = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};

export default function PersonalCenter() {
    const { initialState, loading, refresh, setInitialState } = useModel('@@initialState');
    const { currentUser } = initialState ?? {};

    if (!currentUser || loading) return <Spin />;

    return (
        <PageContainer>
            <Card>
                <Alert
                    className={`${styles.alert} test`}
                    message='全局初始状态 initialState，通常是在整个应用加载前请求用户信息或者一些全局依赖的基础数据'
                    type='success'
                    showIcon
                    banner
                />
                <Form
                    {...LAYOUT}
                    initialValues={{
                        user: {
                            name: currentUser.name,
                            email: currentUser.email,
                            age: currentUser.age,
                            address: currentUser.address,
                            introduction: currentUser.introduction,
                        },
                    }}
                >
                    <Form.Item name={['user', 'name']} label='Name' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label='Email' rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'age']}
                        label='Age'
                        rules={[{ type: 'number', min: 0, max: 99 }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={['user', 'address']} label='Address'>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label='Introduction'>
                        <Input.TextArea autoSize placeholder='请输入个人简介' />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...LAYOUT.wrapperCol, offset: 8 }}>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </PageContainer>
    );
}
