import React from 'react';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface ToolbarProps {
  onAdd: () => void;
  onRefresh: () => void;

}

const Toolbar: React.FC<ToolbarProps> = ({ onAdd, onRefresh }) => {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
      <Tooltip title="Agregar nuevo">
        <IconButton color="primary" onClick={onAdd}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Refrescar">
        <IconButton color="primary" onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
     
    </div>
  );
};

export default Toolbar;
