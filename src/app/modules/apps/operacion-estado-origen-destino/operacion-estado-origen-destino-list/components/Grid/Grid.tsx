import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Button } from '@mui/material';
import { OperacionEstadoOrigenDestinoModel, initialOperacionEstadoOrigenDestino } from '../../core/_models';
import { getColumns } from '../table/columns/_columns';
import OperacionEstadoOrigenDestinoModal from '../table/modal/_modal';
import Toolbar from '../toolbar/toolbars/toolbar';
import {
  fetchOperacionesEstadoOrigenDestino,
  handleAddOperacionEstadoOrigenDestino,
  handleDeleteRow,
} from '../../core/_handlers';
import { esES } from '@mui/x-data-grid/locales';
import { useParams } from 'react-router-dom';

const OperacionEstadoOrigenDestinosList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const operacionId = id.toString();
  const [rows, setRows] = useState<GridRowsProp<OperacionEstadoOrigenDestinoModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const [currentOperacionEstadoOrigenDestino, setCurrentOperacionEstadoOrigenDestino] = useState<OperacionEstadoOrigenDestinoModel>(initialOperacionEstadoOrigenDestino);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const fetchOperacionesEstadoOrigenDestinoData = useCallback(() => {
    const updatedFilters: Record<string, string> = {
      ...filters,
      operacion_id: id.toString()
    };
    fetchOperacionesEstadoOrigenDestino(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters);
  }, [page, pageSize, filters, id]);

  useEffect(() => {
    if (!isFirstLoad) {
      fetchOperacionesEstadoOrigenDestinoData();
    } else {
      setIsFirstLoad(false);
    }
  }, [page, pageSize, fetchOperacionesEstadoOrigenDestinoData]);

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
    if (!currentOperacionEstadoOrigenDestino.estado_id_destino || !currentOperacionEstadoOrigenDestino.estado_id_origen
      || !currentOperacionEstadoOrigenDestino.contact_attempt_type_id) {
      setValidationError('La selección del estado origen, el destino y la calificación es obligatoria.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleOpenAddModal = () => {
    setCurrentOperacionEstadoOrigenDestino(initialOperacionEstadoOrigenDestino);
    setOpen(true);
  };

  const handleAddOperacionEstadoOrigenDestinoWrapper = async () => {
    if (!validateFields()) return;
    handleAddOperacionEstadoOrigenDestino(currentOperacionEstadoOrigenDestino, fetchOperacionesEstadoOrigenDestinoData, setOpen, setCurrentOperacionEstadoOrigenDestino, initialOperacionEstadoOrigenDestino, setError, setModalErrors, setModalLoading);
  };

  const handleComboChange = (value: number | string, field: string) => {
    console.log(value + " - " + field);
    setCurrentOperacionEstadoOrigenDestino((prev) => ({
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
        onRefresh={fetchOperacionesEstadoOrigenDestinoData}
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
      <OperacionEstadoOrigenDestinoModal
        open={open}
        currentOperacionEstadoOrigenDestino={currentOperacionEstadoOrigenDestino}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={handleCloseModal}
        onComboChange={handleComboChange} // Nueva función genérica para manejar todos los cambios
        onSubmit={handleAddOperacionEstadoOrigenDestinoWrapper}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas desasociar este estado origen-destino-calificación? Esta acción no se puede deshacer.
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

export default OperacionEstadoOrigenDestinosList;
