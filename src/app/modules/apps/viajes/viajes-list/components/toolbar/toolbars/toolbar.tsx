import React from 'react';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UploadIcon from '@mui/icons-material/UploadFile';

interface ToolbarProps {
  onAdd: () => void;
  onRefresh: () => void;
  onOpenFilterModal: () => void;
  onClearFilters: () => void;
  onOpenRevertirLoteModal: () => void;
  onOpenUploadModal: () => void;
  onOpenAsignarZonasModal: () => void; // Añadir el nuevo handler
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAdd,
  onRefresh,
  onOpenFilterModal,
  onClearFilters,
  onOpenRevertirLoteModal,
  onOpenUploadModal,
  onOpenAsignarZonasModal // Añadir el nuevo handler
}) => {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
      <Button variant="contained" color="primary" onClick={onAdd}>
        Agregar
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
      <Button variant="contained" color="primary" onClick={onOpenUploadModal} startIcon={<UploadIcon />}>
        Cargar Archivo
      </Button>
      <Button variant="contained" color="primary" onClick={onOpenAsignarZonasModal} startIcon={<AssignmentIcon />}>
        Asignar Zonas
      </Button>
    </div>
  );
};

export default Toolbar;
