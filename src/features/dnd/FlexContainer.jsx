// src/features/dnd/FlexContainer.jsx
import React, { useState } from 'react';
import ResizableColumn from './ResizableColumn';
import DroppableColumn from './DroppableColumn';

const FlexContainer = ({ columns, currentDepth = 0 }) => {
  const [columnContents, setColumnContents] = useState(columns || [[], [], []]); // Устанавливаем пустые массивы по умолчанию

  const addBlockToColumn = (columnIndex, block) => {
    setColumnContents((prev) => {
      const newContents = [...prev];
      newContents[columnIndex] = [...newContents[columnIndex], block];
      return newContents;
    });
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {columnContents.map((column, index) => (
        <ResizableColumn
          key={index}
          width={columns[index]}
        >
          <DroppableColumn
            columnIndex={index}
            columnContents={column}
            addBlockToColumn={addBlockToColumn}
            currentDepth={currentDepth}
          />
        </ResizableColumn>
      ))}
    </div>
  );
};

export default FlexContainer
