// src/pages/EditorPage/EditorPage.jsx
import React from 'react';
import { Layout, Menu, Button } from 'antd';
import FlexContainer from '../../features/dnd/FlexContainer';
import DndField from '../../features/dnd/DndField';
import { useBlocksStore } from '../../shared/store/useBlocksStore';
import Block from '../../entities/block/Block';
import DraggableItem from '../../shared/ui/DraggableItem';

const { Sider, Content } = Layout;

const EditorPage = () => {
  const blocks = useBlocksStore((state) => state.blocks);

  const exportBlocksAsJSON = () => {
    const jsonBlocks = JSON.stringify(blocks, null, 2);
    console.log(jsonBlocks); // Вы можете заменить это на любую другую логику, например, вывод в модальное окно или скачивание файла
    alert("JSON данных сохранен в консоли.");
  };

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
          <FlexContainer columns={[33, 33, 33]} /> {/* Задайте исходные размеры колонок */}
          <DndField />
          <div className="blocks-preview">
            {blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
          <Button type="primary" onClick={exportBlocksAsJSON} style={{ marginTop: 20 }}>
            Экспортировать в JSON
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditorPage;
