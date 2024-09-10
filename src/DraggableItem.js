import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ type }) => {
  // Используем хук useDrag для создания перетаскиваемого элемента
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type, // Определяем тип перетаскиваемого элемента
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Следим за состоянием перетаскивания
    }),
  }));

  return (
    <div
      ref={drag} // Используем ref для привязки DOM-элемента к функционалу перетаскивания
      style={{
        opacity: isDragging ? 0.5 : 1, // Уменьшаем непрозрачность во время перетаскивания
        backgroundColor: 'lightgrey',
        padding: '8px',
        margin: '8px',
        cursor: 'move', // Курсор "перетаскивания"
      }}
    >
      Перетащи меня!
    </div>
  );
};

export default DraggableItem;