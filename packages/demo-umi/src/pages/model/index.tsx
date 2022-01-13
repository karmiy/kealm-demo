import React from 'react';
import { LikeOutlined, MessageOutlined, SmileTwoTone, StarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProList from '@ant-design/pro-list';
import { Alert, Button, Card, Tag } from 'antd';
import { useModel } from 'umi';
import styles from './styles.scss';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
    <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
    </span>
);

const GenerateButton = () => {
    const { generateSpecialColumn } = useModel('special-column');

    return (
        <Button type='primary' onClick={generateSpecialColumn}>
            新建
        </Button>
    );
};

export default function Model() {
    const { specialColumns } = useModel('special-column');

    return (
        <PageContainer>
            <Card>
                <Alert
                    className={styles.alert}
                    message='src/models 中的文件会作为全局状态管理，可以是 dva 或 hooks'
                    type='success'
                    showIcon
                    banner
                />
                <ProList<{ title: string }>
                    toolBarRender={() => {
                        return [<GenerateButton />];
                    }}
                    itemLayout='vertical'
                    rowKey='id'
                    headerTitle={
                        <div>
                            <SmileTwoTone />
                            <span className={styles.title}>
                                以下专栏列表为全局状态的数据流（数据在离开此页面后依然有效）
                            </span>
                        </div>
                    }
                    dataSource={specialColumns}
                    metas={{
                        title: {},
                        description: {
                            render: (_, __, i) =>
                                specialColumns[i].tags.map(tag => <Tag key={tag}>{tag}</Tag>),
                        },
                        actions: {
                            render: (_, __, i) => [
                                <IconText
                                    icon={StarOutlined}
                                    text={specialColumns[i].star.toString()}
                                    key='list-vertical-star-o'
                                />,
                                <IconText
                                    icon={LikeOutlined}
                                    text={specialColumns[i].like.toString()}
                                    key='list-vertical-like-o'
                                />,
                                <IconText
                                    icon={MessageOutlined}
                                    text={specialColumns[i].message.toString()}
                                    key='list-vertical-message'
                                />,
                            ],
                        },
                        extra: {
                            render: (_: React.ReactNode, __: { title: string }, i: number) => (
                                <img width={272} alt='logo' src={specialColumns[i].extra} />
                            ),
                        },
                        content: {
                            render: (_, __, i) => {
                                return <div>{specialColumns[i].content}</div>;
                            },
                        },
                    }}
                />
            </Card>
        </PageContainer>
    );
}
