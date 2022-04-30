import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Basic } from '@views';
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
        <Layout>
            <Sider theme='light'>
                <Menu
                    selectedKeys={selectedKeys}
                    items={[{ key: 'basic', label: <Link to='basic'>Basic</Link> }]}
                />
            </Sider>
            <Layout>
                <Content>
                    <Routes>
                        <Route path='/' element={<Navigate replace to='/basic' />} />
                        <Route path='/basic' element={<Basic />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};
