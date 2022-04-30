import React, { useEffect, useState } from 'react';
import { Button, message, Space, Switch } from 'antd';
import { action, autorun, makeAutoObservable, observable, reaction, when } from 'mobx';
import { observer } from 'mobx-react';

class Timer {
    @observable count = 1;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    addCount() {
        this.count++;
    }

    @action
    subtractCount() {
        this.count--;
    }

    @action
    async fetch() {
        // 没有 effect 参数会返回 promise，这个 promise 在满足条件时才会 resolve 否则一直 pending，直到满足
        await when(() => this.count >= 3);
        message.success(`when - count >= 3`);
    }
}

const timer = new Timer();

export default observer(() => {
    const [autorunEnable, setAutorunEnable] = useState(true);
    const [reactionEnable, setReactionEnable] = useState(true);
    const [whenEnable, setWhenEnable] = useState(true);

    useEffect(() => {
        if (!autorunEnable) return;

        // 初始也会立即执行
        const disposer = autorun(() => {
            message.success(`autorun - count: ${timer.count}`);
        });
        return disposer;
    }, [autorunEnable]);

    useEffect(() => {
        if (!reactionEnable) return;

        const disposer = reaction(
            () => timer.count,
            (cur, prev) => {
                message.success(`reaction - cur count: ${cur}`);
            },
            {
                // fireImmediately: true, // 立即执行
            },
        );
        return disposer;
    }, [reactionEnable]);

    useEffect(() => {
        if (!whenEnable) return;
        const disposer = when(
            // 一旦返回 true，就会执行 effect，并且自动执行器函数将会被清理掉（执行一次不会再执行了）
            () => timer.count >= 3,
            () => {
                message.success(`when - count >= 3`);
            },
        );

        return disposer;
    }, [whenEnable]);

    return (
        <Space direction='vertical'>
            <Space>
                <Button onClick={() => setAutorunEnable(v => !v)}>
                    autorunEnable: {String(autorunEnable)}
                </Button>
                <Button onClick={() => setReactionEnable(v => !v)}>
                    reactionEnable: {String(reactionEnable)}
                </Button>
                <Button onClick={() => setWhenEnable(v => !v)}>
                    whenEnable: {String(whenEnable)}
                </Button>
            </Space>
            <Space>
                <span>count: {timer.count}</span>
                <Button onClick={() => timer.addCount()}>addCount</Button>
                <Button onClick={() => timer.subtractCount()}>subtractCount</Button>
                <Button onClick={() => timer.fetch()}>fetch(no effect when)</Button>
            </Space>
        </Space>
    );
});
