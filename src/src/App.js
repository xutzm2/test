import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DroppableArea from './DroppableArea';
import DraggableItem from './DraggableItem';

const App = () => {
  const [items, setItems] = useState([]);
  
  const handleDrop = (id, targetId) => {
    const newItem = { id: `item-${items.length + 1}`, content: 'Row with 2 columns' };
    setItems((prevItems) => {
      if (targetId) {
        return prevItems.map(item =>
          item.id === targetId
            ? { ...item, rows: [...(item.rows || []), newItem] }
            : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const handleRemove = (id) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '20px' }}>
        <DraggableItem id="structure" content="Structure" />
        <DroppableArea items={items} onDrop={handleDrop} onRemove={handleRemove} />
      </div>
    </DndProvider>
  );
};

export default App;
