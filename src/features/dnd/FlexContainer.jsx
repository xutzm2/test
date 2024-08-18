// src/features/dnd/FlexContainer.jsx
import React, { useState } from 'react';
import DroppableColumn from './DroppableColumn';
import './FlexContainer.css';

const FlexContainer = ({ columns, currentDepth = 0 }) => {
  const [columnContents, setColumnContents] = useState(
    columns.map(() => []) // Инициализируем пустые массивы для каждой колонки
  );

  const addBlockToColumn = (columnIndex, block) => {
    setColumnContents((prev) => {
      const newContents = [...prev];
      newContents[columnIndex] = [...newContents[columnIndex], block]; // Добавляем новый блок в конкретную колонку
      return newContents;
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
          currentDepth={currentDepth} // Передаем текущую глубину вложенности
        />
      ))}
    </div>
  );
};

export default FlexContainer;
