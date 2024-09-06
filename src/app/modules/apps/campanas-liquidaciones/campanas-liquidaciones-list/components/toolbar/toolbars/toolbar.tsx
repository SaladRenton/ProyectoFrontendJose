import React from 'react';
import { Tooltip } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import TableChartIcon from '@mui/icons-material/TableChart';


interface ToolbarProps {

  onRefresh: () => void;
  onOpenFilterModal: () => void;
  onClearFilters: () => void;
  onOpenExportarViajesPorLoteModal: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onRefresh, onOpenFilterModal, onClearFilters,onOpenExportarViajesPorLoteModal }) => {
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

      <Tooltip title="Descargar XLSX">
        <IconButton color="primary" onClick={onOpenExportarViajesPorLoteModal}>

          <TableChartIcon />

        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Toolbar;
