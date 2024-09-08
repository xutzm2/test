import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';

const ItemType = 'ITEM';

const DroppableColumn = ({ id, items = [], onDrop, onRemove, onClone }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item) => onDrop(item.id, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        padding: '8px',
        margin: '4px',
        minHeight: '100px',
        border: '1px dashed #ccc',
        backgroundColor: isOver ? '#fff1b8' : '#fafafa',
        position: 'relative',
      }}
    >
      {items.map((item) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <DraggableItem id={item.id} content={item.content} />
          <div>
            <button
              onClick={() => onClone(item.id)}
              style={{
                marginLeft: '8px',
                border: 'none',
                background: 'transparent',
                color: 'blue',
                cursor: 'pointer',
                fontSize: '16px',
                lineHeight: '1',
              }}
            >
              ✚
            </button>
            <button
              onClick={() => onRemove(item.id)}
              style={{
                marginLeft: '8px',
                border: 'none',
                background: 'transparent',
                color: 'red',
                cursor: 'pointer',
                fontSize: '16px',
                lineHeight: '1',
              }}
            >
              ✖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DroppableColumn;
