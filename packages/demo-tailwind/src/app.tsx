import React from 'react';
import './app.scss';

// const isDev = process.env.NODE_ENV === 'development';

const App: React.FC = () => {
    return (
        <div className='my-app flow-root'>
            <h1>???</h1>
            <div className='my-app__content hover:bg-purple-700'>app</div>
        </div>
    );
};

export default App;
