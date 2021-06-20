import React, { useState } from 'react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import './app.scss';

const C1: React.FC = () => {
    const isT = Math.random() > 0.5;
    const isT2 = Math.random() > 0.5;

    return (
        <div
            className={
                isT
                    ? css({
                          display: 'flex',
                          backgroundColor: isT2 ? 'pink' : 'yellow',
                          '&:hover': {
                              color: 'red',
                          },
                      })
                    : css({
                          backgroundColor: 'blue',
                          '&:hover': {
                              color: 'skyblue',
                          },
                      })
            }
        >
            C1
        </div>
    );
};

const C2 = styled.div<{ color: string }>(({ color }) => {
    const isT = Math.random() > 0.5;
    const isT2 = Math.random() > 0.5;

    return {
        display: 'flex',
        color,
    };
});

const C3 = styled.div<{ color: string }>(({ color }) => {
    return {
        display: 'flex',
        color,
    };
});

const App: React.FC = () => {
    const [v1, setV1] = useState(false);
    const [v2, setV2] = useState(false);
    return (
        <div>
            <button onClick={() => setV1(v => !v)}>切换 C1</button>
            <button onClick={() => setV2(v => !v)}>切换 C2</button>
            {v1 && <C1 />}
            {v2 && (
                <>
                    <C2 color='skyblue'>C2</C2>
                    <C3 color='skyblue'>C2</C3>
                </>
            )}
        </div>
    );
};

export default App;
