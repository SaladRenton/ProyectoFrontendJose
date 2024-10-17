import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { CentroDistribucionModel } from '../../../core/_models';

interface CentroDistribucionModalProps {
  open: boolean;
  editMode: boolean;
  currentCentroDistribucion: CentroDistribucionModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const CentroDistribucionModal: React.FC<CentroDistribucionModalProps> = ({
  open,
  editMode,
  currentCentroDistribucion,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? 'Editar Centro de Distribución' : 'Agregar Nuevo Centro de Distribución'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          fullWidth
          required
          value={currentCentroDistribucion.nombre}
          onChange={onChange}
          name="nombre"
        />
      
        <TextField
          margin="dense"
          label="Latitud"
          type='number'
          fullWidth
          value={currentCentroDistribucion.latitud}
          onChange={onChange}
          name="latitud"
        />
        <TextField
          margin="dense"
          label="Longitud"
          type='number'
          fullWidth
          value={currentCentroDistribucion.longitud}
          onChange={onChange}
          name="longitud"
        />
        
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
          {modalLoading ? <CircularProgress size={24} /> : editMode ? 'Actualizar' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CentroDistribucionModal;
