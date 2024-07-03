import React from 'react';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';

interface ToolbarProps {
  onAdd: () => void;
  onRefresh: () => void;
  onOpenFilterModal: () => void;
  onClearFilters: () => void;
  onOpenRevertirLoteModal: () => void;
  onOpenUploadModal: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAdd, onRefresh, onOpenFilterModal, onClearFilters, onOpenRevertirLoteModal ,onOpenUploadModal }) => {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
      <Button variant="contained" color="primary" onClick={onAdd}>
        Agregar Nuevo
      </Button>
      <Button variant="contained" color="primary" onClick={onRefresh}>
        Refrescar
      </Button>
      <Button variant="contained" color="primary" onClick={onOpenFilterModal} startIcon={<FilterListIcon />}>
        Filtrar
      </Button>
      <Button variant="contained" color="secondary" onClick={onClearFilters} startIcon={<BrushIcon />}>
        Limpiar Filtros
      </Button>
      <Button variant="contained" color="primary" onClick={onOpenRevertirLoteModal}>
        Revertir Lote
      </Button>
      <Button onClick={onOpenUploadModal} variant="contained" color="primary">
        Subir Paquetes
      </Button>
    </div>
  );
};

export default Toolbar;
