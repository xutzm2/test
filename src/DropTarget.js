import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const DropTarget = () => {
  const [result,setResult]=useState()
  const [result2,setResult2]=useState()
  // Используем хук useDrop для создания цели для сброса
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM', // Принимаем элементы только с типом 'ITEM'
    drop: () => setResult('Элемент сброшен!'), // Действие при сбросе элемента
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Следим за тем, находится ли элемент над целью
    }),
  }));


  const [{ isOver2 }, drop2] = useDrop(() => ({
    accept: 'ITEM2', // Принимаем элементы только с типом 'ITEM'
    drop: () => setResult2('Элемент сброшен!'), // Действие при сбросе элемента
    collect: (monitor) => ({
      isOver2: monitor.isOver(), // Следим за тем, находится ли элемент над целью
    }),
  }));

  return (
    <>


    <div
      ref={drop} // Используем ref для привязки DOM-элемента к функционалу сброса
      style={{
        backgroundColor: isOver ? 'lightblue' : 'white', // Изменяем цвет, когда элемент находится над целью
        padding: '20px',
        minHeight: '100px',
        border: '1px dashed black',
      }}
    >
      Перетащи сюда элемент
      <div
      ref={drop2} // Используем ref для привязки DOM-элемента к функционалу сброса
      style={{
        backgroundColor: isOver2 ? 'lightblue' : 'white', // Изменяем цвет, когда элемент находится над целью
        padding: '20px',
        minHeight: '100px',
        border: '1px dashed black',
      }}
    >
      Перетащи сюда элемент
      {result2}
    </div>
      {result}
    </div>
    </>
  );
};

export default DropTarget;