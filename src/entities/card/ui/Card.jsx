import React from 'react';
import { Card } from 'antd';
import { useDrag } from 'react-dnd';

export function DraggableCard({ type, content, id }) {
  const [{ isDragging }, dragRef] = useDrag({
    type,
    item: { type, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card>{content}</Card>
    </div>
  );
}
