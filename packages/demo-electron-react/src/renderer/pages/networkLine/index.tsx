import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkLine = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // 但不能总是假设 true 值意味着 Electron 可以访问互联网
    // 如当计算机运行的虚拟化软件时，虚拟以太网适配器处于 "always connected" 状态
    // 因此，如果想要确定 Electron 的互联网访问状态，应该为此检查进行额外的开发
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <div className="demo">
      <div>
        <button className="m-10" type="button" onClick={() => navigate('/')}>
          Back
        </button>
        <button className="m-10" type="button">
          networkLine: {isOnline ? 'online' : 'offline'}
        </button>
      </div>
    </div>
  );
};

export default NetworkLine;
