import React from 'react';

export interface ButtonProps {
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = props => {
    const { disabled = false, children } = props;

    return (
        <div className='my-button'>
            <span>{children}</span>
        </div>
    );
}