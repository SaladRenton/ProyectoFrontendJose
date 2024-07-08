import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, TextField } from '@mui/material';
import { downloadCSV } from '../../../core/_requests';

interface DownloadCSVModalProps {
  open: boolean;
  onClose: () => void;
}

const DownloadCSVModal: React.FC<DownloadCSVModalProps> = ({ open, onClose }) => {
  const [loteViajeId, setLoteViajeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!loteViajeId) {
      setError('Debes ingresar un Lote Viaje ID.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await downloadCSV(loteViajeId);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al descargar el archivo CSV.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Descargar CSV</DialogTitle>
      <DialogContent>
        <TextField
          label="Lote Viaje ID"
          type="number"
          fullWidth
          value={loteViajeId || ''}
          onChange={(e) => setLoteViajeId(Number(e.target.value))}
          margin="dense"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleDownload} color="primary" disabled={loading || !loteViajeId}>
          {loading ? <CircularProgress size={24} /> : 'Descargar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadCSVModal;