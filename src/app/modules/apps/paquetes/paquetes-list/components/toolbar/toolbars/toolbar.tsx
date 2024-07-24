import React from 'react';
import { Button, Tooltip } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';

import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import UndoIcon from '@mui/icons-material/Undo';
import AddCircleIcon from '@mui/icons-material/AddCircle';


interface ToolbarProps {
  onAdd: () => void;
  onRefresh: () => void;
  onOpenFilterModal: () => void;
  onClearFilters: () => void;
  onOpenRevertirLoteModal: () => void;
  onOpenUploadModal: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAdd, onRefresh, onOpenFilterModal, onClearFilters, onOpenRevertirLoteModal, onOpenUploadModal }) => {
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

      <Tooltip title="Revertir Lote">
        <IconButton color="primary" onClick={onOpenRevertirLoteModal}>
          <UndoIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Subir Archivo XLSX">
        <IconButton color="primary" onClick={onOpenUploadModal}>
          <UploadFileIcon />
        </IconButton>
      </Tooltip>
     
    
    </div>
  );
};

export default Toolbar;
