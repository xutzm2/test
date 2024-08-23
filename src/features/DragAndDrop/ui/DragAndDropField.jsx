import React from 'react';
import { useDrop } from 'react-dnd';

export function DragAndDropField({ onDrop, children }) {
  const [, dropRef] = useDrop({
    accept: ['STRUCTURE', 'BUTTON', 'HEADER'],
    drop: (item) => onDrop(item),
  });

  return (
    <div ref={dropRef} style={{ minHeight: '200px', border: '1px dashed gray' }}>
      {children}
    </div>
  );
}
