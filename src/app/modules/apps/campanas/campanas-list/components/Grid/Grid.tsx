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
  handleEnviarWhatsappMasivo,
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
import ContactoModal from '../table/modal/_contactoModal';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Estado para manejar el archivo cargado

  // Estado para el dialog de confirmación de envío masivo de correo
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [confirmWhatsappDialogOpen, setConfirmWhatsappDialogOpen] = useState<boolean>(false);
  const [selectedCampanaId, setSelectedCampanaId] = useState<number | null>(null);
  const [openFormFieldsModal, setOpenFormFieldsModal] = useState<boolean>(false);
  const [openCampanasModal, setOpenCampanaModal] = useState<boolean>(false);
  const [selectedFormularioId, setSelectedFormularioId] = useState<number | null>(null);
  const [SelectedContactoId, setSelectedContactoId] = useState<number | null>(null);
  

  const fetchCampanasData = useCallback(() => {
    fetchCampanas(page, pageSize, setRows, setRowCount, setError, setLoading, filters);
  }, [page, pageSize, filters]);

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    if (!isFirstLoad) {
      fetchCampanasData();
    } else {
      setIsFirstLoad(false);
    }
  }, [page, pageSize, filters, fetchCampanasData]);

  console.log('Estado de rows:', rows);

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

  // Función para abrir el modal de form_fields
  const handleOpenCampanaModal = (campanaId: number) => {
   
    setSelectedCampanaId(campanaId);
    setOpenCampanaModal(true);
  };

  const handleCloseFormFieldsModal = () => {
    setSelectedFormularioId(null);
    setOpenFormFieldsModal(false);
  };

  const handleCloseCampanaModal = () => {
    setSelectedCampanaId(null);
    setOpenCampanaModal(false);
  };

  const validateFields = (): boolean => {


    if (
      (!currentCampana.zona_reparto_id ||
        !currentCampana.lote_viaje_id) && !selectedFile
    ) {

      setValidationError('Debe elegir si crea la campaña a traves de una zona y un lote o de un archivo y completar los datos necesarios');

    }






    if (
      !currentCampana.nombre ||
      !currentCampana.descripcion ||
      !currentCampana.operacion_id ||
      !currentCampana.form_id
    ) {
      setValidationError('Los campos Nombre, Descripción, Operación  y Formulario son obligatorios.');
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
      setModalLoading,
      selectedFile // Asegúrate de pasar el archivo seleccionado al hacer submit
    );
  };

  const handleOpenAddModal = () => {
    setCurrentCampana(initialCampana);
    setModalLoading(false);
    setOpen(true);
    setSelectedFile(null);
    setModalErrors([]);
    setValidationError(null);
    setError("");


  };

  const handleOpenFilterModal = () => {
    setFilterDialogOpen(true);
  };

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      fetchCampanas(page, pageSize, setRows, setRowCount, setError, setLoading, updatedFilters);
      return updatedFilters;
    });
  };

  const handleClearFilters = () => {
    setFilters((prevFilters) => {
      const clearedFilters = {};
      fetchCampanas(page, pageSize, setRows, setRowCount, setError, setLoading, clearedFilters);
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
    if (response == 1) fetchCampanasData();
  };

  const enviarWhatsappMasivo = async (campanaId: number) => {
    const response = await handleEnviarWhatsappMasivo(campanaId, setError, setModalLoading);
    if (response == 1) fetchCampanasData();
  };

  const handleOpenConfirmDialog = (campanaId: number) => {
    setSelectedCampanaId(campanaId);
    setConfirmDialogOpen(true);
  };

  const handleOpenConfirmWhatsappDialog = (campanaId: number) => {
    setSelectedCampanaId(campanaId);
    setConfirmWhatsappDialogOpen(true);
  };

  const handleConfirmEnviarMasivo = async () => {
    if (selectedCampanaId !== null) {
      await enviarMasivo(selectedCampanaId);
    }
    setConfirmDialogOpen(false);
  };

  const handleConfirmEnviarWhatsappMasivo = async () => {
    if (selectedCampanaId !== null) {
      await enviarWhatsappMasivo(selectedCampanaId);
    }
    setConfirmWhatsappDialogOpen(false);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleCloseConfirmWhatsappDialog = () => {
    setConfirmWhatsappDialogOpen(false);
  };

  const handleCloseModal = () => {



    setOpen(false);

  }
  const columns = getColumns(handleExportarCsv, handleOpenConfirmDialog, handleOpenConfirmWhatsappDialog, handleOpenFormFieldsModal, handleOpenCampanaModal);

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
        onClose={handleCloseModal}
        onChange={(e) => setCurrentCampana({ ...currentCampana, [e.target.name]: e.target.value })}
        onSubmit={handleAddCampanaWrapper}
        onOperacionChange={handleOperacionChange}
        onZonasRepartoChange={handleZonaRepartoChange}
        onsetHtmlContent={handleHtmlPlantillaChange}
        onsetHtmlContentWhatsapp={handleHtmlWhatsappPlantillaChange}
        onFormChange={handleFormChange}
        onSetFile={setSelectedFile} // Pasamos la función para actualizar el archivo al modal
      />

      <FilterModal
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={handleApplyFilters}
      />

      <FormFieldsModal
        open={openFormFieldsModal}
        onClose={handleCloseFormFieldsModal}
        formularioId={selectedFormularioId}
      />

      <ContactoModal
        open={openCampanasModal}
        onClose={handleCloseCampanaModal}
        campanaId={selectedCampanaId}
      />

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
