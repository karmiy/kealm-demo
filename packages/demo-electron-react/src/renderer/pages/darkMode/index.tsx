import { useNavigate } from 'react-router-dom';
import './styles.scss';

const DarkMode = () => {
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
            window.electron.darkMode.toggle();
          }}
        >
          toggle dark mode
        </button>
        <button
          className="m-10"
          type="button"
          onClick={() => {
            window.electron.darkMode.system();
          }}
        >
          system dark mode
        </button>
      </div>
    </div>
  );
};

export default DarkMode;
