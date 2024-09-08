import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ children, onDrop, name }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'HEADER',
    drop: () => onDrop(name),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '200px',
        height: '200px',
        border: '1px solid black',
        margin: '8px',
        backgroundColor: isOver ? 'lightblue' : 'white',
        display: 'inline-block',
        verticalAlign: 'top',
      }}
    >
      {children}
    </div>
  );
};

export default DropZone;
