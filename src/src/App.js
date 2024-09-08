import React, { useState } from 'react';
import DragDropContext from './DragDropContext';
import DraggableHeader from './DraggableHeader';
import DropZone from './DropZone';

const App = () => {
  const [headerPosition, setHeaderPosition] = useState(null);

  const handleDrop = (zone) => {
    setHeaderPosition(zone);
  };

  return (
    <DragDropContext>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <DraggableHeader />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DropZone name="zone1" onDrop={handleDrop}>
          {headerPosition === 'zone1' && <DraggableHeader />}
        </DropZone>
        <DropZone name="zone2" onDrop={handleDrop}>
          {headerPosition === 'zone2' && <DraggableHeader />}
        </DropZone>
      </div>
    </DragDropContext>
  );
};

export default App;
