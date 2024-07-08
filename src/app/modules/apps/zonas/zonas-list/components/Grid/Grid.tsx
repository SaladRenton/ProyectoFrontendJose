import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress ,Button} from '@mui/material';
import { ZonaModel, initialZona } from '../../core/_models'; // Importa la interfaz adaptada
import { getColumns } from '../../components/table/columns/_columns'; // Ajusta la ruta si es necesario
import ZonaModal from '../../components/table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import OpenStreetMapModal from '../../components/table/modal/_OpenStreetMapModal'; // Importa el modal de OpenStreetMap
import {
  fetchZonas,
  handleProcessRowUpdate,
  handleDeleteRow,
  handleEditZona
} from '../../core/_handlers';
import { esES  } from '@mui/x-data-grid/locales';


const ZonasList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<ZonaModel>>([]);
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
  const [currentZona, setCurrentZona] = useState<ZonaModel>(initialZona);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [mapDialogOpen, setMapDialogOpen] = useState<boolean>(false); // Estado para el modal de OpenStreetMap
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchZonasData = useCallback(() => {
    const adjustedFilters = { ...filters };

    // Renombrar los filtros para que sean `latitude` y `longitude`
    if (filters.lat) {
      adjustedFilters.location = filters.lat+","+filters.lng;
      delete adjustedFilters.lat;
    }
    if (filters.lng) {
     // adjustedFilters.longitude = filters.lng;
      delete adjustedFilters.lng;
    }

    fetchZonas(page, pageSize, setRows, setRowCount, setError, setLoading, adjustedFilters);
  }, [page, pageSize, filters]);

  useEffect(() => {
    fetchZonasData();
  }, [page, pageSize, fetchZonasData]);

  const handleProcessRowUpdateWrapper = async (newRow: GridRowModel<ZonaModel>, oldRow: GridRowModel<ZonaModel>) => {
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
    if (!currentZona.nombre || !currentZona.codigo_zona) {
      setValidationError('Los campos Nombre y codigo de zona son obligatorios.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleEditZonaWrapper = async () => {
    if (!validateFields()) return;
    handleEditZona(currentZona, fetchZonasData, setOpen, setCurrentZona, initialZona, setError, setModalErrors, setModalLoading);
  };

  const handleOpenEditModal = (zona: ZonaModel) => {
    setCurrentZona(zona);
    setEditMode(true);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setCurrentZona(initialZona);
    setEditMode(false);
    setOpen(true);
  };

  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleOpenMapModal = () => {
    setMapDialogOpen(true);
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    setFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({});
    fetchZonasData();
  };

  const handleSelectLocation = (lat: number, lng: number) => {
    setFilters({
      ...filters,
      lat: lat.toString(),
      lng: lng.toString(),
    });
    fetchZonasData();
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
        onRefresh={fetchZonasData}
        onOpenFilterModal={handleOpenFilterModal}
        onClearFilters={handleClearFilters}
        onOpenMapModal={handleOpenMapModal}
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
      />
      <ZonaModal
        open={open}
        currentZona={currentZona}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={() => setOpen(false)}
        onChange={(e) => setCurrentZona({ ...currentZona, [e.target.name]: e.target.value })}
        onSubmit={handleEditZonaWrapper}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta Zona? Esta acción no se puede deshacer.
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
      <OpenStreetMapModal
        open={mapDialogOpen}
        onClose={() => setMapDialogOpen(false)}
        onSelectLocation={handleSelectLocation}
      />
    </div>
  );
};

export default ZonasList;
