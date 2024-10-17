import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import { OperacionZonaRepartoModel } from '../../../core/_models';
import ZonaRepartoCombo from '../../../../../../combos/components/ZonaRepartoCombo';

interface OperacionZonaRepartoModalProps {
  open: boolean;
  currentOperacionZonaReparto: OperacionZonaRepartoModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onSubmit: () => void;
  onZonaRepartoChange: (value: number | string) => void;

}

const OperacionZonaRepartoModal: React.FC<OperacionZonaRepartoModalProps> = ({
  open,
  modalLoading,
  currentOperacionZonaReparto,
  validationError,
  modalErrors,
  onClose,
  onSubmit,
  onZonaRepartoChange
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Asignar un Transportista a la operación'}</DialogTitle>
      <DialogContent>

        <ZonaRepartoCombo

          onChange={onZonaRepartoChange}
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
          {modalLoading ? <CircularProgress size={24} /> : 'Actualizar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OperacionZonaRepartoModal;
