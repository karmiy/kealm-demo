import React from 'react';
import { hot } from 'react-hot-loader';
import './product.scss';
import { IProductProps } from './interface';

const Product: React.FC<IProductProps> = props => {
    
    return (
        <div className='my-product'>
            321
        </div>
    )
};

export default hot(module)(Product);