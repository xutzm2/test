// src/app/App.jsx
import React from 'react';
import EditorPage from '../pages/EditorPage/EditorPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'antd/dist/reset.css'; // Подключение стилей Ant Design
import '../app/styles.css'; // Подключение наших стилей

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <EditorPage />
    </DndProvider>
  );
}

export default App;
