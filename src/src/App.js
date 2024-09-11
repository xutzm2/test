import React from 'react';
import DraggableItem from './DraggableItem';
import OuterDropTarget from './OuterDropTarget';

const App = () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <DraggableItem type="ITEM" />
        <DraggableItem type="ITEM2" />
      </div>
      <OuterDropTarget />
    </div>
  );
};

export default App;
