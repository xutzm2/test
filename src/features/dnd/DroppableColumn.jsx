import React from 'react';
import { useDrop } from 'react-dnd';
import Block from '../../entities/block/Block';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const MAX_NESTED_STRUCTURES = 1;

const DroppableColumn = ({
  columnIndex,
  columnContents,
  addBlockToColumn,
  currentDepth,
  columnWidth,
  onResize,
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
    <ResizableBox
      width={columnWidth}
      height={0}
      axis="x"
      minConstraints={[100, 0]}
      maxConstraints={[600, 0]}
      onResize={(e, { size }) => onResize(columnIndex, size.width)}
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
          width: '100%',
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
