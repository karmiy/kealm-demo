import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import ConversationManager from './components/ConversationManager';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <ConversationManager />
      </div>
    </ConfigProvider>
  );
};

export default App;
