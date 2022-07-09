import { useNavigate } from 'react-router-dom';

const Progress = () => {
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
            window.electron.progressBar.start();
          }}
        >
          start progress bar
        </button>
      </div>
    </div>
  );
};

export default Progress;
