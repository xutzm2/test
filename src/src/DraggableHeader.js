import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableHeader = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'HEADER',
    item: {},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '8px',
        backgroundColor: isDragging ? 'lightgreen' : 'lightgray',
        cursor: 'move',
      }}
    >
      Структура
    </div>
  );
};

export default DraggableHeader;
