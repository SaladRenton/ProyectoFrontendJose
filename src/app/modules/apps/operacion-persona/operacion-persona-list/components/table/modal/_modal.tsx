import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import TransportistaCombo from '../../../../../../combos/components/TransportistaCombo';
import { OperacionPersonaModel } from '../../../core/_models';

interface OperacionPersonaModalProps {
  open: boolean;
  currentOperacionPersona: OperacionPersonaModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onSubmit: () => void;
  onTransportistaChange: (value: number | string) => void;

}

const OperacionPersonaModal: React.FC<OperacionPersonaModalProps> = ({
  open,
  modalLoading,
  currentOperacionPersona,
  validationError,
  modalErrors,
  onClose,
  onSubmit,
  onTransportistaChange
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Asignar un Transportista a la operación'}</DialogTitle>
      <DialogContent>

        <TransportistaCombo
          value={((currentOperacionPersona.persona_id) ? currentOperacionPersona.persona_id : '') as string}

          onChange={onTransportistaChange}
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
          {modalLoading ? <CircularProgress size={24} /> : 'Actualizar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OperacionPersonaModal;
