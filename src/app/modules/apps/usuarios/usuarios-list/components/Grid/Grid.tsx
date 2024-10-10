import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Button } from '@mui/material';
import { UserModelWithRol, initialUser } from '../../../../../auth';
import { getColumns } from '../table/columns/_columns';
import UsuarioModal from '../table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import {
  fetchUsuarios,
  handleProcessRowUpdate,
  handleDeleteRow,
  handleAddUsuario,
  handleEditUsuario
} from '../../core/_handlers';
import { esES } from '@mui/x-data-grid/locales';

const UsuariosList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<UserModelWithRol>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null | number>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const [currentUsuario, setCurrentUsuario] = useState<UserModelWithRol>(initialUser);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string | boolean | number | string[]>>({});
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);  // Variable de control para el primer montaje

  const fetchUsuariosData = useCallback(() => {
    fetchUsuarios(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);


  useEffect(() => {

    if (!isFirstLoad) {
      fetchUsuariosData();
    } else {
      setIsFirstLoad(false);  // Marca que ya hemos pasado el primer render
    }
  }, [page, pageSize, fetchUsuariosData]);

  const handleProcessRowUpdateWrapper = async (newRow: GridRowModel<UserModelWithRol>, oldRow: GridRowModel<UserModelWithRol>) => {
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
    setValidationError(null);
    return true;
  };

  const handleAddUsuarioWrapper = async () => {
    if (!validateFields()) return;
    handleAddUsuario(currentUsuario, fetchUsuariosData, setOpen, setCurrentUsuario, initialUser, setError, setModalErrors, setModalLoading);
  };

  const handleEditUsuarioWrapper = async () => {
    if (!validateFields()) return;
    handleEditUsuario(currentUsuario, fetchUsuariosData, setOpen, setCurrentUsuario, initialUser, setError, setModalErrors, setModalLoading);
  };

  const handleOpenEditModal = (usuario: UserModelWithRol) => {
    setCurrentUsuario(usuario);
    setEditMode(true);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setCurrentUsuario(initialUser);
    setEditMode(false);
    setOpen(true);
  };

  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleApplyFilters = (newFilters: Record<string, string | boolean | number | string[]>) => {
    // Primero actualizamos los filtros
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters }; // Fusionamos los nuevos filtros con los anteriores
      // Luego llamamos a fetchUsuariosData con los filtros actualizados
      fetchUsuarios(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters);
      return updatedFilters; // Retornamos los filtros actualizados al estado
    });
  };
  
  const handleClearFilters = () => {
    // Limpiamos los filtros
    setFilters(() => {
      const clearedFilters = {}; // Filtros vacíos
      // Luego llamamos a fetchUsuariosData con los filtros vacíos
      fetchUsuarios(page, pageSize, setRows, setRowCount, setError, setLoading, clearedFilters);
      return clearedFilters; // Retornamos los filtros vacíos al estado
    });
  };

  const handleRoleChange = (roleId: number) => {
    setCurrentUsuario((prev) => ({
      ...prev,
      roles: [{ id: roleId }],
      role_id: roleId
    }));
  };

  const handleTransportistaChange = (transportistaId: number | string) => {
    const id = typeof transportistaId === 'string' ? parseInt(transportistaId, 10) : transportistaId;

    if (!isNaN(id) && id > 0) {
      setCurrentUsuario((prev) => ({
        ...prev,
        persona_id: id,
        persona: {

          id: id,
          razon_social: '',
          email: '',
          localidad: '',
          ciudad: '',
          calle: '',
          numero_calle: '',
          piso: '',
          dpto: '',
          tel: '',
          cuit: ''


        }
      }));
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
          </div>
        </div>
      )}
      <Toolbar
        onAdd={handleOpenAddModal}
        onRefresh={fetchUsuariosData}
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
        experimentalFeatures={{ newEditingApi: true }}
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
      <UsuarioModal
        open={open}
        editMode={editMode}
        currentUsuario={currentUsuario}
        modalLoading={modalLoading}
       // validationError={validationError}
        modalErrors={modalErrors}
        onClose={() => setOpen(false)}
        onChange={(e) => setCurrentUsuario({ ...currentUsuario, [e.target.name]: e.target.value })}
        onSubmit={editMode ? handleEditUsuarioWrapper : handleAddUsuarioWrapper}
        onRoleChange={handleRoleChange}
        onTransportistaChange={handleTransportistaChange}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este Usuario? Esta acción no se puede deshacer.
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

export default UsuariosList;
