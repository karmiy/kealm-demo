import { useNavigate } from 'react-router-dom';

const DeepLinks = () => {
  const navigate = useNavigate();

  return (
    <div className="demo">
      <div>
        <button className="m-10" type="button" onClick={() => navigate('/')}>
          Back
        </button>
        <button className="m-10" type="button">
          production deep links(react-electron-demo://)
        </button>
      </div>
    </div>
  );
};

export default DeepLinks;
