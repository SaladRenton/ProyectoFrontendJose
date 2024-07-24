import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, TextField, Grid } from '@mui/material';
import { downloadCSV } from '../../../core/_requests';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import OperacionZonaRepartoCombo from '../../../../../../combos/components/OperacionZonaRepartoCombo';

interface DownloadCSVModalProps {
  open: boolean;
  onClose: () => void;
}

const DownloadCSVModal: React.FC<DownloadCSVModalProps> = ({ open, onClose }) => {
  const [loteViajeId, setLoteViajeId] = useState<number | null>(null);
  const [operacionId, setOperacionId] = useState<string>('');
  const [zonaRepartoId, setZonaRepartoId] = useState<string[]>([]);
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
      await downloadCSV(loteViajeId, operacionId, zonaRepartoId);
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Lote Viaje ID"
              type="number"
              fullWidth
              value={loteViajeId || ''}
              onChange={(e) => setLoteViajeId(Number(e.target.value))}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12}>
            <OperacionCombo
              value={operacionId as string}
              onChange={(value) => setOperacionId(value as string)}
            />
          </Grid>
          <Grid item xs={12}>
            <OperacionZonaRepartoCombo
              operacionId={operacionId}
              value={zonaRepartoId}
              onChange={(value) => setZonaRepartoId(value)}
            />
          </Grid>
        </Grid>
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
