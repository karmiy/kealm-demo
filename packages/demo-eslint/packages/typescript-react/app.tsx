import * as React from 'react';

const { useState } = React;

interface IButtonProps {
    id: number;
    name: string;
}

const list: Array<number> = [10, 20, 30];

const Button: React.SFC<IButtonProps> = props => {
    const [count, setCount] = useState<number>(0);
    const {
        id,
        name,
    } = props;

    return (
        <div>
            <p>123</p>
            <p>id: {id}</p>
            <p>name: {name}</p>
            <p>
                count:
                {' '}
                {count}
            </p>
            {list.map(item => <p key={item}>{item}</p>)}
            <button type='button' onClick={() => setCount(count + 1)}>点击</button>
        </div>
    );
};

export default Button;
