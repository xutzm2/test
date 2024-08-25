// src/features/dnd/FlexContainer.jsx
import React, { useState } from 'react';
import ResizableColumn from './ResizableColumn';
import DroppableColumn from './DroppableColumn';

const FlexContainer = ({ columns, currentDepth = 0, index, removeBlock }) => {
  const [columnContents, setColumnContents] = useState(columns.map(() => []));
  const [columnWidths, setColumnWidths] = useState(columns.map(() => 200));

  const addBlockToColumn = (columnIndex, block) => {
    setColumnContents((prev) => {
      const newContents = [...prev];
      newContents[columnIndex] = [...newContents[columnIndex], block];
      return newContents;
    });
  };

  const handleResize = (index, newWidth) => {
    setColumnWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = newWidth;
      return newWidths;
    });
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {columnContents.map((column, columnIndex) => (
        <ResizableColumn
          key={columnIndex}
          width={columnWidths[columnIndex]}
          onResize={(newWidth) => handleResize(columnIndex, newWidth)}
        >
          <DroppableColumn
            columnIndex={columnIndex}
            columnContents={column}
            addBlockToColumn={addBlockToColumn}
            currentDepth={currentDepth}
            removeBlock={(childIndex) => {
              const updatedContents = [...columnContents];
              updatedContents[columnIndex] = updatedContents[columnIndex].filter(
                (_, i) => i !== childIndex
              );
              setColumnContents(updatedContents);
            }}
          />
        </ResizableColumn>
      ))}
      <button onClick={removeBlock}>Удалить структуру</button>
    </div>
  );
};

export default FlexContainer;
