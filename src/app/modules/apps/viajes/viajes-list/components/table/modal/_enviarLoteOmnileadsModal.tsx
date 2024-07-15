// EnviarLoteOmnileadsModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

interface EnviarLoteOmnileadsModalProps {
  open: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const EnviarLoteOmnileadsModal: React.FC<EnviarLoteOmnileadsModalProps> = ({ open, onClose }) => {
  const [idLote, setIdLote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEnviarLote = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/viajes/procesar-lote`, { idLote });
      setMessage(response.data.message);
    } catch (err:any) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.idLote[0]);
      } else {
        setError('Ocurrió un error al procesar el lote.');
      }
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enviar Lote a Omnileads</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="ID Lote"
          fullWidth
          value={idLote}
          onChange={(e) => setIdLote(e.target.value)}
        />
        {loading && <CircularProgress />}
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleEnviarLote} color="primary" disabled={loading}>
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnviarLoteOmnileadsModal;