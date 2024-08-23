import React, { useState } from 'react';
import { DraggableCard } from '../../../entities/card/ui/Card';
import { FlexContainer } from '../../../entities/flexContainer/ui/FlexContainer';
import { DragAndDropField } from '../../../features/DragAndDrop/ui/DragAndDropField';
import { Button } from 'antd';

export function MainPage() {
  const [structures, setStructures] = useState([]);

  const handleDrop = (item) => {
    if (item.type === 'STRUCTURE' && structures.length < 20) {
      setStructures([...structures, { id: Date.now(), type: item.type }]);
    }
  };

  const handleRemove = (id) => {
    setStructures(structures.filter(structure => structure.id !== id));
  };

  const handleDuplicate = (id) => {
    const structureToDuplicate = structures.find(structure => structure.id === id);
    if (structureToDuplicate) {
      setStructures([...structures, { ...structureToDuplicate, id: Date.now() }]);
    }
  };

  const handleMove = (draggedId, targetId) => {
    const draggedIndex = structures.findIndex(s => s.id === draggedId);
    const targetIndex = structures.findIndex(s => s.id === targetId);
    const updatedStructures = [...structures];
    const [movedStructure] = updatedStructures.splice(draggedIndex, 1);
    updatedStructures.splice(targetIndex, 0, movedStructure);
    setStructures(updatedStructures);
  };

  const handleExport = () => {
    const jsonData = JSON.stringify(structures, null, 2);
    console.log(jsonData);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '16px' }}>
        <DraggableCard type="HEADER" content="Header" id="header" />
        <DraggableCard type="BUTTON" content="Button" id="button" />
        <DraggableCard type="STRUCTURE" content="Структура" id="structure" />
      </div>
      <DragAndDropField onDrop={handleDrop}>
        {structures.map((structure) => (
          <FlexContainer
            key={structure.id}
            id={structure.id}
            onRemove={() => handleRemove(structure.id)}
            onDuplicate={() => handleDuplicate(structure.id)}
            onMove={handleMove}
          >
            <DragAndDropField>
              {/* Вложенные блоки */}
            </DragAndDropField>
          </FlexContainer>
        ))}
      </DragAndDropField>
      <Button onClick={handleExport}>Выгрузить в JSON</Button>
    </div>
  );
}
