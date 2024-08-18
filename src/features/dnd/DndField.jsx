// src/features/dnd/DndField.jsx
import { useDrop } from 'react-dnd';
import { useBlocksStore } from '../../shared/store/useBlocksStore';
import React from 'react';

const DndField = () => {
  const addBlock = useBlocksStore((state) => state.addBlock);

  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    drop: (item) => {
      switch (item.type) {
        case 'h1':
          addBlock({ type: 'h1', content: 'Новый Заголовок' });
          break;
        case 'button':
          addBlock({ type: 'button', content: 'Новая Кнопка' });
          break;
        case 'structure':
          addBlock({ type: 'flex', columns: [33, 33, 33] });
          break;
        default:
          break;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        padding: 20,
        border: isOver ? '2px solid #1890ff' : '2px dashed #d9d9d9',
        minHeight: 400,
        position: 'relative',
        backgroundColor: '#fafafa',
      }}
    >
      {isOver ? (
        <div style={{ color: '#1890ff', textAlign: 'center' }}>
          Отпустите, чтобы добавить
        </div>
      ) : (
        <div style={{ color: '#d9d9d9', textAlign: 'center' }}>
          Перетащите сюда элементы
        </div>
      )}
    </div>
  );
};

export default DndField;
