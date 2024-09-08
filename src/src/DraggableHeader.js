import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableHeader = ({ onRemove }) => {
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
        position: 'relative',
      }}
    >
      <span>Структура</span>
      <button
        onClick={onRemove}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          textAlign: 'center',
          lineHeight: '20px',
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>
  );
};

export default DraggableHeader;
