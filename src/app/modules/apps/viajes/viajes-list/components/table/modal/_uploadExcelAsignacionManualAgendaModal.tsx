import React, { useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, Typography, Box, Alert, AlertTitle } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { uploadFileAsignacionAgendaManual, downloadTemplateAgenda } from '../../../core/_requests';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';

interface UploadExcelAsignacionManualAgendaModalProps {
  open: boolean;
  onClose: () => void;
}
const API_URL = import.meta.env.VITE_APP_API_URL;

const UploadExcelAsignacionManualAgendaModal: React.FC<UploadExcelAsignacionManualAgendaModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [operacionId, setOperacionId] = useState<number | string>('');
  const [error, setError] = useState<string | undefined>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setResponseMessage(null); // Limpiar cualquier mensaje previo
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1
  });

  const handleDownloadTemplate = () => {
    if (!operacionId) {
      setError('Debe seleccionar una operación antes de descargar el modelo.');
      return;
    }
    downloadTemplateAgenda(operacionId);
  };

  const handleUpload = async () => {
    if (!file) {
      setResponseMessage('Debes seleccionar un archivo.');
      return;
    }
    setLoading(true);
    setResponseMessage(null);
    try {
      const response = await uploadFileAsignacionAgendaManual(file,operacionId);
      setResponseMessage(response || 'Archivo subido correctamente.');
    } catch (err: any) {
      setResponseMessage(err.message || 'Error al subir el archivo.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setResponseMessage(null); // Limpiar el mensaje de respuesta
    setOperacionId(null); // Limpiar la operación seleccionada
    setError(''); // Limpiar errores
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Asignación Manual de Agenda</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom fontWeight={"bold"}>
          Siga los siguientes pasos para realizar la asignación manual de agenda:
        </Typography>
        <Typography variant="body1" gutterBottom>
          1) Seleccione una operación:
        </Typography>
        <OperacionCombo
          value={operacionId?.toString() || ''}
          onChange={(id) => setOperacionId(Number(id))}
          error={!!error}
          helperText={error}
        />
        <Typography variant="body1" gutterBottom>
          2) Descargar el modelo de importación desde{' '}
          <Button onClick={handleDownloadTemplate} color="primary">
            aquí
          </Button>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          3) Completa con los valores deseados.
        </Typography>
        <Typography variant="body1" gutterBottom>
          4) Sube el archivo Excel.
        </Typography>
        <Typography variant="body1" gutterBottom>
          5) Si la importación tiene errores, revisa el archivo Excel en la carpeta de descargas.
        </Typography>
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
        {responseMessage && (
          responseMessage.startsWith('Error') ?
            <Alert severity="error" sx={{ mt: 2 }}>
              <AlertTitle>Error</AlertTitle>
              {responseMessage}
            </Alert>
            :
            <Alert severity="success" sx={{ mt: 2 }}>
              <AlertTitle>Éxito</AlertTitle>
              {responseMessage}
            </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={loading}>
          Cerrar
        </Button>
        <Button onClick={handleUpload} color="primary" disabled={loading || !file}>
          {loading ? <CircularProgress size={24} /> : 'Subir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadExcelAsignacionManualAgendaModal;
