import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, TextField } from '@mui/material';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import { uploadFile } from '../../../core/_requests';

interface UploadPaqueteModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadPaqueteModal: React.FC<UploadPaqueteModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [operacionId, setOperacionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !operacionId) {
      setError('Debes seleccionar un archivo y una operación.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await uploadFile(file, operacionId);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al subir el archivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Subir Paquetes</DialogTitle>
      <DialogContent>
        <OperacionCombo
          value={operacionId?.toString() || ''}
          onChange={(id) => setOperacionId(Number(id))}
        />
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          style={{ marginTop: 20 }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleUpload} color="primary" disabled={loading || !file || !operacionId}>
          {loading ? <CircularProgress size={24} /> : 'Subir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadPaqueteModal;
