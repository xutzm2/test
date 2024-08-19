// src/features/dnd/DroppableColumn.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import Block from '../../entities/block/Block';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const MAX_NESTED_STRUCTURES = 1; // Максимальный уровень вложенности структур

const DroppableColumn = ({
  columnIndex,
  columnContents,
  addBlockToColumn,
  currentDepth,
  columnWidth, // Добавляем ширину колонки
  onResize, // Функция для обработки изменения размера
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    drop: (item) => {
      // Проверка на вложенность структур
      if (item.type === 'structure') {
        const currentStructureDepth = columnContents.reduce(
          (maxDepth, block) => (block.type === 'flex' ? Math.max(maxDepth, block.depth || 1) : maxDepth),
          currentDepth
        );

        if (currentStructureDepth >= MAX_NESTED_STRUCTURES) {
          return; // Если превышен лимит, не добавляем новую структуру
        }
      }

      // Создание нового блока
      const newBlock = {
        type: item.type === 'structure' ? 'flex' : item.type,
        columns: item.type === 'structure' ? [33, 33, 33] : undefined,
        content: item.type === 'h1' ? 'Новый Заголовок' : item.type === 'button' ? 'Новая Кнопка' : undefined,
        depth: item.type === 'structure' ? currentDepth + 1 : currentDepth,
      };

      addBlockToColumn(columnIndex, newBlock);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <ResizableBox
      width={columnWidth}
      height={0}
      axis="x"
      minConstraints={[100, 0]} // Минимальная ширина колонки
      maxConstraints={[600, 0]} // Максимальная ширина колонки
      onResize={(e, { size }) => onResize(columnIndex, size.width)} // Обработчик изменения размера
    >
      <div
        ref={drop}
        className="droppable-column"
        style={{
          backgroundColor: isOver ? '#e6f7ff' : '#f5f5f5',
          border: '1px solid #d9d9d9',
          minHeight: 100,
          padding: 10,
          position: 'relative',
          width: '100%', // Обеспечиваем, что колонка будет занимать всю доступную ширину в resizable контейнере
        }}
      >
        {columnContents.map((block, index) => (
          <Block key={index} block={block} currentDepth={currentDepth} />
        ))}
      </div>
    </ResizableBox>
  );
};

export default DroppableColumn;
