// src/features/dnd/FlexContainer.jsx
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import DroppableColumn from './DroppableColumn';

const FlexContainer = ({ columns, currentDepth = 0 }) => {
  const [columnContents, setColumnContents] = useState(columns.map(() => []));

  const addBlockToColumn = (columnIndex, block) => {
    setColumnContents((prev) => {
      const newContents = [...prev];
      newContents[columnIndex] = [...newContents[columnIndex], block];
      return newContents;
    });
  };

  return (
    <Row gutter={16}>
      {columnContents.map((column, index) => (
        <Col
          key={index}
          span={24 / columns.length} // Adjust span based on the number of columns
        >
          <DroppableColumn
            columnIndex={index}
            columnContents={column}
            addBlockToColumn={addBlockToColumn}
            currentDepth={currentDepth} // Передаем текущую глубину
          />
        </Col>
      ))}
    </Row>
  );
};

export default FlexContainer;
