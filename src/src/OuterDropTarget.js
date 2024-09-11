import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';

// Генератор уникальных идентификаторов
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const OuterDropTarget = () => {
  const [outerItems, setOuterItems] = useState([
    { id: generateId(), type: 'ITEM' },
    { id: generateId(), type: 'ITEM2' },
  ]);
  const [innerItems, setInnerItems] = useState([]);

  const moveItem = (item, fromState, setFromState, toState, setToState) => {
    setFromState(prevItems => prevItems.filter(i => i.id !== item.id));
    setToState(prevItems => [...prevItems, { ...item, id: generateId() }]);
  };

  const handleDrop = (item, monitor, target) => {
    if (monitor.didDrop()) return; // Если элемент уже был сброшен, ничего не делаем

    // Перемещаем элемент в нужный контейнер
    if (target === 'outer') {
      moveItem(item, innerItems, setInnerItems, outerItems, setOuterItems);
    } else {
      moveItem(item, outerItems, setOuterItems, innerItems, setInnerItems);
    }
  };

  // Внешний Drop Target
  const [{ isOverOuter }, dropOuter] = useDrop(() => ({
    accept: ['ITEM', 'ITEM2'],
    drop: (item, monitor) => handleDrop(item, monitor, 'outer'),
    collect: (monitor) => ({
      isOverOuter: monitor.isOver(),
    }),
  }));

  // Вложенный Drop Target
  const [{ isOverInner }, dropInner] = useDrop(() => ({
    accept: ['ITEM', 'ITEM2'],
    drop: (item, monitor) => handleDrop(item, monitor, 'inner'),
    collect: (monitor) => ({
      isOverInner: monitor.isOver(),
    }),
  }));

  return (
    <div>
      <div
        ref={dropOuter}
        style={{
          backgroundColor: isOverOuter ? 'lightblue' : 'white',
          padding: '20px',
          minHeight: '100px',
          border: '1px dashed black',
          marginBottom: '10px',
        }}
      >
        Внешний контейнер
        {outerItems.map((item) => (
          <DraggableItem key={item.id} type={item.type} id={item.id} />
        ))}
        <div
          ref={dropInner}
          style={{
            backgroundColor: isOverInner ? 'lightgreen' : 'white',
            padding: '20px',
            minHeight: '100px',
            border: '1px dashed black',
            marginTop: '10px',
          }}
        >
          Вложенный контейнер
          {innerItems.map((item) => (
            <DraggableItem key={item.id} type={item.type} id={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OuterDropTarget;
