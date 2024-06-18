import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';

interface AsignarZonasModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (lote: number) => void;
  loading: boolean;
  errors: string[];
}

const AsignarZonasModal: React.FC<AsignarZonasModalProps> = ({ open, onClose, onSubmit, loading, errors }) => {
  const [lote, setLote] = useState<number | null>(null);

  const handleLoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLote(Number(e.target.value));
  };

  const handleSubmit = () => {
    if (lote) {
      onSubmit(lote);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Asignar Zonas</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingrese el número de lote para asignar las zonas.
        </DialogContentText>
        <TextField
          margin="dense"
          label="Lote"
          fullWidth
          value={lote || ''}
          onChange={handleLoteChange}
        />
        {errors.length > 0 && (
          <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
            <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
            <div className="d-flex flex-column">
              <h5 className="mb-1">Error</h5>
              <span>{errors.join(' ')}</span>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading || !lote}>
          {loading ? <CircularProgress size={24} /> : 'Asignar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AsignarZonasModal;
