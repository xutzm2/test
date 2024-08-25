// src/features/dnd/DroppableColumn.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import Block from '../../entities/block/Block';

const DroppableColumn = ({
  columnIndex,
  columnContents,
  addBlockToColumn,
  currentDepth,
  removeBlock,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    drop: (item) => {
      const isStructure = item.type === 'structure';

      const currentStructureDepth = columnContents.reduce(
        (maxDepth, block) =>
          block.type === 'flex' ? Math.max(maxDepth, block.depth || 1) : maxDepth,
        currentDepth
      );

      if (isStructure && currentStructureDepth >= 1) {
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
        minHeight: 100,
        padding: 10,
        position: 'relative',
      }}
    >
      {columnContents.map((block, index) => (
        <Block
          key={index}
          block={block}
          currentDepth={currentDepth}
          index={index}
          removeBlock={() => removeBlock(index)}
        />
      ))}
    </div>
  );
};

export default DroppableColumn;
