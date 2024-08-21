import React from 'react';
import { Card, Row, Col } from 'antd';
import { DraggableBlock } from '@/entities/Block/ui/DraggableBlock';

export const HeaderPanel = () => {
  return (
    <Row gutter={16} style={{ padding: '20px' }}>
      <Col span={8}>
        <DraggableBlock type="header" label="Header" />
      </Col>
      <Col span={8}>
        <DraggableBlock type="button" label="Button" />
      </Col>
      <Col span={8}>
        <DraggableBlock type="structure" label="Структура" />
      </Col>
    </Row>
  );
};
