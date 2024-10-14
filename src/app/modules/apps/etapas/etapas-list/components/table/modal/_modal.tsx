import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { EtapasModel } from '../../../core/_models';

interface EtapaModalProps {
  open: boolean;
  editMode: boolean;
  currentEtapa: EtapasModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const EtapaModal: React.FC<EtapaModalProps> = ({
  open,
  editMode,
  currentEtapa,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? 'Editar Etapa' : 'Agregar Nueva Etapa'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          fullWidth
          required
          value={currentEtapa.nombre}
          onChange={onChange}
          name="nombre"
        />
      
        <TextField
          margin="dense"
          label="codigo"

          fullWidth
          value={currentEtapa.codigo}
          onChange={onChange}
          name="codigo"
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

export default EtapaModal;
