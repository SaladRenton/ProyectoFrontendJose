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
  onOpenAsignarZonasModal: () => void;
  onOpenAsignarTransportistasModal: () => void; // Añadir prop para abrir el modal de asignar transportistas
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAdd,
  onRefresh,
  onOpenFilterModal,
  onClearFilters,
  onOpenRevertirLoteModal,
  onOpenUploadModal,
  onOpenAsignarZonasModal,
  onOpenAsignarTransportistasModal, // Añadir handler para abrir el modal de asignar transportistas
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
      <Button variant="contained" color="primary" onClick={onOpenUploadModal}>
        Cargar Archivo
      </Button>
      <Button variant="contained" color="primary" onClick={onOpenAsignarZonasModal}>
        Asignar Zonas
      </Button>
      <Button variant="contained" color="primary" onClick={onOpenAsignarTransportistasModal}>
        Asignar Transportistas
      </Button>
    </div>
  );
};

export default Toolbar;
