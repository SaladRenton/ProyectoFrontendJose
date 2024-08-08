// components/table/modal/ExportarViajesPorLoteModal.tsx

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';

interface ExportarViajesPorLoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (lote: number) => void;
  loading: boolean;
  errors: string[];
}

const ExportarViajesPorLoteModal: React.FC<ExportarViajesPorLoteModalProps> = ({ open, onClose, onSubmit, loading, errors }) => {
  const [lote, setLote] = useState<number | string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setLote(Number(value));
    } else {
      setLote(value);
    }
  };

  const handleSubmit = () => {
    if (typeof lote === 'number') {
      onSubmit(lote);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Exportar Lote en XLSX</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Lote Viaje ID"
          fullWidth
          value={lote}
          onChange={handleChange}
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
        <Button onClick={handleSubmit} color="primary" disabled={loading || typeof lote !== 'number'}>
          {loading ? <CircularProgress size={24} /> : 'Descargar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportarViajesPorLoteModal;
