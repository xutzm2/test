import React, { useState } from 'react';
import { Card } from 'antd';
import { useDrop } from 'react-dnd';

interface Block {
  id: number;
  type: string;
}

interface StructureBlockProps {
  id: number;
}
export const StructureBlock: React.FC<StructureBlockProps> = ({ id }) => {
  const [columns, setColumns] = useState([[], [], []]);

  const handleDrop = (item: Block, columnIndex: number) => {
    if (item.type === 'structure' && columns[columnIndex].length === 0) {
      const newColumn = [...columns];
      newColumn[columnIndex].push({ id: Date.now(), type: 'structure' });
      setColumns(newColumn);
    } else if (columns[columnIndex].length < 20) {
      const newColumn = [...columns];
      newColumn[columnIndex].push({ id: Date.now(), type: item.type });
      setColumns(newColumn);
    }
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case 'header':
        return <h3>Header</h3>;
      case 'button':
        return <button>Кнопка</button>;
      case 'structure':
        return <StructureBlock id={block.id} />;
      default:
        return null;
    }
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {columns.map((column, index) => (
          <div key={index} style={{ flex: 1, padding: '0 10px', minHeight: '100px' }}>
            <DropColumn index={index} onDrop={handleDrop} />
            {column.map(renderBlock)}
          </div>
        ))}
      </div>
    </Card>
  );
};

const DropColumn = ({ index, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['header', 'button', 'structure'],
    drop: (item) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={{ minHeight: '100px', backgroundColor: isOver ? '#f0f0f0' : 'white' }} />
  );
};
