import React, { useState, useCallback } from 'react';
import { ILinkProps } from './interface';

enum STATUS {
    HOVERED = 'hovered',
    NORMAL = 'normal',
}

const Link: React.FC<ILinkProps> = props => {
    const [className, setClassName] = useState(STATUS.NORMAL);
    const { page = '#', children } = props;

    const onMouseEnter = useCallback(() => setClassName(STATUS.HOVERED), []);

    const onMouseLeave = useCallback(() => setClassName(STATUS.NORMAL), []);

    return (
        <a
            className={className}
            href={page}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </a>
    )
};

export default Link;