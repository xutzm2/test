// src/features/dnd/DroppableColumn.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import Block from '../../entities/block/Block';

const DroppableColumn = ({
  columnIndex,
  columnContents = [], // Устанавливаем по умолчанию пустой массив
  addBlockToColumn,
  currentDepth,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    drop: (item) => {
      const isStructure = item.type === 'structure';

      const newBlock = {
        type: isStructure ? 'flex' : item.type,
        columns: isStructure ? [[], [], []] : undefined,
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
        minHeight: 100,
        padding: 10,
        position: 'relative',
      }}
    >
      {Array.isArray(columnContents) && columnContents.map((block, index) => (
        <Block key={index} block={block} currentDepth={currentDepth} />
      ))}
    </div>
  );
};

export default DroppableColumn;
