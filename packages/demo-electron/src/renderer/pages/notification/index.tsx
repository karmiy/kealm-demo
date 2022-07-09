import { useNavigate } from 'react-router-dom';

const Notification = () => {
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
            // 也可以在 render 进程用 H5 的 Notification
            // 这里示例 electron main 进程提供的 Notification
            window.electron.notification.show({
              title: 'Notification Title',
              body: 'Notification from the main process',
            });
          }}
        >
          send notification
        </button>
      </div>
    </div>
  );
};

export default Notification;
