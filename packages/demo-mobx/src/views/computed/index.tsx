import React from 'react';
import { Button } from 'antd';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

class Timer {
    @observable count = 1;

    constructor() {
        makeAutoObservable(this);
    }

    @computed
    get percentCount() {
        return `${this.count}%`;
    }

    @action
    addCount() {
        this.count++;
    }
}

const timer = new Timer();

export default observer(() => {
    return (
        <div>
            <div>count: {timer.count}</div>
            <div>percentCount: {timer.percentCount}</div>
            <Button onClick={() => timer.addCount()}>addCount</Button>
        </div>
    );
});
