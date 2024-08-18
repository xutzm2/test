// src/pages/EditorPage/EditorPage.jsx
import React from 'react';
import DndField from '../../features/dnd/DndField';
import { useBlocksStore } from '../../shared/store/useBlocksStore';
import Block from '../../entities/block/Block';
import DraggableItem from '../../shared/ui/DraggableItem';
import { Layout, Menu } from 'antd';

const { Sider, Content } = Layout;

const EditorPage = () => {
  const blocks = useBlocksStore((state) => state.blocks);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="h1">
            <DraggableItem type="h1" label="<card>h1</card>" />
          </Menu.Item>
          <Menu.Item key="button">
            <DraggableItem type="button" label="<card>button</card>" />
          </Menu.Item>
          <Menu.Item key="structure">
            <DraggableItem type="structure" label="Структура" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: '#fff',
          }}
        >
          <DndField />
          <div className="blocks-preview">
            {blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditorPage;
