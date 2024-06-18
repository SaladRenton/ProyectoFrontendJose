import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { revertirLote } from '../../../core/_requests';


interface RevertirLoteModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback para refrescar los datos después de la acción exitosa
}

const RevertirLoteModal: React.FC<RevertirLoteModalProps> = ({ open, onClose, onSuccess }) => {
  const [loteViajeId, setLoteViajeId] = useState<number | string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!loteViajeId || isNaN(Number(loteViajeId))) {
      setError('Debe ingresar un número de lote válido.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await revertirLote(Number(loteViajeId));
      onSuccess(); // Refresca los datos después de la acción exitosa
      onClose(); // Cierra el modal
    } catch (error) {
      setError('Error revirtiendo el lote.');
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Borrar Lote</DialogTitle>
      <DialogContent>
        <TextField
          label="Número de Lote"
          type="number"
          value={loteViajeId}
          onChange={(e) => setLoteViajeId(e.target.value)}
          fullWidth
          required
        />
        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {error}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleApply} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Aplicar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RevertirLoteModal;
