import React from 'react';
import { Button } from 'antd';
import { useDrag, useDrop } from 'react-dnd';

export function FlexContainer({ id, onRemove, onDuplicate, onMove, children }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'FLEX_CONTAINER',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'FLEX_CONTAINER',
    drop: (item) => onMove(item.id, id),
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      style={{ opacity: isDragging ? 0.5 : 1, border: '1px solid black', padding: '16px', marginBottom: '8px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onRemove}>Удалить</Button>
        <Button onClick={onDuplicate}>Дублировать</Button>
        <Button>Переместить</Button>
      </div>
      <div style={{ display: 'flex' }}>
        {children}
      </div>
    </div>
  );
}
