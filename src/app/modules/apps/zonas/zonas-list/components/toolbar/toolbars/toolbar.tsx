import React from 'react';
import { Button, Tooltip } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';
import MapIcon from '@mui/icons-material/Map';

import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import UndoIcon from '@mui/icons-material/Undo';
import AddCircleIcon from '@mui/icons-material/AddCircle';


interface ToolbarProps {
  onRefresh: () => void;
  onOpenFilterModal: () => void;
  onClearFilters: () => void;
  onOpenMapModal: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onRefresh, onOpenFilterModal, onClearFilters, onOpenMapModal }) => {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
      <Tooltip title="Refrescar">
        <IconButton color="primary" onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Filtrar">
        <IconButton color="primary" onClick={onOpenFilterModal}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Limpiar Filtros">
        <IconButton color="primary" onClick={onClearFilters}>
          <BrushIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Seleccionar Ubicación">
        <IconButton color="primary" onClick={onOpenMapModal}>
          <MapIcon />
        </IconButton>
      </Tooltip>


    </div>
  );
};

export default Toolbar;
