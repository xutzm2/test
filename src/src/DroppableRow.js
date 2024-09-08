import React from 'react';
import { useDrop } from 'react-dnd';
import DroppableColumn from './DroppableColumn';

const ItemType = 'ITEM';

const DroppableRow = ({ item, onDrop, onRemove, onClone }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (droppedItem) => onDrop(droppedItem.id, item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        padding: '8px',
        margin: '8px 0',
        backgroundColor: isOver ? '#d9f7be' : '#ffffff',
        border: '1px solid #ddd',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{item.content}</span>
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
      <div style={{ display: 'flex', marginTop: '8px' }}>
        <DroppableColumn
          id={`col1-${item.id}`}
          items={item.rows || []}
          onDrop={onDrop}
          onRemove={onRemove}
          onClone={onClone}
        />
        <DroppableColumn
          id={`col2-${item.id}`}
          items={item.rows || []}
          onDrop={onDrop}
          onRemove={onRemove}
          onClone={onClone}
        />
      </div>
    </div>
  );
};

export default DroppableRow;
