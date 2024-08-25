import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './ResizableColumn.css'; // Импортируем стили

const ResizableColumn = ({ width, onResize, children }) => {
  return (
    <ResizableBox
      width={width}
      height={Infinity}
      axis="x"
      minConstraints={[100, Infinity]}
      maxConstraints={[600, Infinity]}
      onResize={(e, data) => onResize(data.size.width)}
      resizeHandles={['e']}
      className="resizable-column"
    >
      <div className="column-content">
        {children}
      </div>
    </ResizableBox>
  );
};

export default ResizableColumn;
