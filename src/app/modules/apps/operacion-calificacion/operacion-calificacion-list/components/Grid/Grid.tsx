import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Button } from '@mui/material';
import { OperacionCalificacionModel, initialOperacionCalificacion } from '../../core/_models';
import { getColumns } from '../table/columns/_columns';
import OperacionCalificacionModal from '../table/modal/_modal';
import Toolbar from '../toolbar/toolbars/toolbar';
import {
  fetchOperacionesCalificacion,
  handleAddOperacionCalificacion,
  handleDeleteRow,
} from '../../core/_handlers';
import { esES } from '@mui/x-data-grid/locales';
import { useParams } from 'react-router-dom';

const OperacionCalificacionsList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const operacionId = id.toString();
  const [rows, setRows] = useState<GridRowsProp<OperacionCalificacionModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const [currentOperacionCalificacion, setCurrentOperacionCalificacion] = useState<OperacionCalificacionModel>(initialOperacionCalificacion);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const fetchOperacionesCalificacionData = useCallback(() => {
    const updatedFilters: Record<string, string> = {
      ...filters,
      operacion_id: id.toString()
    };
    fetchOperacionesCalificacion(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters);
  }, [page, pageSize, filters, id]);

  useEffect(() => {
    if (!isFirstLoad) {
      fetchOperacionesCalificacionData();
    } else {
      setIsFirstLoad(false);
    }
  }, [page, pageSize, fetchOperacionesCalificacionData]);

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
    if (!currentOperacionCalificacion.estado_id_destino
      || !currentOperacionCalificacion.contact_attempt_type_id) {
      setValidationError('La selección del estado destino y la calificación es obligatoria.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleOpenAddModal = () => {
    setCurrentOperacionCalificacion(initialOperacionCalificacion);
    setOpen(true);
  };

  const handleAddOperacionCalificacionWrapper = async () => {
    if (!validateFields()) return;
    handleAddOperacionCalificacion(currentOperacionCalificacion, fetchOperacionesCalificacionData, setOpen, setCurrentOperacionCalificacion, initialOperacionCalificacion, setError, setModalErrors, setModalLoading);
  };

  const handleComboChange = (value: number | string, field: string) => {
    console.log(value + " - " + field);
    setCurrentOperacionCalificacion((prev) => ({
      ...prev,
      operacion_id: operacionId,
      [field]: value,
    }));
  };

  const columns = getColumns(handleDeleteRowWrapper);

  const handleCloseModal = () => {

    setOpen(false);
    setModalErrors([]);
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
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
        onRefresh={fetchOperacionesCalificacionData}
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
        experimentalFeatures={{ newEditingApi: true }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          m: 2,
          boxShadow: 1,
          '& .MuiDataGrid-columnHeaderTitle': {
            fontSize: '1rem',
            color: 'black',
            fontWeight: 600,
            textTransform: 'uppercase',
          }
        }}
      />
      <OperacionCalificacionModal
        open={open}
        currentOperacionCalificacion={currentOperacionCalificacion}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={handleCloseModal}
        onComboChange={handleComboChange} // Nueva función genérica para manejar todos los cambios
        onSubmit={handleAddOperacionCalificacionWrapper}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas desasociar esta calificación? Puede traer problemas si se reciben calificaciones. Esta acción no se puede deshacer.
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
    </div>
  );
};

export default OperacionCalificacionsList;
