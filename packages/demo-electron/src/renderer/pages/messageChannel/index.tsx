import { CHANNEL } from 'common/constants';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MessageChannel = () => {
  const navigate = useNavigate();

  const messageChannel = useRef(
    window.electron.messageChannel.get(CHANNEL.MESSAGE_CHANNEL_1)
  ).current;

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
            messageChannel.postMessage('click post message');
            messageChannel.once((mes) => {
              console.log('[render message channel] get message1', mes);
            });
          }}
        >
          post message
        </button>
      </div>
    </div>
  );
};

export default MessageChannel;
