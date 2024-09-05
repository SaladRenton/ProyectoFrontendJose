import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getTransportistas, updateTransportista, deleteTransportista, addTransportista } from '../../../app/modules/auth/core/_requests';
import { TransportistaModel } from '../../../app/modules/auth/core/_models'; // Importa la interfaz adaptada
import { esES  } from '@mui/x-data-grid/locales';

const TransportistasList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<TransportistaModel>>([]);
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
  const [currentTransportista, setCurrentTransportista] = useState<TransportistaModel>({
    id: 0,
    razon_social: '',
    email: '',
    localidad: '',
    ciudad: '',
    calle: '',
    numero_calle: '',
    piso: '',
    dpto: '',
    tel: '',
    cuit: '',
  });

  const fetchTransportistas = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await getTransportistas(page, pageSize);
      setRows(response.data.data);
      setRowCount(response.data.total);
      setError(null); // Limpiar cualquier error previo
    } catch (error) {
      console.error("Error fetching transportistas data", error);
      setError('Error fetching transportistas data');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTransportistas(page, pageSize);
  }, [page, pageSize, fetchTransportistas]);

  const handleProcessRowUpdate = async (newRow: GridRowModel<TransportistaModel>, oldRow: GridRowModel<TransportistaModel>): Promise<GridRowModel<TransportistaModel>> => {
    try {
      await updateTransportista(newRow as TransportistaModel);
      setError(null); // Limpiar cualquier error previo si la actualización es exitosa
      return newRow;
    } catch (error: any) {
      console.error("Error updating transportista", error);
      const message = error.message || 'Update failed';
      setError(message);
      return oldRow; // Revertir a la fila anterior si hay un error
    }
  };

  const handleDeleteRow = async (id: number) => {
    try {
      await deleteTransportista(id);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
    } catch (error: any) {
      console.error("Error deleting transportista", error);
      const message = error.message || 'Delete failed';
      setError(message);
    }
  };

  const validateFields = (): boolean => {
    if (!currentTransportista.razon_social || !currentTransportista.email || !currentTransportista.cuit) {
      setValidationError('Los campos Razón Social, Email y Cuit son obligatorios.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddTransportista = async () => {
    if (!validateFields()) return;
    setModalLoading(true);
    try {
      await addTransportista(currentTransportista);
      fetchTransportistas(page, pageSize); // Recargar datos después de agregar
      setOpen(false);
      setCurrentTransportista({
        id: 0,
        razon_social: '',
        email: '',
        localidad: '',
        ciudad: '',
        calle: '',
        numero_calle: '',
        piso: '',
        dpto: '',
        tel: '',
        cuit: '',
      });
      setError(null); // Limpiar cualquier error previo si la adición es exitosa
    } catch (error: any) {
      console.error("Error adding transportista", error);
      const message = error.message || 'Add failed';
      setError(message);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = Object.values(error.response.data.errors).flat().map(String);      
        setModalErrors(errors);
      } else {
        setModalErrors([message]);
      }
    }
    setModalLoading(false);
  };

  const handleEditTransportista = async () => {
    if (!validateFields()) return;
    setModalLoading(true);
    try {
      await updateTransportista(currentTransportista);
      fetchTransportistas(page, pageSize); // Recargar datos después de editar
      setOpen(false);
      setCurrentTransportista({
        id: 0,
        razon_social: '',
        email: '',
        localidad: '',
        ciudad: '',
        calle: '',
        numero_calle: '',
        piso: '',
        dpto: '',
        tel: '',
        cuit: '',
      });
      setError(null); // Limpiar cualquier error previo si la edición es exitosa
    } catch (error: any) {
      console.error("Error updating transportista", error);
      const message = error.message || 'Update failed';
      setError(message);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = Object.values(error.response.data.errors).flat().map(String);      
        setModalErrors(errors);
      } else {
        setModalErrors([message]);
      }
    }
    setModalLoading(false);
  };

  const handleOpenEditModal = (transportista: TransportistaModel) => {
    setCurrentTransportista(transportista);
    setEditMode(true);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setCurrentTransportista({
      id: 0,
      razon_social: '',
      email: '',
      localidad: '',
      ciudad: '',
      calle: '',
      numero_calle: '',
      piso: '',
      dpto: '',
      tel: '',
      cuit: '',
    });
    setEditMode(false);
    setOpen(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'razon_social', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 150, editable: true },
    { field: 'localidad', headerName: 'Localidad', width: 100, editable: true },
    { field: 'ciudad', headerName: 'Ciudad', width: 100, editable: true },
    { field: 'calle', headerName: 'Calle', width: 50, editable: true },
    { field: 'numero_calle', headerName: 'Nro. Calle', width: 100, editable: true },
    { field: 'piso', headerName: 'Piso', width: 100, editable: true },
    { field: 'dpto', headerName: 'Dpto', width: 100, editable: true },
    { field: 'tel', headerName: 'Tel.', width: 100, editable: true },
    { field: 'cuit', headerName: 'Cuit.', width: 100, editable: true },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as TransportistaModel)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDeleteRow(params.id as number)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

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
      <Button variant="contained" color="primary" onClick={handleOpenAddModal} style={{ marginBottom: '10px' }}>
        Agregar Nuevo
      </Button>
      <Button variant="contained" color="primary" onClick={() => fetchTransportistas(page, pageSize)} style={{ marginBottom: '10px', marginLeft: '10px' }}>
        Refrescar
      </Button>
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
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }} // Habilitar la nueva API de edición
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}

      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? 'Editar Transportista' : 'Agregar Nuevo Transportista'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Razón Social"
            fullWidth
            required
            value={currentTransportista.razon_social}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, razon_social: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            required
            value={currentTransportista.email}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Localidad"
            fullWidth
            value={currentTransportista.localidad}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, localidad: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Ciudad"
            fullWidth
            value={currentTransportista.ciudad}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, ciudad: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Calle"
            fullWidth
            value={currentTransportista.calle}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, calle: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Nro. Calle"
            fullWidth
            value={currentTransportista.numero_calle}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, numero_calle: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Piso"
            fullWidth
            value={currentTransportista.piso}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, piso: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Dpto"
            fullWidth
            value={currentTransportista.dpto}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, dpto: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Tel."
            fullWidth
            value={currentTransportista.tel}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, tel: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Cuit."
            fullWidth
            required
            value={currentTransportista.cuit}
            onChange={(e) => setCurrentTransportista({ ...currentTransportista, cuit: e.target.value })}
          />
          {validationError && (
            <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
              <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
              <div className="d-flex flex-column">
                <h5 className="mb-1">Validation Error</h5>
                <span>{validationError}</span>
              </div>
            </div>
          )}
          {modalErrors.length > 0 && (
            <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
              <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
              <div className="d-flex flex-column">
                <h5 className="mb-1">Error</h5>
                <span>{modalErrors.join(' ')}</span>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={editMode ? handleEditTransportista : handleAddTransportista} color="primary" disabled={modalLoading}>
            {modalLoading ? <CircularProgress size={24} /> : editMode ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransportistasList;
