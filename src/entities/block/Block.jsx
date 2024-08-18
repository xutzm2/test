// src/entities/block/Block.jsx
import React from 'react';
import { Button, Card } from 'antd';
import FlexContainer from '../../features/dnd/FlexContainer';

const Block = ({ block, currentDepth }) => {
  switch (block.type) {
    case 'h1':
      return <h1>{block.content || 'Новый Заголовок'}</h1>;
    case 'button':
      return (
        <Card style={{ width: 300 }}>
          <Button type="primary">{block.content || 'Новая Кнопка'}</Button>
        </Card>
      );
    case 'flex':
      return <FlexContainer columns={block.columns} currentDepth={block.depth || currentDepth} />;
    default:
      return <div>{block.type}</div>;
  }
};

export default Block;
