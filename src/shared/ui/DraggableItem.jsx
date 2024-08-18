// src/shared/ui/DraggableItem.jsx
import { useDrag } from 'react-dnd';

const DraggableItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'block',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`menu-item ${isDragging ? 'dragging' : ''}`}>
      {label}
    </div>
  );
};

export default DraggableItem;
