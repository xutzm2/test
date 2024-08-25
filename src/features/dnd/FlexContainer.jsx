// src/features/dnd/FlexContainer.jsx
import React, { useState } from 'react';
import ResizableColumn from './ResizableColumn';
import DroppableColumn from './DroppableColumn';

const FlexContainer = ({ columns, currentDepth = 0 }) => {
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
      {columnContents.map((column, index) => (
        <ResizableColumn
          key={index}
          width={columnWidths[index]}
          onResize={(newWidth) => handleResize(index, newWidth)}
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

export default FlexContainer;
