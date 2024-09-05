import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { CampanaModel, initialCampana } from '../../core/_models'; // Importa la interfaz adaptada
import { getColumns } from '../../components/table/columns/_columns'; // Ajusta la ruta si es necesario
import CampanaModal from '../../components/table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import {
  fetchCampanas,
  handleProcessRowUpdate,
  handleAddCampana,
  handleDownloadCsv
} from '../../core/_handlers';
import { esES } from '@mui/x-data-grid/locales';

const CampanasList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<CampanaModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const [currentCampana, setCurrentCampana] = useState<CampanaModel>(initialCampana);


  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchCampanasData = useCallback(() => {
    fetchCampanas(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);

  useEffect(() => {
    fetchCampanasData();
  }, [page, pageSize, fetchCampanasData]);

  const handleProcessRowUpdateWrapper = async (newRow: GridRowModel<CampanaModel>, oldRow: GridRowModel<CampanaModel>) => {
    return handleProcessRowUpdate(newRow, oldRow, setError);
  };



  const validateFields = (): boolean => {
    if (!currentCampana.nombre || !currentCampana.descripcion || !currentCampana.operacion_id || !currentCampana.zona_reparto_id) {
      setValidationError('Los campos Nombre , descripción,operación y zona de reparto son obligatorios.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddCampanaWrapper = async () => {
    if (!validateFields()) return;
    handleAddCampana(currentCampana, fetchCampanasData, setOpen, setCurrentCampana, initialCampana, setError, setModalErrors, setModalLoading);
  };

 

  const handleOpenAddModal = () => {
    setCurrentCampana(initialCampana);
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
    fetchCampanasData();
  };

  
  const handleOperacionChange = (operacion_id: number) => {
    setCurrentCampana((prev) => ({
      ...prev,
      operacion_id: operacion_id,
 
    }));
  };



  
  const handleZonaRepartoChange = (zona_reparto_id: string[]) => {
    setCurrentCampana((prev) => ({
      ...prev,
      zona_reparto_id: zona_reparto_id,
 
    }));
  };

  
  const handleExportarCsv = async (campanaId: number) => {
    await handleDownloadCsv(campanaId, setError, setModalLoading);
   
  };


  const columns = getColumns(handleExportarCsv);

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
        onRefresh={fetchCampanasData}
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
            textTransform: 'uppercase'

          }
        }}

      />
      <CampanaModal
        open={open}
        currentCampana={currentCampana}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={() => setOpen(false)}
        onChange={(e) => setCurrentCampana({ ...currentCampana, [e.target.name]: e.target.value })}
        onSubmit={handleAddCampanaWrapper}
        onOperacionChange={handleOperacionChange}
        onZonasRepartoChange={handleZonaRepartoChange}
      />

      <FilterModal
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={handleApplyFilters}
      />

     
    </div>
  );
};

export default CampanasList;
