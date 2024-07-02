import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { PaqueteModel } from '../../../core/_models';

interface PaqueteModalProps {
  open: boolean;
  editMode: boolean;
  currentPaquete: PaqueteModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const PaqueteModal: React.FC<PaqueteModalProps> = ({
  open,
  editMode,
  currentPaquete,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? 'Editar Paquete' : 'Agregar Nuevo Paquete'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Descripcion"
          fullWidth
          required
          value={currentPaquete.descripcion}
          onChange={onChange}
          name="descripcion"
        />
        <TextField
          margin="dense"
          label="Peso"
          fullWidth
          required
          value={currentPaquete.peso}
          onChange={onChange}
          name="peso"
        />
        <TextField
          margin="dense"
          label="Cod. Barra"
          fullWidth
          value={currentPaquete.codigo_barra}
          onChange={onChange}
          name="codigo_barra"
        />
        <TextField
          margin="dense"
          label="Número Serie"
          fullWidth
          value={currentPaquete.numero_serie}
          onChange={onChange}
          name="numero_serie"
        />
        <TextField
          margin="dense"
          label="Mac"
          fullWidth
          value={currentPaquete.mac}
          onChange={onChange}
          name="mac"
        />
      
        {validationError && (
          <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
            <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
            <div className="d-flex flex-column">
              <h5 className="mb-1">Validation Error</h5>
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

export default PaqueteModal;
