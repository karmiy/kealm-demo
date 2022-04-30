import React from 'react';
import { Button } from 'antd';
import { action, makeAutoObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

class Timer {
    // @observable.deep
    // @observable.shallow
    @observable count = 1;

    constructor() {
        // mobx 6 似乎要加这个才行
        makeAutoObservable(this);
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
            <Button onClick={() => timer.addCount()}>addCount</Button>
        </div>
    );
});
