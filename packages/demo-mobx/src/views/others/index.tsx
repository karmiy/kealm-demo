import React from 'react';
import { Button, Space, Typography } from 'antd';
import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx';
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
        </Typography>
    );
});
