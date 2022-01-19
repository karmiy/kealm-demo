import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
); */

function render(props?: Props) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
  );
}

// 非微前端，独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
} else {
  window.__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// console.log('__webpack_public_path__', window.__webpack_public_path__);
// console.log('window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__', window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__);

function destroy() {
  const appEl = document.getElementById('app');
  appEl && ReactDOM.unmountComponentAtNode(appEl);
}

type Props = Record<string, unknown>;

export async function bootstrap(props?: Props): Promise<void> {
  console.log("bootstrap", props);
}
export async function mount(props?: Props): Promise<void> {
  render(props);
}
export async function unmount(props?: Props): Promise<void> {
  destroy();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
