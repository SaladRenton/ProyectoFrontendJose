import React, { useState } from 'react';
import { Button, Tooltip, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BrushIcon from '@mui/icons-material/Brush';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomModal from '../../../../../campanas/campanas-list/components/table/modal/_customModal';
import DataGridComponent from '../../datajson/DataGridComponent';

interface ToolbarProps {
  onAdd: () => void;
  onRefresh: () => void;
  onOpenFilterModal: () => void;
  onClearFilters: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAdd, onRefresh, onOpenFilterModal, onClearFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomButtonClick = () => {
    setIsModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

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
      <Tooltip title="Mostrar DataGrid">
        <Button variant="contained" color="primary" onClick={handleCustomButtonClick}>
          Mostrar DataGrid
        </Button>
      </Tooltip>

      {/* Modal */}
      <CustomModal open={isModalOpen} onClose={handleCloseModal}>
        <DataGridComponent /> {/* Renderiza el DataGridComponent dentro del modal */}
      </CustomModal>
      
    </div>
  );
};

export default Toolbar;