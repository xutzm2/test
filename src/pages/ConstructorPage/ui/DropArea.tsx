import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { StructureBlock } from '@/entities/Block/ui/StructureBlock';

export const DropArea = () => {
  const [structures, setStructures] = useState<any[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'structure',
    drop: (item) => addStructureBlock(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addStructureBlock = () => {
    if (structures.length < 20) {
      setStructures([...structures, { id: Date.now(), blocks: [] }]);
    }
  };

  return (
    <div ref={drop} style={{ padding: '20px', minHeight: '400px', backgroundColor: isOver ? '#f0f0f0' : 'white' }}>
      {structures.map((structure, index) => (
        <StructureBlock key={structure.id} id={structure.id} />
      ))}
    </div>
  );
};
