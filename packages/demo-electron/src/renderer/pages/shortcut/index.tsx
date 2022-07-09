import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Shortcut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        alert('[web] You click Control+K');
      }
    };
    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <div className="demo">
      <div>
        <button className="m-10" type="button" onClick={() => navigate('/')}>
          Back
        </button>
        <button className="m-10" type="button">
          Alt+CommandOrControl+I
        </button>
        <button className="m-10" type="button">
          Control+I
        </button>
        <button className="m-10" type="button">
          Control+K
        </button>
      </div>
    </div>
  );
};

export default Shortcut;
