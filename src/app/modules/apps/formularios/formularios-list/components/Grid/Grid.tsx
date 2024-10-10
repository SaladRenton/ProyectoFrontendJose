import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { FormularioModel, initialFormulario } from '../../core/_models'; 
import { getColumns } from '../../components/table/columns/_columns';
import FormularioModal from '../../components/table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import {
  fetchFormularios,
  handleAddFormulario,
} from '../../core/_handlers';
import { esES } from '@mui/x-data-grid/locales';


const FormulariosList: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<FormularioModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const [currentFormulario, setCurrentFormulario] = useState<FormularioModel>(initialFormulario);
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchFormulariosData = useCallback(() => {
    fetchFormularios(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);  // Variable de control para el primer montaje

  useEffect(() => {
    if (!isFirstLoad) {
      fetchFormulariosData();
    } else {
      setIsFirstLoad(false);  // Marca que ya hemos pasado el primer render
    }
  }, [page, pageSize, filters, fetchFormulariosData]);

  const validateFields = (): boolean => {
    if (!currentFormulario.name || !currentFormulario.operacion_id) {
      setValidationError('Los campos Nombre y Operación son obligatorios.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddFormularioWrapper = async (formData: any) => {
    if (!validateFields()) return;
    handleAddFormulario(
      formData, // Ahora enviamos el form_data completo con form_field
      fetchFormulariosData,
      setOpen,
      setCurrentFormulario,
      initialFormulario,
      setError,
      setModalErrors,
      setModalLoading
    );
  };

  const handleOpenAddModal = () => {
    setCurrentFormulario(initialFormulario);
    setOpen(true);
  };

  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      fetchFormularios(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters); // Llamada con los filtros actualizados
      return updatedFilters;
    });
  };
  
  const handleClearFilters = () => {
    setFilters((prevFilters) => {
      const clearedFilters = {};
      fetchFormularios(page, pageSize, setRows, setRowCount, setError, setLoading, clearedFilters); // Llamada con filtros vacíos
      return clearedFilters;
    });
  };

  const handleOperacionChange = (operacion_id: number) => {
    setCurrentFormulario((prev) => ({
      ...prev,
      operacion_id: operacion_id,
    }));
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
        onAdd={handleOpenAddModal}
        onRefresh={fetchFormulariosData}
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
          },
        }}
      />
      <FormularioModal
        open={open}
        currentFormulario={currentFormulario}
        modalLoading={modalLoading}
        validationError={validationError}
        modalErrors={modalErrors}
        onClose={() => setOpen(false)}
        onChange={(e) => setCurrentFormulario({ ...currentFormulario, [e.target.name]: e.target.value })}
        onSubmit={handleAddFormularioWrapper}
        onOperacionChange={handleOperacionChange}
      />

      <FilterModal
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default FormulariosList;
