import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { HeaderPanel } from './ui/HeaderPanel';
import { DropArea } from './ui/DropArea';

export const ConstructorPage = () => {
  const [structure, setStructure] = useState([]);

  const handleExport = () => {
    const json = JSON.stringify(structure, null, 2);
    console.log(json);
  };

  return (
    <Layout>
      <HeaderPanel />
      <Layout.Content style={{ padding: '50px', minHeight: '80vh' }}>
        <DropArea />
        <Button onClick={handleExport} type="primary">
          Выгрузить в JSON
        </Button>
      </Layout.Content>
    </Layout>
  );
};
