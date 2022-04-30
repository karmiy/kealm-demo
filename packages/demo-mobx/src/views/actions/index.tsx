import React from 'react';
import { sleep } from '@utils/base';
import { Button, Space } from 'antd';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';

class Timer {
    @observable count = 1;

    constructor() {
        // autoBind 为 action 自动绑定 this 指向
        makeAutoObservable(this, {}, { autoBind: true });
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
    async slowAddCount() {
        await sleep();
        // await 后任何操作都不与其同在一个 tick 中，因此它们需要使用 action 包装
        runInAction(() => {
            this.count++;
        });
    }
}

const timer = new Timer();
const { subtractCount } = timer;

export default observer(() => {
    return (
        <div>
            <div>count: {timer.count}</div>
            <Space>
                <Button onClick={() => timer.addCount()}>addCount</Button>
                <Button
                    onClick={() => {
                        // runInAction 会立即执行，旨在让内部执行逻辑处于 action 环境
                        runInAction(() => {
                            timer.count++;
                        });
                    }}
                >
                    addCount(runInAction)
                </Button>
                <Button onClick={() => subtractCount()}>subtractCount(bound)</Button>
                <Button onClick={() => timer.slowAddCount()}>addCount(async)</Button>
            </Space>
        </div>
    );
});
