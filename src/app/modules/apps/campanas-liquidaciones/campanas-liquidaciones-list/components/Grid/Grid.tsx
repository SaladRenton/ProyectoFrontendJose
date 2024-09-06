import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import { ContactAttemptModel } from '../../core/_models'; // Importa la interfaz adaptada
import { getColumns } from '../../components/table/columns/_columns'; // Ajusta la ruta si es necesario
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import {
  fetchContactAttempt,
  exportarCalificaciones
} from '../../core/_handlers';
import { esES } from '@mui/x-data-grid/locales';
import ExportarCalificacionesModal from '../table/modal/_exportarCalificaciones';

const CampanasLiquidacionesList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<ContactAttemptModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [exportarCalificacionesModalOpen, setExportarCalificacionesModalOpen] = useState<boolean>(false);
  const [exportarCalificacionesErrors, setExportarCalificacionesErrors] = useState<string[]>([]);
  const [exportarCalificacionesLoading, setExportarCalificacionesLoading] = useState<boolean>(false);





  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchContactAttemptData = useCallback(() => {
    fetchContactAttempt(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);

  useEffect(() => {
    fetchContactAttemptData();
  }, [page, pageSize, fetchContactAttemptData]);



  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    setFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({});
    fetchContactAttemptData();
  };



  const handleExportarCalificacionesModal = () => {
    setExportarCalificacionesModalOpen(true);
  };
  
  const handleCloseExportarCalificacion = () => {
    setExportarCalificacionesModalOpen(false);
    setExportarCalificacionesErrors([]); // Clear previous errors
  };




  
  const handleExportarCalificaciones = async (filters: Record<string, string | boolean | number | string[]>) => {
    await exportarCalificaciones(filters, setError, setExportarCalificacionesErrors, setExportarCalificacionesLoading);
    if (error && error.length > 0) {
      setExportarCalificacionesModalOpen(false); // Close modal only if there are no errors
    }
  };




  const columns = getColumns();

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
        onOpenExportarViajesPorLoteModal={handleExportarCalificacionesModal}
        onRefresh={fetchContactAttemptData}
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


      <FilterModal
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={handleApplyFilters}
      />


      <ExportarCalificacionesModal
        open={exportarCalificacionesModalOpen}
        onClose={handleCloseExportarCalificacion}
        onSubmit={handleExportarCalificaciones}
        loading={exportarCalificacionesLoading}
        errors={exportarCalificacionesErrors}
      />

    </div>
  );
};

export default CampanasLiquidacionesList;
