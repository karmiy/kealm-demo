import { useNavigate } from 'react-router-dom';

const DragFile = () => {
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
          draggable
          onDragStart={(e) => {
            // 阻止默认 browser 拖拽效果
            e.preventDefault();
            window.electron.dragger.start('drag-and-drop.md');
          }}
        >
          drag to browser or folder
        </button>
      </div>
    </div>
  );
};

export default DragFile;
