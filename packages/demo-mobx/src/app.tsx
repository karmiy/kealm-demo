import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Actions, Computed, DecoratorSyntax, Others, Reactions } from '@views';
import './app.scss';

const { Sider, Content } = Layout;

export default () => {
    // const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === '/' || pathname === '') {
            setSelectedKeys([]);
            return;
        }

        setSelectedKeys([pathname.slice(1)]);
    }, [pathname]);

    return (
        <Layout className='app'>
            <Sider theme='light'>
                <Menu
                    selectedKeys={selectedKeys}
                    items={[
                        {
                            key: 'decorator-syntax',
                            label: <Link to='decorator-syntax'>Decorator Syntax</Link>,
                        },
                        { key: 'actions', label: <Link to='actions'>Actions</Link> },
                        { key: 'computed', label: <Link to='computed'>Computed</Link> },
                        { key: 'reactions', label: <Link to='reactions'>Reactions</Link> },
                        { key: 'others', label: <Link to='others'>Others</Link> },
                    ]}
                />
            </Sider>
            <Layout>
                <Content>
                    <Routes>
                        <Route path='/' element={<Navigate replace to='/decorator-syntax' />} />
                        <Route path='/decorator-syntax' element={<DecoratorSyntax />} />
                        <Route path='/computed' element={<Computed />} />
                        <Route path='/reactions' element={<Reactions />} />
                        <Route path='/others' element={<Others />} />
                        <Route path='/actions' element={<Actions />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};
