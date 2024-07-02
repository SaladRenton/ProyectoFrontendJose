import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { PaqueteModel, initialPaquete } from '../../core/_models'; // Importa la interfaz adaptada
import { getColumns } from '../table/columns/_columns'; // Ajusta la ruta si es necesario
import PaqueteModal from '../table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import { Button } from '@mui/material';
import {
  fetchPaquetes,
  handleProcessRowUpdate,
  handleDeleteRow,
  handleAddPaquete,
  handleEditPaquete
} from '../../core/_handlers';

const PaquetesList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<PaqueteModel>>([]);
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
  const [currentPaquete, setCurrentPaquete] = useState<PaqueteModel>(initialPaquete);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchPaquetesData = useCallback(() => {
    fetchPaquetes(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);

  useEffect(() => {
    fetchPaquetesData();
  }, [page, pageSize, fetchPaquetesData]);

  const handleProcessRowUpdateWrapper = async (newRow: GridRowModel<PaqueteModel>, oldRow: GridRowModel<PaqueteModel>) => {
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
    // if (!currentPaquete.razon_social || !currentPaquete.email || !currentPaquete.cuit) {
    //   setValidationError('Los campos Razón Social, Email y Cuit son obligatorios.');
    //   return false;
    // }
    setValidationError(null);
    return true;
  };

  const handleAddPaqueteWrapper = async () => {
    if (!validateFields()) return;
    handleAddPaquete(currentPaquete, fetchPaquetesData, setOpen, setCurrentPaquete, initialPaquete, setError, setModalErrors, setModalLoading);
  };

  const handleEditPaqueteWrapper = async () => {
    if (!validateFields()) return;
    handleEditPaquete(currentPaquete, fetchPaquetesData, setOpen, setCurrentPaquete, initialPaquete, setError, setModalErrors, setModalLoading);
  };

  const handleOpenEditModal = (paquete: PaqueteModel) => {
    setCurrentPaquete(paquete);
    setEditMode(true);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setCurrentPaquete(initialPaquete);
    setEditMode(false);
    setOpen(true);
  };

  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    setFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({});
    fetchPaquetesData();
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
        onRefresh={fetchPaquetesData}
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
      />
      <PaqueteModal
        open={open}
        editMode={editMode}
        currentPaquete={currentPaquete}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={() => setOpen(false)}
        onChange={(e) => setCurrentPaquete({ ...currentPaquete, [e.target.name]: e.target.value })}
        onSubmit={editMode ? handleEditPaqueteWrapper : handleAddPaqueteWrapper}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este Paquete? Esta acción no se puede deshacer.
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

export default PaquetesList;
