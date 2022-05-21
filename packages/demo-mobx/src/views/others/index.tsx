import React from 'react';
import { Button, Space, Typography } from 'antd';
import {
    action,
    autorun,
    computed,
    makeObservable,
    observable,
    runInAction,
    toJS,
    transaction,
} from 'mobx';
import { observer } from 'mobx-react';

const { Title, Paragraph, Text, Link } = Typography;

// use class
class Timer {
    count = 1;

    get percentCount() {
        return `${this.count}%`;
    }

    constructor() {
        makeObservable(this, {
            count: observable,
            addCount: action,
            percentCount: computed,
        });
    }

    addCount() {
        this.count++;
    }
}

const timer = new Timer();

// no class
const todoList = observable(['todo-1', 'todo-2']);
runInAction(() => {
    todoList.push(`todo-${todoList.length + 1}`);
});
const addTodo = action(() => {
    todoList.push(`todo-${todoList.length + 1}`);
});

// proxy <=> js
const libArr = observable(['react', 'vue']);

// transaction: 这是一个底层 API，是同步立即执行（通常用 action/runInAction 是更好的选择），做批量更新，在运行结束前不会通知观察者（性能优化的关键）
const itemList = observable(['item-1', 'item-2']);
autorun(() => {
    console.log('item.length', itemList.length);
});

transaction(() => {
    itemList.push(`todo-${itemList.length + 1}`);
    itemList.push(`todo-${itemList.length + 1}`);
});

const addItem = action(() => {
    const size = itemList.length;
    itemList.push(`item-${size + 1}`);
    itemList.push(`item-${size + 2}`);
});

export default observer(() => {
    return (
        <Typography>
            <Title level={2}>Use Class</Title>
            <Paragraph>
                <div>count: {timer.count}</div>
                <div>percentCount: {timer.percentCount}</div>
                <Button onClick={() => timer.addCount()}>addCount</Button>
            </Paragraph>
            <Title level={2}>No Class Observable</Title>
            <Paragraph>
                <div>todoList: {todoList.join(',')}</div>
                <Button onClick={addTodo}>addTodoList</Button>
            </Paragraph>
            <Title level={2}>Proxy {'<=>'} JS</Title>
            <Paragraph>
                <Button
                    onClick={() => {
                        console.log('proxy: ', libArr);
                        console.log('plain: ', toJS(libArr), [...libArr]);
                    }}
                >
                    Log
                </Button>
            </Paragraph>
            <Title level={2}>Transaction</Title>
            <Paragraph>
                <div>itemList: {itemList.join(',')}</div>
                <Button onClick={addItem}>addItem</Button>
            </Paragraph>
        </Typography>
    );
});
