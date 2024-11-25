import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { PaqueteModel, initialPaquete } from '../../core/_models'; // Importa la interfaz adaptada
import { getColumns } from '../table/columns/_columns'; // Ajusta la ruta si es necesario
import PaqueteModal from '../table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import { Button } from '@mui/material';
import RevertirLotePaqueteModal from '../table/modal/_revertirLoteModal';
import UploadPaqueteModal from '../table/modal/_uploadPaqueteModal';
import {
  fetchPaquetes,
  handleProcessRowUpdate,
  handleDeleteRow,
  handleAddPaquete,
  handleEditPaquete,
  exportarPaquetes
  
} from '../../core/_handlers';
import { esES } from '@mui/x-data-grid/locales';
import ExportarPaquetesModal from '../table/modal/_exportarPaquetesModal';

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
  const [filters, setFilters] = useState<Record<string, string | boolean | number | string[]>>({});
  const [revertirLoteModalOpen, setRevertirLoteModalOpen] = useState<boolean>(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);  // Variable de control para el primer montaje


  const [exportarPaquetesModalOpen, setExportarPaquetesModalOpen] = useState<boolean>(false);
  const [exportarPaquetesErrors, setExportarPaquetesErrors] = useState<string[]>([]);
  const [exportarPaquetesLoading, setExportarPaquetesLoading] = useState<boolean>(false);

  const fetchPaquetesData = useCallback(() => {
    fetchPaquetes(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);


  useEffect(() => {

    if (!isFirstLoad) {
      fetchPaquetesData();
    } else {
      setIsFirstLoad(false);  // Marca que ya hemos pasado el primer render
    }

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




  const handleCloseExportarPaquetes = () => {
    setExportarPaquetesModalOpen(false);
    setExportarPaquetesErrors([]); // Clear previous errors
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

  const handleApplyFilters = (newFilters: Record<string, string | boolean | number | string[]>) => {
    // Actualiza los filtros y luego llama a fetchPaquetesData con los filtros actualizados
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      // Llamamos a la función de obtención de paquetes con los nuevos filtros
      fetchPaquetes(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters);
      return updatedFilters;  // Actualizamos el estado con los nuevos filtros
    });
  };

  const handleClearFilters = () => {
    // Limpiamos los filtros y luego llamamos a fetchPaquetesData con los filtros vacíos
    setFilters(() => {
      fetchPaquetes(page, pageSize, setRows, setRowCount, setError, setLoading, {});
      return {};  // Limpiamos los filtros en el estado
    });
  };


  const handleOpenRevertirLoteModal = () => {
    setRevertirLoteModalOpen(true);
  };

  const handleCloseRevertirLoteModal = () => {
    setRevertirLoteModalOpen(false);
  };

  const handleSuccessRevertirLote = () => {
    setRevertirLoteModalOpen(false);
    fetchPaquetesData(); // Refresca los datos después de la acción exitosa
  };

  const handleOpenUploadModal = () => {
    setUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
  };

  const handleExportarPaquetesModal = () => {
    setExportarPaquetesModalOpen(true);
  };

  const columns = getColumns(handleOpenEditModal, handleDeleteRowWrapper);




  const handleExportarPaquetes = async (filters: Record<string, string | boolean | number | string[]>) => {
    await exportarPaquetes(filters, setError, setExportarPaquetesErrors, setExportarPaquetesLoading);
    if (error && error.length > 0) {
      setExportarPaquetesModalOpen(false); // Close modal only if there are no errors
    }
  };

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
        onOpenRevertirLoteModal={handleOpenRevertirLoteModal}
        onOpenUploadModal={handleOpenUploadModal}
        onOpenExportarPaquetes={handleExportarPaquetesModal}

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
            textTransform: 'uppercase'

          }
        }}

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
      <RevertirLotePaqueteModal
        open={revertirLoteModalOpen}
        onClose={handleCloseRevertirLoteModal}
        onSuccess={handleSuccessRevertirLote}
      />

      <UploadPaqueteModal open={uploadModalOpen} onClose={handleCloseUploadModal} />

      <ExportarPaquetesModal
        open={exportarPaquetesModalOpen}
        onClose={handleCloseExportarPaquetes}
        onSubmit={handleExportarPaquetes}
        loading={exportarPaquetesLoading}
        errors={exportarPaquetesErrors}
      />
    </div>
  );
};

export default PaquetesList;
