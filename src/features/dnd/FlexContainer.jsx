// src/features/dnd/FlexContainer.jsx
import React, { useState } from 'react';
import DroppableColumn from './DroppableColumn';
import './FlexContainer.css';

const FlexContainer = ({ columns, currentDepth = 0 }) => {
  const [columnContents, setColumnContents] = useState(
    columns.map(() => []) // Инициализируем пустые массивы для каждой колонки
  );
  
  // Инициализируем ширины колонок
  const [columnWidths, setColumnWidths] = useState(columns.map(() => 200)); // Например, начальная ширина 200px

  const addBlockToColumn = (columnIndex, block) => {
    setColumnContents((prev) => {
      const newContents = [...prev];
      newContents[columnIndex] = [...newContents[columnIndex], block];
      return newContents;
    });
  };

  // Обработчик изменения размера
  const handleResize = (index, newWidth) => {
    setColumnWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = newWidth;
      return newWidths;
    });
  };

  return (
    <div className="flex-container" style={{ display: 'flex', width: '100%' }}>
      {columnContents.map((column, index) => (
        <DroppableColumn
          key={index}
          columnIndex={index}
          columnContents={column}
          addBlockToColumn={addBlockToColumn}
          currentDepth={currentDepth}
          columnWidth={columnWidths[index]} // Передаем ширину колонки
          onResize={handleResize} // Передаем обработчик изменения размера
        />
      ))}
    </div>
  );
};

export default FlexContainer;
