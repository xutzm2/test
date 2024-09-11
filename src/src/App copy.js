import React, { useState } from 'react';
import DraggableItem from './DraggableItem';
import DropTarget from './OuterDropTarget';
const App = () => {
return (    <div>
    <DraggableItem type='ITEM'/>
    <DraggableItem type='ITEM2' />
    <DropTarget />
  </div>)
};

export default App;
