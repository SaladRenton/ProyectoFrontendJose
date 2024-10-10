import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridRowModel } from '@mui/x-data-grid';
import { CampanaModel, initialCampana } from '../../core/_models';
import { getColumns } from '../../components/table/columns/_columns';
import CampanaModal from '../../components/table/modal/_modal';
import FilterModal from '../table/modal/_filterModal';
import Toolbar from '../toolbar/toolbars/toolbar';
import {
  fetchCampanas,
  handleProcessRowUpdate,
  handleAddCampana,
  handleDownloadCsv,
  handleEnviarMasivo,
  handleEnviarWhatsappMasivo, // Handler para el envío de WhatsApp
} from '../../core/_handlers';
import { esES } from '@mui/x-data-grid/locales';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import FormFieldsModal from '../table/modal/_formFieldsModal';

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

  // Estado para el dialog de confirmación de envío masivo de correo
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [confirmWhatsappDialogOpen, setConfirmWhatsappDialogOpen] = useState<boolean>(false); // Dialog para WhatsApp
  const [selectedCampanaId, setSelectedCampanaId] = useState<number | null>(null);
  const [openFormFieldsModal, setOpenFormFieldsModal] = useState<boolean>(false);
  const [selectedFormularioId, setSelectedFormularioId] = useState<number | null>(null);



  const fetchCampanasData = useCallback(() => {
    fetchCampanas(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);  // Variable de control para el primer montaje

  // useEffect para controlar la primera carga
  useEffect(() => {
    if (!isFirstLoad) {
      fetchCampanasData();
    } else {
      setIsFirstLoad(false);  // Marca que ya hemos pasado el primer render
    }
  }, [page, pageSize, filters, fetchCampanasData]);


  const handleProcessRowUpdateWrapper = async (
    newRow: GridRowModel<CampanaModel>,
    oldRow: GridRowModel<CampanaModel>
  ) => {
    return handleProcessRowUpdate(newRow, oldRow, setError);
  };


  // Función para abrir el modal de form_fields
  const handleOpenFormFieldsModal = (formularioId: number) => {
    setSelectedFormularioId(formularioId);
    setOpenFormFieldsModal(true);
  };

  // Función para cerrar el modal de form_fields
  const handleCloseFormFieldsModal = () => {
    setSelectedFormularioId(null);
    setOpenFormFieldsModal(false);
  };

  const validateFields = (): boolean => {
    if (
      !currentCampana.nombre ||
      !currentCampana.descripcion ||
      !currentCampana.operacion_id ||
      !currentCampana.zona_reparto_id ||
      !currentCampana.form_id
    ) {
      setValidationError('Los campos Nombre, Descripción, Operación, Zona de reparto y Formulario son obligatorios.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddCampanaWrapper = async () => {
    if (!validateFields()) return;
    handleAddCampana(
      currentCampana,
      fetchCampanasData,
      setOpen,
      setCurrentCampana,
      initialCampana,
      setError,
      setModalErrors,
      setModalLoading
    );
  };

  const handleOpenAddModal = () => {
    setCurrentCampana(initialCampana);
    setOpen(true);
  };

  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      fetchCampanas(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters); // Llamada con los filtros actualizados
      return updatedFilters;
    });
  };

  const handleClearFilters = () => {
    setFilters((prevFilters) => {
      const clearedFilters = {};
      fetchCampanas(page, pageSize, setRows, setRowCount, setError, setLoading, clearedFilters); // Llamada con filtros vacíos
      return clearedFilters;
    });
  };


  const handleOperacionChange = (operacion_id: number) => {
    setCurrentCampana((prev) => ({
      ...prev,
      operacion_id: operacion_id,
    }));
  };

  const handleFormChange = (form_id: string) => {
    setCurrentCampana((prev) => ({
      ...prev,
      form_id: form_id,
    }));
  };

  const handleZonaRepartoChange = (zona_reparto_id: string[]) => {
    setCurrentCampana((prev) => ({
      ...prev,
      zona_reparto_id: zona_reparto_id,
    }));
  };

  const handleHtmlPlantillaChange = (plantilla_email: string) => {
    setCurrentCampana((prev) => ({
      ...prev,
      plantilla_email: plantilla_email,
    }));
  };


  const handleHtmlWhatsappPlantillaChange = (plantilla_whatsapp: string) => {
    setCurrentCampana((prev) => ({
      ...prev,
      plantilla_whatsapp: plantilla_whatsapp,
    }));
  };

  const handleExportarCsv = async (campanaId: number) => {
    await handleDownloadCsv(campanaId, setError, setModalLoading);
  };

  const enviarMasivo = async (campanaId: number) => {
    const response = await handleEnviarMasivo(campanaId, setError, setModalLoading);
    if (response == 1)//si esta todo bien refresco la grilla
      fetchCampanasData();
  };

  const enviarWhatsappMasivo = async (campanaId: number) => {
    const response = await handleEnviarWhatsappMasivo(campanaId, setError, setModalLoading);
    if (response == 1)//si esta todo bien refresco la grilla
      fetchCampanasData();
  };

  // Abrir el diálogo de confirmación para correos
  const handleOpenConfirmDialog = (campanaId: number) => {
    setSelectedCampanaId(campanaId);
    setConfirmDialogOpen(true);
  };

  // Abrir el diálogo de confirmación para WhatsApp
  const handleOpenConfirmWhatsappDialog = (campanaId: number) => {
    setSelectedCampanaId(campanaId);
    setConfirmWhatsappDialogOpen(true);
  };

  // Confirmar envío masivo de correos después del diálogo
  const handleConfirmEnviarMasivo = async () => {
    if (selectedCampanaId !== null) {
      await enviarMasivo(selectedCampanaId);
    }
    setConfirmDialogOpen(false); // Cerrar el diálogo después del envío
  };

  // Confirmar envío masivo de WhatsApp después del diálogo
  const handleConfirmEnviarWhatsappMasivo = async () => {
    if (selectedCampanaId !== null) {
      await enviarWhatsappMasivo(selectedCampanaId);
    }
    setConfirmWhatsappDialogOpen(false); // Cerrar el diálogo después del envío
  };

  // Cancelar el diálogo de confirmación para correos
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  // Cancelar el diálogo de confirmación para WhatsApp
  const handleCloseConfirmWhatsappDialog = () => {
    setConfirmWhatsappDialogOpen(false);
  };

  const columns = getColumns(handleExportarCsv, handleOpenConfirmDialog, handleOpenConfirmWhatsappDialog,handleOpenFormFieldsModal); // Incluimos ambos diálogos

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
        onsetHtmlContent={handleHtmlPlantillaChange}
        onsetHtmlContentWhatsapp={handleHtmlWhatsappPlantillaChange}
        onFormChange={handleFormChange}

      />

      <FilterModal
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={handleApplyFilters}
      />

      {/* Diálogo de confirmación para correos */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{"Confirmar Envío Masivo de Correos"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            ¿Desea generar el envío masivo de correos para esta campaña?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmEnviarMasivo} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>


      <FormFieldsModal
          open={openFormFieldsModal}
          onClose={handleCloseFormFieldsModal}
          formularioId={selectedFormularioId}
        />

      {/* Diálogo de confirmación para WhatsApp */}
      <Dialog
        open={confirmWhatsappDialogOpen}
        onClose={handleCloseConfirmWhatsappDialog}
        aria-labelledby="confirm-whatsapp-dialog-title"
        aria-describedby="confirm-whatsapp-dialog-description"
      >
        <DialogTitle id="confirm-whatsapp-dialog-title">{"Confirmar Envío Masivo de WhatsApp"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-whatsapp-dialog-description">
            ¿Desea generar el envío masivo de mensajes por WhatsApp para esta campaña?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmWhatsappDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmEnviarWhatsappMasivo} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CampanasList;