import React from 'react';
import { Button } from 'antd';
interface ExportButtonProps {
  onExport: () => void;
}
export const ExportButton: React.FC<ExportButtonProps> = ({ onExport }) => {
  return (
    <Button onClick={onExport} type="primary">
      Выгрузить в JSON
    </Button>
  );
};
