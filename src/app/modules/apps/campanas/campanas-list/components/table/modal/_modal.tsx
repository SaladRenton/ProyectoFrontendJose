import React, { useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, Button, CircularProgress, FormControlLabel, Checkbox, Tabs, Tab, Box } from '@mui/material';
import { CampanaModel } from '../../../core/_models';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import FormCombo from '../../../../../../combos/components/FormCombo';
import OperacionZonaRepartoCombo from '../../../../../../combos/components/OperacionZonaRepartoCombo';
import HtmlEditor from '../../../../../../texteditor/components/HtmlEditor';
import WhatsAppTextEditor from '../../../../../../texteditor/components/WhatsAppTextEditor';
import { useDropzone } from 'react-dropzone';
import { downloadTemplateContactoCampana } from '../../../core/_requests';

interface CampanaModalProps {
  open: boolean;
  currentCampana: CampanaModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onOperacionChange: (value: number) => void;
  onZonasRepartoChange: (value: string[]) => void;
  onsetHtmlContent: (value: string) => void;
  onsetHtmlContentWhatsapp: (value: string) => void;
  onFormChange: (value: string) => void;
  onSetFile: (file: File | null) => void; // Nueva función para pasar el archivo al padre
}

const CampanaModal: React.FC<CampanaModalProps> = ({
  open,
  currentCampana,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit,
  onOperacionChange,
  onZonasRepartoChange,
  onsetHtmlContent,
  onsetHtmlContentWhatsapp,
  onFormChange,
  onSetFile, // Recibe la función del padre
}) => {
  const [operacionId, setOperacionId] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [generationMethod, setGenerationMethod] = useState<'lotes_zonas' | 'archivo'>('lotes_zonas'); // Controla la opción seleccionada

  const handleOperacionChange = (value: number) => {
    setOperacionId(value.toString());
    onOperacionChange(value);
  };

  const handleFormChange = (value: string) => {

    onFormChange(value);
  };

  const handleZonasRepartoChange = (value: string[]) => {

    onZonasRepartoChange(value);
  };

  const handleOnChange = (value: string) => {

    onsetHtmlContent(value);
  };

  const handleOnChangeWhatsapp = (value: string) => {

    onsetHtmlContentWhatsapp(value);
  };

  const handleDownloadTemplate = () => {
    downloadTemplateContactoCampana();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      onSetFile(selectedFile); // Pasa el archivo seleccionado al padre
      setResponseMessage(null); // Limpiar cualquier mensaje previo
    }
  }, [onSetFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1
  });

  const handleGenerationMethodChange = (method: 'lotes_zonas' | 'archivo') => {
    setGenerationMethod(method);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth style={{ minHeight: '500px' }}  // Establece un alto mínimo de 400px
    >
      <DialogTitle>{'Agregar nueva Campaña'}</DialogTitle>
      <DialogContent>
        <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="General" />
          <Tab label="Filtros para generarla" />
          <Tab label="Correo Masivo" />
          <Tab label="Agenda" />
          <Tab label="Envío por Waapi" />
        </Tabs>

        {/* Tab General */}
        {selectedTab === 0 && (
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              fullWidth
              required
              value={currentCampana.nombre}
              onChange={onChange}
              name="nombre"
            />
            <TextField
              margin="dense"
              label="Descripción"
              fullWidth
              required
              value={currentCampana.descripcion}
              onChange={onChange}
              name="descripcion"
            />


            <OperacionCombo
              value={currentCampana.operacion_id}
              onChange={(value) => handleOperacionChange(value as number)}
            />

            <FormCombo operacion_id={operacionId}
              value={currentCampana.form_id as string}
              onChange={(value) => handleFormChange(value)}
            />
          </Box>
        )}

        {/* Tab Filtros para generarla */}
        {selectedTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography>Puedes generar los viajes en base a Lotes y Zonas o cargar un archivo Excel.</Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={generationMethod === 'lotes_zonas'}
                  onChange={() => handleGenerationMethodChange('lotes_zonas')}
                  color="primary"
                />
              }
              label="A través de lotes y zonas"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={generationMethod === 'archivo'}
                  onChange={() => handleGenerationMethodChange('archivo')}
                  color="primary"
                />
              }
              label={
                <span>
                  A través de un archivo XLSX (
                  <Button onClick={handleDownloadTemplate} color="primary">
                    Descargue el modelo aquí
                  </Button>.)
                </span>
              }
            />

            {generationMethod === 'lotes_zonas' ? (
              <>
                <TextField
                  label="Listado de Lotes"
                  placeholder='Ej: 2,3,4'
                  fullWidth
                  name="lote_viaje_id"
                  value={currentCampana.lote_viaje_id}
                  onChange={onChange}
                  margin="dense"
                />
                <OperacionZonaRepartoCombo
                  operacionId={operacionId}
                  value={currentCampana.zona_reparto_id}
                  onChange={(value) => handleZonasRepartoChange(value)}
                />
              </>
            ) : (
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed grey',
                  padding: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  marginTop: 2,
                  borderRadius: 2,
                  bgcolor: isDragActive ? 'lightblue' : 'inherit'
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Typography>¡Suelta el archivo aquí!</Typography>
                ) : (
                  <Typography>
                    Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno
                  </Typography>
                )}
                {file && (
                  <Typography sx={{ mt: 2 }}>
                    Archivo seleccionado: {file.name}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        )}

        {/* Tab Correo Masivo */}
        {selectedTab === 2 && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Asunto del correo"
              fullWidth
              margin="dense"
              name="asunto_correo"
              value={currentCampana.asunto_correo}
              onChange={onChange}
            />
            <HtmlEditor value={currentCampana.plantilla_email} onChange={handleOnChange} />
          </Box>
        )}

        {/* Tab Agenda */}
        {selectedTab === 3 && (
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentCampana.fecha_limitada_agenda}
                  onChange={onChange}
                  name="fecha_limitada_agenda"
                  color="primary"
                />
              }
              label="La disponibilidad funciona con la agenda del transportista asignado"
            />

            <TextField
              label="Limitar a X días para adelante la agenda"
              type="number"
              fullWidth
              name="limite_dias_cita"
              value={currentCampana.limite_dias_cita}
              onChange={onChange}
              margin="dense"
            />
          </Box>
        )}

        {/* Tab Envío por Waapi */}
        {selectedTab === 4 && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="API Token"
              fullWidth
              margin="dense"
              name="waapi_api_token"
              value={currentCampana.waapi_api_token || ''}
              onChange={onChange}
            />
            <TextField
              label="Instance ID"
              fullWidth
              name="waapi_instance_id"
              value={currentCampana.waapi_instance_id || ''}
              onChange={onChange}
            />
            <WhatsAppTextEditor value={currentCampana.plantilla_whatsapp} onChange={handleOnChangeWhatsapp} />
          </Box>
        )}

        {validationError && (
          <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
            <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
            <div className="d-flex flex-column">
              <h5 className="mb-1">Hay errores de validación</h5>
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
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onSubmit} color="primary" disabled={modalLoading}>
          {modalLoading ? <CircularProgress size={24} /> : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampanaModal;
