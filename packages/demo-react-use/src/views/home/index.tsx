import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import './home.scss';
import { IHomeProps } from './interface';

import { useAsync, useAsyncFn } from 'react-use';

type ISex = 'man' | 'woman';

interface IUser {
    id: number;
    name: string;
    sex: 'man' | 'woman';
}

function getUsers(sex: ISex) {
    return new Promise<Array<IUser>>((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'k1', sex },
                { id: 2, name: 'k2', sex },
            ])
        }, 2000);
    });
}

const Home: React.FC<IHomeProps> = () => {
    const [sex, setSex] = useState<ISex>('man');

    const state = useAsync(async () => {
        const response = await getUsers(sex);
        return response;
    }, [sex]);

    console.log(
        state.value,
        state.error,
        state.loading
    );

    return (
        <div className='my-home'>
            <button onClick={() => setSex(s => s === 'man' ? 'woman' : 'man')}>切换用户类型</button>
        </div>
    )
};

export default hot(module)(Home);