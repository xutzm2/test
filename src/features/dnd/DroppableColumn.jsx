// src/features/dnd/DroppableColumn.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import Block from '../../entities/block/Block';
const MAX_NESTED_STRUCTURES = 1; // Максимальный уровень вложенности структур
const DroppableColumn = ({ columnIndex, columnContents, addBlockToColumn, currentDepth }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    drop: (item) => {
      // Проверяем, если уже достигнут максимальный уровень вложенности структур
      if (item.type === 'structure') {
        const currentStructureDepth = columnContents.reduce(
          (maxDepth, block) => (block.type === 'flex' ? Math.max(maxDepth, block.depth || 1) : maxDepth),
          currentDepth
        );

        if (currentStructureDepth >= MAX_NESTED_STRUCTURES) {
          return; // Если превышен лимит, не добавляем новую структуру
        }
      }

      // Создание нового блока: flex для структуры, текст для других блоков
      const newBlock = {
        type: item.type === 'structure' ? 'flex' : item.type,
        columns: item.type === 'structure' ? [33, 33, 33] : undefined,
        content: item.type === 'h1' ? 'Новый Заголовок' : item.type === 'button' ? 'Новая Кнопка' : undefined,
        depth: item.type === 'structure' ? currentDepth + 1 : currentDepth, // Увеличиваем глубину вложенности для структуры
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
      className="droppable-column"
      style={{
        backgroundColor: isOver ? '#e6f7ff' : '#f5f5f5',
        border: '1px solid #d9d9d9',
        minHeight: 100,
        padding: 10,
        flex: 1,
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
