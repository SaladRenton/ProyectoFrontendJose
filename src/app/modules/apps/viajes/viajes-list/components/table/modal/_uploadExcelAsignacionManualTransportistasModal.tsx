import React, { useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, Typography, Box, Alert, AlertTitle } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { uploadFileAsignacionTransportistasManual,downloadTemplate } from '../../../core/_requests';

interface UploadExcelAsignacionManualTransportistasModalProps {
  open: boolean;
  onClose: () => void;
}
const API_URL = import.meta.env.VITE_APP_API_URL;


const UploadExcelAsignacionManualTransportistasModal: React.FC<UploadExcelAsignacionManualTransportistasModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // Cambiar el nombre de error a responseMessage para manejar tanto éxito como error

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

  const handleUpload = async () => {
    if (!file) {
      setResponseMessage('Debes seleccionar un archivo.');
      return;
    }
    setLoading(true);
    setResponseMessage(null);
    try {
      const response = await uploadFileAsignacionTransportistasManual(file);
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
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Asignacion Manual de transportistas</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom fontWeight={"bold"}>
          Siga los siguientes pasos para realizar la asignación manual de transportistas:
        </Typography>
        <Typography variant="body1" gutterBottom>
          1) Descargar el modelo de importación desde{' '}
          <Button onClick={downloadTemplate} color="primary">
            aquí
          </Button>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          2) Completa con los valores deseados.
        </Typography>
        <Typography variant="body1" gutterBottom>
          3) Sube el archivo Excel.
        </Typography>
        <Typography variant="body1" gutterBottom>
          4) Si la importación tiene errores, revisa el archivo Excel en la carpeta de descargas.
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

export default UploadExcelAsignacionManualTransportistasModal;
