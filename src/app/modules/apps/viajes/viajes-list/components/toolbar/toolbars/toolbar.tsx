import React from 'react';
import { Button, Tooltip, Stack, Switch, FormControlLabel } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Icono para el calendario
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import UndoIcon from '@mui/icons-material/Undo';
import MapIcon from '@mui/icons-material/Map';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GetAppIcon from '@mui/icons-material/GetApp'; // Icono de descarga
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TableChartIcon from '@mui/icons-material/TableChart';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import HandymanIcon from '@mui/icons-material/Handyman';
import DateRangeIcon from '@mui/icons-material/DateRange';










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

      <Tooltip title="Subir Archivo XLSX">
        <IconButton color="primary" onClick={onOpenUploadModal}>
          <UploadFileIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Revertir Lote">
        <IconButton color="primary" onClick={onOpenRevertirLoteModal}>
          <UndoIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Azignar zonas a un Lote">
        <IconButton color="primary" onClick={onOpenAsignarZonasModal}>
          <MapIcon />
        </IconButton>
      </Tooltip>


      <Tooltip title="Asignar transportista por poligonos">
        <IconButton color="primary" onClick={onOpenAsignarTransportistasModal}>

          <LocalShippingIcon />

        </IconButton>
      </Tooltip>




      <Tooltip title="Asignar agenda manualmente">
        <IconButton color="primary" onClick={onOpenUploadExcelAsignacionManualAgendaModal}>

          <DateRangeIcon />

        </IconButton>
      </Tooltip>


      
      <Tooltip title="Asignar transportistas manualmente">
        <IconButton color="primary" onClick={onOpenUploadExcelAsignacionManualTransportistasModal}>
          <HandymanIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Ver agenda de disponibilidad">
        <IconButton color="primary" onClick={onOpenDisponibilidadModal}>

          <CalendarTodayIcon />

        </IconButton>
      </Tooltip>

    {/*   <Tooltip title="Descargar CSV Para Call Center">
        <IconButton color="primary" onClick={onOpenDownloadCSVModal}>

          <GetAppIcon />

        </IconButton>
      </Tooltip> */}


      <Tooltip title="Descargar XLSX">
        <IconButton color="primary" onClick={onOpenExportarViajesPorLoteModal}>

          <TableChartIcon />

        </IconButton>
      </Tooltip>

      <Tooltip title="Reasignar Zona a transportista">
        <IconButton color="primary" onClick={onReassign}>
          <SwapHorizIcon />
        </IconButton>
      </Tooltip>


      <Tooltip title="Cambio de estados masivo">
        <IconButton color="primary" onClick={onOpenCambioEstadoMasivoModal}>

          <AutorenewIcon />

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



      {/* <Button variant="contained" color="primary" onClick={onOpenEnviarLoteOmnileadsModal}>
        Enviar Lote a Omnileads
      </Button> */}

    </div>
  );
};

export default Toolbar;
