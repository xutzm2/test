import React from 'react';
import { useDrop } from 'react-dnd';
import DroppableRow from './DroppableRow';

const ItemType = 'ITEM';

const DroppableArea = ({ items, onDrop, onRemove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        minHeight: '200px',
        padding: '16px',
        backgroundColor: isOver ? '#e6f7ff' : '#fafafa',
        border: '1px dashed #ccc',
        marginTop: '16px',
      }}
    >
      {items.map((item) => (
        <DroppableRow
          key={item.id}
          item={item}
          onDrop={onDrop}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default DroppableArea;
