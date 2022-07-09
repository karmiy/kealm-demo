import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import IPC from './pages/ipc';
import MessageChannel from './pages/messageChannel';
import DarkMode from './pages/darkMode';
import Shortcut from './pages/shortcut';
import DeepLinks from './pages/deepLinks';
import DragFile from './pages/dragFile';
import Notification from './pages/notification';
import NetworkLine from './pages/networkLine';
import ProgressBar from './pages/progressBar';

const Hello = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          className="m-10"
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read Docs
          </button>
        </a>
        <a
          className="m-10"
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
      <div className="Hello">
        <button className="m-10" type="button" onClick={() => navigate('ipc')}>
          <span role="img" aria-label="books" aria-hidden="true">
            🎉
          </span>
          IPC Page
        </button>
        <button
          className="m-10"
          type="button"
          onClick={() => navigate('message-channel')}
        >
          <span role="img" aria-label="books" aria-hidden="true">
            🍕
          </span>
          Message Page
        </button>
      </div>
      <div className="Hello">
        <button
          className="m-10"
          type="button"
          onClick={() => navigate('dark-mode')}
        >
          <span role="img" aria-label="books" aria-hidden="true">
            🎏
          </span>
          Dark Mode
        </button>
        <button
          className="m-10"
          type="button"
          onClick={() => navigate('shortcut')}
        >
          <span role="img" aria-label="books" aria-hidden="true">
            🎄
          </span>
          Shortcut
        </button>
      </div>
      <div className="Hello">
        <button
          className="m-10"
          type="button"
          onClick={() => navigate('deep-links')}
        >
          <span role="img" aria-label="books" aria-hidden="true">
            📙
          </span>
          Deep Links
        </button>
        <button
          className="m-10"
          type="button"
          onClick={() => navigate('drag-file')}
        >
          <span role="img" aria-label="books" aria-hidden="true">
            📒
          </span>
          Drag File
        </button>
      </div>
      <div className="Hello">
        <button
          className="m-10"
          type="button"
          onClick={() => navigate('notification')}
        >
          <span role="img" aria-label="books" aria-hidden="true">
            ✉️
          </span>
          Notification
        </button>
        <button
          className="m-10"
          type="button"
          onClick={() => navigate('network-line')}
        >
          <span role="img" aria-label="books" aria-hidden="true">
            📡
          </span>
          NetworkLine
        </button>
      </div>
      <div className="Hello">
        <button
          className="m-10"
          type="button"
          onClick={() => navigate('progress-bar')}
        >
          <span role="img" aria-label="books" aria-hidden="true">
            💿
          </span>
          ProgressBar
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/ipc" element={<IPC />} />
        <Route path="/message-channel" element={<MessageChannel />} />
        <Route path="/dark-mode" element={<DarkMode />} />
        <Route path="/shortcut" element={<Shortcut />} />
        <Route path="/deep-links" element={<DeepLinks />} />
        <Route path="/drag-file" element={<DragFile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/network-line" element={<NetworkLine />} />
        <Route path="/progress-bar" element={<ProgressBar />} />
      </Routes>
    </Router>
  );
}
