import React from 'react';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';
import MapIcon from '@mui/icons-material/Map';

interface ToolbarProps {
  onRefresh: () => void;
  onOpenFilterModal: () => void;
  onClearFilters: () => void;
  onOpenMapModal: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onRefresh, onOpenFilterModal, onClearFilters, onOpenMapModal }) => {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
      <Button variant="contained" color="primary" onClick={onRefresh}>
        Refrescar
      </Button>
      <Button variant="contained" color="primary" onClick={onOpenFilterModal} startIcon={<FilterListIcon />}>
        Filtrar
      </Button>
      <Button variant="contained" color="secondary" onClick={onClearFilters} startIcon={<BrushIcon />}>
        Limpiar Filtros
      </Button>
      <Button variant="contained" color="primary" onClick={onOpenMapModal} startIcon={<MapIcon />}>
        Seleccionar Ubicación
      </Button>
    </div>
  );
};

export default Toolbar;
