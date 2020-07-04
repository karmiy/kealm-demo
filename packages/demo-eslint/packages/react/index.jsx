import React, { useState, Component, useEffect } from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        window.addEventListener('click', () => setCount(count + 1));
    }, [count]);

    const { id, children } = props;

    return (
        <div>
            {count}
            {id}
            <p />
            <button
                type='button'
                className='km-button'
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                {children}

            </button>
        </div>
    );
}

Button.propTypes = { id: PropTypes.number };
Button.defaultProps = { id: 1 };

class Wrap extends Component {
    id = 10;

    /** 123 */
    onClick() {
        const { name } = this.props;
        console.log(this.id);
        console.log(name);
    }

    say() {
        console.log(1, this);
    }

    render() {
        return (
            <div>
                wrap:
                {this.id}
            </div>
        );
    }
}

Wrap.propTypes = { name: PropTypes.string.isRequired };

const obj = {
    id: 1,
    name: 'k',
};

console.log(obj);

export {
    Wrap,
    Button,
};