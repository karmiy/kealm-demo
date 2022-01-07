import { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { useModel, useParams } from 'umi';
import styles from './styles.less';

export default function DetailPage() {
    const params = useParams<{ id: string }>();
    const model = useModel('@@initialState');

    /* useEffect(() => {
        axios.get<{ id: number }>('/api/users/1').then(res => {
            console.log('/api/users/1', res.data.id);
        });
    }, []); */
    const getUserInfo = () => {
        axios({
            url: '/api/user/get',
            params: { id: params.id },
        }).then(res => {
            console.log('/api/user/get', res.data);
        });
    };

    const getUserList = () => {
        axios({
            url: '/api/user/list',
        }).then(res => {
            console.log('/api/user/list', res.data);
        });
    };

    return (
        <div>
            <h1 className={styles.title}>Detail index:{params.id}</h1>
            <Button onClick={getUserInfo}>Get User Info</Button>
            <Button onClick={getUserList}>Get User List</Button>
        </div>
    );
}
