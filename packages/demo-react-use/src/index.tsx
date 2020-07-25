import { AppContainer } from "react-hot-loader";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const cancelLifecyclesWarning = () => {
    const _warn = console.warn;
    const lifecyclesWarnReg = /^Warning: (componentWillMount|componentWillReceiveProps|componentWillUpdate) has been renamed/;

    console.warn = function(mes: any, ...data: any[]) {
        if(typeof mes === 'string' && lifecyclesWarnReg.test(mes)) return;

        _warn.call(console, mes, ...data);
    }
}
process.env.NODE_ENV === 'development' && cancelLifecyclesWarning(); 

function render(Component: React.ComponentType) {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("app")
    );
}

render(App);

if(module.hot) {
    module.hot.accept('./app', () => {
        const _App = require('./app').default;
        render(_App);
    });
}