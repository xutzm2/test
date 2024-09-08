import React from 'react';
import { useDrag } from 'react-dnd';

const ItemType = 'ITEM';

const DraggableItem = ({ id, content }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, type: 'ITEM' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '8px',
        border: '1px solid lightgrey',
        backgroundColor: 'white',
        cursor: 'move',
      }}
    >
      {content}
    </div>
  );
};

export default DraggableItem;
