import React from 'react';
import './app.scss';

// const isDev = process.env.NODE_ENV === 'development';

const App: React.FC = () => {
    return (
        <div className='my-app'>
            <h1 className='bar'>???</h1>
            <div className='my-app__content hover:bg-purple-700'>app</div>
            <button>按钮</button>
            <p className='popover popover-20'>popover</p>
            <p className='full md:full'>max</p>
            <div className='hover:filter-grayscale focus:filter-grayscale' />
            <p className='text-red-100'>spacing</p>
            <div className='flex-auto text-k-100'>flex</div>
        </div>
    );
};

export default App;
