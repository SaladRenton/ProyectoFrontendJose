import React from 'react';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Icono para el calendario


interface ToolbarProps {
  onAdd: () => void;
  onRefresh: () => void;
  onOpenFilterModal: () => void;
  onClearFilters: () => void;
  onOpenRevertirLoteModal: () => void;
  onOpenUploadModal: () => void;
  onOpenAsignarZonasModal: () => void;
  onOpenAsignarTransportistasModal: () => void; // Añadir prop para abrir el modal de asignar transportistas
  onOpenDisponibilidadModal: () => void; // Añadir prop para abrir el modal de disponibilidad
  onOpenEnviarLoteOmnileadsModal: () => void; // Añadir prop para abrir el modal de enviar lote a Omnileads


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
  onOpenDisponibilidadModal, // Añadir handler para abrir el modal de disponibilidad,
  onOpenEnviarLoteOmnileadsModal, // Añadir handler para abrir el modal de enviar lote a Omnileads


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
      <Button variant="contained" color="primary" onClick={onOpenDisponibilidadModal} startIcon={<CalendarTodayIcon />}>
        Disponibilidad
      </Button>
      <Button variant="contained" color="primary" onClick={onOpenEnviarLoteOmnileadsModal}>
        Enviar Lote a Omnileads
      </Button>

    </div>
  );
};

export default Toolbar;
