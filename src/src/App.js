import React, { useState } from 'react';
import DragDropContext from './DragDropContext';
import DraggableHeader from './DraggableHeader';
import DropZone from './DropZone';

const App = () => {
  const [headerPosition, setHeaderPosition] = useState(null);

  const handleDrop = (zone) => {
    setHeaderPosition(zone);
  };

  const handleRemove = () => {
    setHeaderPosition(null);
  };

  return (
    <DragDropContext>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        {headerPosition === null && (
          <DraggableHeader onRemove={handleRemove} />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DropZone name="zone1" onDrop={handleDrop}>
          {headerPosition === 'zone1' && (
            <DraggableHeader onRemove={handleRemove} />
          )}
        </DropZone>
        <DropZone name="zone2" onDrop={handleDrop}>
          {headerPosition === 'zone2' && (
            <DraggableHeader onRemove={handleRemove} />
          )}
        </DropZone>
      </div>
    </DragDropContext>
  );
};

export default App;
