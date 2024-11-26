import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { CalificacionesModel, initialCalificaciones } from '../../core/_models'; // Importa la interfaz adaptada
import { getColumns } from '../table/columns/_columns'; // Ajusta la ruta si es necesario
import CalificacionModal from '../table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import { Button } from '@mui/material';
import {
  fetchCalificaciones,
  handleProcessRowUpdate,
  handleDeleteRow,
  handleAddCalificacion,
  handleEditCalificacion
} from '../../core/_handlers';
import { esES  } from '@mui/x-data-grid/locales';

const CalificacionesList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<CalificacionesModel>>([]);
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
  const [currentCalificacion, setCurrentCalificacion] = useState<CalificacionesModel>(initialCalificaciones);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);  // Variable de control para el primer montaje

  const fetchCalificacionesData = useCallback(() => {
    fetchCalificaciones(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);

  useEffect(() => {
    if (!isFirstLoad) {
      fetchCalificacionesData();
    } else {
      setIsFirstLoad(false);  // Marca que ya hemos pasado el primer render
    }
  }, [page, pageSize, fetchCalificacionesData]);

  const handleProcessRowUpdateWrapper = async (newRow: GridRowModel<CalificacionesModel>, oldRow: GridRowModel<CalificacionesModel>) => {
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
    if (!currentCalificacion.descripcion  ) {
      setValidationError('La descripción es obligatoria.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddCalificacionWrapper = async () => {
    if (!validateFields()) return;
    handleAddCalificacion(currentCalificacion, fetchCalificacionesData, setOpen, setCurrentCalificacion, initialCalificaciones, setError, setModalErrors, setModalLoading);
  };

  const handleEditCalificacionWrapper = async () => {
    if (!validateFields()) return;
    handleEditCalificacion(currentCalificacion, fetchCalificacionesData, setOpen, setCurrentCalificacion, initialCalificaciones, setError, setModalErrors, setModalLoading);
  };

  const handleOpenEditModal = (centro: CalificacionesModel) => {
    setCurrentCalificacion(centro);
    setEditMode(true);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setCurrentCalificacion(initialCalificaciones);
    setEditMode(false);
    setOpen(true);
  };

  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    // Actualiza los filtros y después ejecuta fetchCalificacionesData
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      fetchCalificaciones(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters);
      return updatedFilters;
    });
  };
  
  const handleClearFilters = () => {
    // Limpia los filtros y después ejecuta fetchCalificacionesData
    setFilters(() => {
      fetchCalificaciones(page, pageSize, setRows, setRowCount, setError, setLoading, {});
      return {};
    });
  };
  
  

  const columns = getColumns(handleOpenEditModal, handleDeleteRowWrapper);

  const handleOnClose =()=>{

    
    setModalErrors([]);
    setOpen(false);
    setError(null);

  }

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
        onRefresh={fetchCalificacionesData}
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
      <CalificacionModal
        open={open}
        editMode={editMode}
        currentCalificacion={currentCalificacion}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={handleOnClose}
        onChange={(e) => setCurrentCalificacion({ ...currentCalificacion, [e.target.name]: e.target.value })}
        onSubmit={editMode ? handleEditCalificacionWrapper : handleAddCalificacionWrapper}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => handleOnClose()}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este Calificacion? Esta acción no se puede deshacer.
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

export default CalificacionesList;