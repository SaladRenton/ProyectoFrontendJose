import React from 'react';
import { Tooltip, Switch, FormControlLabel } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import TableChartIcon from '@mui/icons-material/TableChart';










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
  onOpenDownloadCSVModal: () => void; // Añadir prop para abrir el modal de enviar lote a Omnileads
  isSwitchOn: boolean;
  onSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReassign: () => void;
  onOpenExportarViajesPorLoteModal: () => void; // Añadir prop para abrir el modal de asignar transportistas
  onOpenCambioEstadoMasivoModal: () => void; // Añadir prop para abrir el modal de asignar transportistas
  onOpenUploadExcelAsignacionManualTransportistasModal: () => void; // Añadir prop para abrir el modal de asignar transportistas
  onOpenUploadExcelAsignacionManualAgendaModal: () => void; // Añadir prop para abrir el modal de asignar transportistas




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
  onOpenDownloadCSVModal, // Añadir handler para abrir el modal de enviar lote a Omnileads
  isSwitchOn,
  onSwitchChange,
  onReassign,
  onOpenExportarViajesPorLoteModal,
  onOpenCambioEstadoMasivoModal,
  onOpenUploadExcelAsignacionManualTransportistasModal,
  onOpenUploadExcelAsignacionManualAgendaModal



}) => {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
      {/* <Button variant="contained" color="primary" onClick={onAdd}>
        Agregar
      </Button> */}

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

      <Tooltip title="Descargar XLSX">
        <IconButton color="primary" onClick={onOpenExportarViajesPorLoteModal}>

          <TableChartIcon />

        </IconButton>
      </Tooltip>


      <FormControlLabel
        control={
          <Switch
            checked={isSwitchOn}
            onChange={onSwitchChange}
            name="verColores"
            color="primary"
          />
        }
        label="Ver estados con colores"
      />

      



    </div>
  );
};

export default Toolbar;
