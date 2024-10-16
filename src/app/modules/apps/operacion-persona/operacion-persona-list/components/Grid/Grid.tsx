import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { OperacionPersonaModel, initialOperacionPersona } from '../../core/_models'; // Importa la interfaz adaptada
import { getColumns } from '../table/columns/_columns'; // Ajusta la ruta si es necesario
import OperacionPersonaModal from '../table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import { Button } from '@mui/material';
import {
  fetchOperacionesPersona,
  handleAddOperacionPersona,
  handleDeleteRow,
} from '../../core/_handlers';
import { esES } from '@mui/x-data-grid/locales';
import { useParams } from 'react-router-dom'


const OperacionPersonasList: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Obtienes el id de la operación
  const operacionId = id.toString();
  const [rows, setRows] = useState<GridRowsProp<OperacionPersonaModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const [currentOperacionPersona, setCurrentOperacionPersona] = useState<OperacionPersonaModel>(initialOperacionPersona);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);  // Variable de control para el primer montaje

  const fetchOperacionesPersonaData = useCallback(() => {

    const updatedFilters: Record<string, string> = { 
      ...filters, 
      operacion_id: id.toString() // Convertimos id a string
    };
    fetchOperacionesPersona(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters);
  }, [page, pageSize, filters,id]);

  useEffect(() => {
    if (!isFirstLoad) {
      fetchOperacionesPersonaData();
    } else {
      setIsFirstLoad(false);  // Marca que ya hemos pasado el primer render
    }
  }, [page, pageSize, fetchOperacionesPersonaData]);



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
    if (!currentOperacionPersona.persona_id) {
      setValidationError('La seleccion de un transportista es obligatoria.');
      return false;
    }
    setValidationError(null);
    return true;
  };



  const handleOpenAddModal = () => {
    setCurrentOperacionPersona(initialOperacionPersona);
    setOpen(true);
  };

  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    // Actualiza los filtros y después ejecuta fetchOperacionesPersonaData
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      fetchOperacionesPersona(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters);
      return updatedFilters;
    });
  };

  const handleAddOperacionPersonaWrapper = async () => {
    if (!validateFields()) return;
    handleAddOperacionPersona(currentOperacionPersona, fetchOperacionesPersonaData, setOpen, setCurrentOperacionPersona, initialOperacionPersona, setError, setModalErrors, setModalLoading);
  };

  const handleClearFilters = () => {
    // Limpia los filtros y después ejecuta fetchOperacionesPersonaData
    setFilters(() => {
      fetchOperacionesPersona(page, pageSize, setRows, setRowCount, setError, setLoading, {});
      return {};
    });
  };

  const handleTransportistaChange = (transportistaId: number | string) => {
    const id = typeof transportistaId === 'string' ? parseInt(transportistaId, 10) : transportistaId;

    if (!isNaN(id) && id > 0) {
      setCurrentOperacionPersona((prev) => ({
        ...prev,
        persona_id: id,
        operacion_id:operacionId
      }));
    }
  };


  const columns = getColumns(handleDeleteRowWrapper);

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
        onRefresh={fetchOperacionesPersonaData}
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
      <OperacionPersonaModal
        open={open}
        currentOperacionPersona ={currentOperacionPersona}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={() => setOpen(false)}
        onTransportistaChange={handleTransportistaChange}
        onSubmit={handleAddOperacionPersonaWrapper}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas desasociar este Transportista? Esta acción no se puede deshacer.
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

export default OperacionPersonasList;
