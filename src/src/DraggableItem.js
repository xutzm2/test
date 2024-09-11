import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ type, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { type, id }, // Передаем id вместе с типом
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'lightgrey',
        padding: '8px',
        margin: '8px',
        cursor: 'move',
        width: '100px',
        textAlign: 'center',
      }}
    >
      {`Перетащи ${type}`}
    </div>
  );
};

export default DraggableItem;
