// src/features/dnd/DroppableColumn.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import Block from '../../entities/block/Block';
import { Card } from 'antd';

const MAX_NESTED_STRUCTURES = 1; // Максимальная вложенность структур

const DroppableColumn = ({
  columnIndex,
  columnContents,
  addBlockToColumn,
  currentDepth,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    drop: (item) => {
      const isStructure = item.type === 'structure';
      
      // Определите текущую глубину вложенности в этой колонке
      const currentStructureDepth = columnContents.reduce(
        (maxDepth, block) =>
          block.type === 'flex' ? Math.max(maxDepth, block.depth || 1) : maxDepth,
        currentDepth
      );

      // Проверяем, если максимальная вложенность достигнута
      if (isStructure && currentStructureDepth >= MAX_NESTED_STRUCTURES) {
        return;
      }

      const newBlock = {
        type: isStructure ? 'flex' : item.type,
        columns: isStructure ? [33, 33, 33] : undefined,
        content: item.type === 'h1' ? 'Новый Заголовок' : item.type === 'button' ? 'Новая Кнопка' : undefined,
        depth: isStructure ? currentDepth + 1 : currentDepth,
      };

      addBlockToColumn(columnIndex, newBlock);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#e6f7ff' : '#f5f5f5',
        border: '1px solid #d9d9d9',
        minHeight: 100,
        padding: 10,
        position: 'relative',
      }}
    >
      {columnContents.map((block, index) => (
        <Block key={index} block={block} currentDepth={currentDepth} />
      ))}
    </div>
  );
};

export default DroppableColumn;
