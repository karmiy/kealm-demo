import { useNavigate } from 'react-router-dom';
import { CHANNEL } from '../../../common/constants';

const IPC = () => {
  const navigate = useNavigate();
  return (
    <div className="demo">
      <div>
        <button className="m-10" type="button" onClick={() => navigate('/')}>
          Back
        </button>
        <button
          className="m-10"
          type="button"
          onClick={() => {
            // calling IPC exposed from preload script
            window.electron.ipcRenderer.once(CHANNEL.PING_PONG, (e, arg) => {
              // eslint-disable-next-line no-console
              console.log('[render ipc] ping_pong', arg);
              // 可以通过 e.sender 拿到 EventEmitter，实现在 on 中 render => main
              // e.sender.send('xxx', arg);
            });
            window.electron.ipcRenderer.sendMessage(CHANNEL.PING_PONG, 'ping');
          }}
        >
          start ping-pong
        </button>
      </div>
      <div>
        <button
          className="m-10"
          type="button"
          onClick={async () => {
            const filePath = await window.electron.ipcRenderer.invokeMessage(
              CHANNEL.DIALOG,
              ['']
            );
            console.log('[render ipc] filePath', filePath);
          }}
        >
          open dialog
        </button>
      </div>
    </div>
  );
};

export default IPC;
