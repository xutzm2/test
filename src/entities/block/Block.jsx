// src/entities/block/Block.jsx
import React from 'react';
import { Button, Card } from 'antd';
import FlexContainer from '../../features/dnd/FlexContainer';
import { useBlocksStore } from '../../shared/store/useBlocksStore';

const Block = ({ block, currentDepth, index, removeBlock }) => {
  const cloneBlock = useBlocksStore((state) => state.cloneBlock);
  const globalRemoveBlock = useBlocksStore((state) => state.removeBlock);

  const handleRemove = () => {
    if (removeBlock) {
      removeBlock();
    } else {
      globalRemoveBlock(index);
    }
  };

  const handleClone = () => {
    cloneBlock(index);
  };

  switch (block.type) {
    case 'h1':
      return (
        <div>
          <h1>{block.content || 'Новый Заголовок'}</h1>
          <Button onClick={handleClone} type="default" style={{ marginRight: '8px' }}>
            Клонировать
          </Button>
          <Button onClick={handleRemove} type="primary" danger>
            Удалить
          </Button>
        </div>
      );
    case 'button':
      return (
        <Card>
          <Button type="primary">{block.content || 'Новая Кнопка'}</Button>
          <Button onClick={handleClone} type="default" style={{ marginRight: '8px' }}>
            Клонировать
          </Button>
          <Button onClick={handleRemove} type="primary" danger>
            Удалить
          </Button>
        </Card>
      );
    case 'flex':
      return (
        <div>
          <FlexContainer
            columns={block.columns}
            currentDepth={block.depth || currentDepth}
          />
          <Button onClick={handleClone} type="default" style={{ marginRight: '8px' }}>
            Клонировать
          </Button>
          <Button onClick={handleRemove} type="primary" danger>
            Удалить
          </Button>
        </div>
      );
    default:
      return (
        <div>
          {block.type}
          <Button onClick={handleClone} type="default" style={{ marginRight: '8px' }}>
            Клонировать
          </Button>
          <Button onClick={handleRemove} type="primary" danger>
            Удалить
          </Button>
        </div>
      );
  }
};

export default Block;
