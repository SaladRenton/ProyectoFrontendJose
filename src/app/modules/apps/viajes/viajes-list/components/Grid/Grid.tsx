import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Button, TextField } from '@mui/material';
import { ViajeModel, initialViaje } from '../../core/_models'; // Importa la interfaz adaptada
import { getColumns } from '../../components/table/columns/_columns'; // Ajusta la ruta si es necesario
import ViajeModal from '../../components/table/modal/_modal';
import RevertirLoteModal from '../../components/table/modal/_revertirLoteModal'; // Importa el modal de revertir lote
import AsignarZonasModal from '../../components/table/modal/_asignarZonasModal'; // Importa el nuevo modal
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import {
  fetchViajes,
  handleProcessRowUpdate,
  handleDeleteRow,
  handleAddViaje,
  handleEditViaje,
  handleFileUpload,
  asignarZonas
} from '../../core/_handlers';

const ViajesList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<ViajeModel>>([]);
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
  const [currentViaje, setCurrentViaje] = useState<ViajeModel>(initialViaje);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [revertirLoteModalOpen, setRevertirLoteModalOpen] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);
  const [operacionId, setOperacionId] = useState<number>(0);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const [asignarZonasModalOpen, setAsignarZonasModalOpen] = useState<boolean>(false);
  const [asignarZonasLoading, setAsignarZonasLoading] = useState<boolean>(false);
  const [asignarZonasErrors, setAsignarZonasErrors] = useState<string[]>([]);

  const fetchViajesData = useCallback(() => {
    fetchViajes(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);

  useEffect(() => {
    fetchViajesData();
  }, [page, pageSize, fetchViajesData]);

  const handleProcessRowUpdateWrapper = async (newRow: GridRowModel<ViajeModel>, oldRow: GridRowModel<ViajeModel>) => {
    return handleProcessRowUpdate(newRow, oldRow, setError, setModalErrors);
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
    if (!currentViaje.nombre || !currentViaje.apellido || !currentViaje.email) {
      setValidationError('Los campos Nombre, Apellido y Email son obligatorios.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddViajeWrapper = async () => {
    if (!validateFields()) return;
    handleAddViaje(currentViaje, fetchViajesData, setOpen, setCurrentViaje, initialViaje, setError, setModalErrors, setModalLoading);
  };

  const handleEditViajeWrapper = async () => {
    if (!validateFields()) return;
    handleEditViaje(currentViaje, fetchViajesData, setOpen, setCurrentViaje, initialViaje, setError, setModalErrors, setModalLoading);
  };

  const handleOpenEditModal = (viaje: ViajeModel) => {
    // Asegurar que las fechas no sean nulas antes de abrir el modal
    setCurrentViaje({
      ...viaje,
      fecha_inicio: viaje.fecha_inicio || new Date(),
      fecha_fin: viaje.fecha_fin || new Date(),
      created_at: viaje.created_at || new Date(),
      updated_at: viaje.updated_at || new Date()
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setCurrentViaje(initialViaje);
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
    fetchViajesData();
  };

  const handleOpenRevertirLoteModal = () => {
    setRevertirLoteModalOpen(true);
  };

  const handleCloseRevertirLoteModal = () => {
    setRevertirLoteModalOpen(false);
  };

  const handleSuccessRevertirLote = () => {
    setRevertirLoteModalOpen(false);
    fetchViajesData(); // Refresca los datos después de la acción exitosa
  };

  const handleOpenUploadModal = () => {
    setUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
    setFile(null); // Reset file input
    setOperacionId(0); // Reset operacionId input
    setUploadErrors([]); // Clear previous errors
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadFile = async () => {
    if (file && operacionId) {
      setUploadLoading(true);
      try {
        await handleFileUpload(file, operacionId, setError, setUploadErrors, setUploadLoading);
        fetchViajesData(); // Refresca los datos después de una carga exitosa
        if (uploadErrors.length === 0) {
          setUploadModalOpen(false); // Cerrar el modal solo si la carga es exitosa
        }
      } catch (error) {
        console.error("Error uploading file", error);
      }
      setUploadLoading(false);
    }
  };

  const handleOpenAsignarZonasModal = () => {
    setAsignarZonasModalOpen(true);
  };

  const handleCloseAsignarZonasModal = () => {
    setAsignarZonasModalOpen(false);
    setAsignarZonasErrors([]); // Clear previous errors
  };

  const handleAsignarZonas = async (lote: number) => {
    await asignarZonas(lote, setError, setAsignarZonasErrors, setAsignarZonasLoading);
    if (asignarZonasErrors.length === 0) {
      setAsignarZonasModalOpen(false); // Close modal only if there are no errors
      fetchViajesData(); // Refresca los datos después de la acción exitosa
    }
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
            {modalErrors.length > 0 && (
              <ul>
                {modalErrors.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      <Toolbar
        onAdd={handleOpenAddModal}
        onRefresh={fetchViajesData}
        onOpenFilterModal={handleOpenFilterModal}
        onClearFilters={handleClearFilters}
        onOpenRevertirLoteModal={handleOpenRevertirLoteModal}
        onOpenUploadModal={handleOpenUploadModal} // Añadir handler para abrir el modal de carga
        onOpenAsignarZonasModal={handleOpenAsignarZonasModal} // Añadir handler para abrir el modal de asignar zonas
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
      <ViajeModal
        open={open}
        editMode={editMode}
        currentViaje={currentViaje}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={() => setOpen(false)}
        onChange={(e) => setCurrentViaje({ ...currentViaje, [e.target.name]: e.target.value })}
        onSubmit={editMode ? handleEditViajeWrapper : handleAddViajeWrapper}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este viaje? Esta acción no se puede deshacer.
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
      <RevertirLoteModal
        open={revertirLoteModalOpen}
        onClose={handleCloseRevertirLoteModal}
        onSuccess={handleSuccessRevertirLote}
      />
      <Dialog
        open={uploadModalOpen}
        onClose={handleCloseUploadModal}
      >
        <DialogTitle>{"Cargar Archivo"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecciona un archivo y una operación para cargar.
          </DialogContentText>
          <input type="file" onChange={handleFileChange} />
          <TextField
            margin="dense"
            label="Operación ID"
            fullWidth
            value={operacionId}
            onChange={(e) => setOperacionId(Number(e.target.value))}
          />
          {uploadErrors.length > 0 && (
            <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
              <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
              <div className="d-flex flex-column">
                <h5 className="mb-1">Error</h5>
                <span>{uploadErrors.join(' ')}</span>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUploadFile} color="primary" disabled={uploadLoading || !file || !operacionId}>
            {uploadLoading ? <CircularProgress size={24} /> : 'Cargar'}
          </Button>
        </DialogActions>
      </Dialog>
      <AsignarZonasModal
        open={asignarZonasModalOpen}
        onClose={handleCloseAsignarZonasModal}
        onSubmit={handleAsignarZonas}
        loading={asignarZonasLoading}
        errors={asignarZonasErrors}
      />
    </div>
  );
};

export default ViajesList;
