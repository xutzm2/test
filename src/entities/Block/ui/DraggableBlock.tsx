import React from 'react';
import { Card } from 'antd';
import { useDrag } from 'react-dnd';

interface DraggableBlockProps {
  type: string;
  label: string;
}

export const DraggableBlock: React.FC<DraggableBlockProps> = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card>{label}</Card>
    </div>
  );
};
