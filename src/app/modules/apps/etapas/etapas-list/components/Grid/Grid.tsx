import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { EtapasModel, initialEtapas } from '../../core/_models'; // Importa la interfaz adaptada
import { getColumns } from '../../components/table/columns/_columns'; // Ajusta la ruta si es necesario
import EtapaModal from '../../components/table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import { Button } from '@mui/material';
import {
  fetchEtapas,
  handleProcessRowUpdate,
  handleDeleteRow,
  handleAddEtapa,
  handleEditEtapa
} from '../../core/_handlers';
import { esES  } from '@mui/x-data-grid/locales';

const EtapasList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<EtapasModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const [currentEtapa, setCurrentEtapa] = useState<EtapasModel>(initialEtapas);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);  // Variable de control para el primer montaje

  const fetchEtapasData = useCallback(() => {
    fetchEtapas(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);

  useEffect(() => {
    if (!isFirstLoad) {
      fetchEtapasData();
    } else {
      setIsFirstLoad(false);  // Marca que ya hemos pasado el primer render
    }
  }, [page, pageSize, fetchEtapasData]);

  const handleProcessRowUpdateWrapper = async (newRow: GridRowModel<EtapasModel>, oldRow: GridRowModel<EtapasModel>) => {
    return handleProcessRowUpdate(newRow, oldRow, setError);
  };

  const handleDeleteRowWrapper = async (id: number) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteRow = async () => {
    if (deleteItemId !== null) {
      setDeleteLoading(true);
      await handleDeleteRow(deleteItemId, setRows, setError);
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
      setDeleteItemId(null);
    }
  };

  const validateFields = (): boolean => {
    if (!currentEtapa.nombre || !currentEtapa.codigo ) {
      setValidationError('El nombre y el codigo son obligatorios.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddEtapaWrapper = async () => {
    if (!validateFields()) return;
    handleAddEtapa(currentEtapa, fetchEtapasData, setOpen, setCurrentEtapa, initialEtapas, setError, setModalErrors, setModalLoading);
  };

  const handleEditEtapaWrapper = async () => {
    if (!validateFields()) return;
    handleEditEtapa(currentEtapa, fetchEtapasData, setOpen, setCurrentEtapa, initialEtapas, setError, setModalErrors, setModalLoading);
  };

  const handleOpenEditModal = (centro: EtapasModel) => {
    setCurrentEtapa(centro);
    setEditMode(true);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setCurrentEtapa(initialEtapas);
    setEditMode(false);
    setOpen(true);
  };

  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    // Actualiza los filtros y después ejecuta fetchEtapasData
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      fetchEtapas(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters);
      return updatedFilters;
    });
  };
  
  const handleClearFilters = () => {
    // Limpia los filtros y después ejecuta fetchEtapasData
    setFilters(() => {
      fetchEtapas(page, pageSize, setRows, setRowCount, setError, setLoading, {});
      return {};
    });
  };
  
  

  const columns = getColumns(handleOpenEditModal, handleDeleteRowWrapper);

  return (
    <div style={{ height: 700, width: '100%' }}>
      {error && (
        <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
          <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
          <div className="d-flex flex-column">
            <h5 className="mb-1">Error</h5>
            <span>{error}</span>
          </div>
        </div>
      )}
      <Toolbar
        onAdd={handleOpenAddModal}
        onRefresh={fetchEtapasData}
        onOpenFilterModal={handleOpenFilterModal}
        onClearFilters={handleClearFilters}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        rowCount={rowCount}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        loading={loading}
        processRowUpdate={handleProcessRowUpdateWrapper}
        experimentalFeatures={{ newEditingApi: true }} // Habilitar la nueva API de edición
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          m: 2,
          boxShadow: 1,
          //border: 2,
          '& .MuiDataGrid-columnHeaderTitle': {
           //backgroundColor: '#f5f5f5',
            fontSize: '1rem',
            // fontWeight: 'bold',
            color: 'black', // Color negro
            fontWeight: 600, // Hacer la letra más negra
            textTransform:  'uppercase'

          }}}

      />
      <EtapaModal
        open={open}
        editMode={editMode}
        currentEtapa={currentEtapa}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={() => setOpen(false)}
        onChange={(e) => setCurrentEtapa({ ...currentEtapa, [e.target.name]: e.target.value })}
        onSubmit={editMode ? handleEditEtapaWrapper : handleAddEtapaWrapper}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este Etapa? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary" disabled={deleteLoading}>
            Cancelar
          </Button>
          <Button onClick={confirmDeleteRow} color="primary" autoFocus disabled={deleteLoading}>
            {deleteLoading ? <CircularProgress size={24} /> : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
      <FilterModal
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default EtapasList;
