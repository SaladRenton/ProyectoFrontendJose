import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { OperacionEtapaModel } from '../../../core/_models';
import EtapaCombo from '../../../../../../combos/components/EtapaCombo';

interface OperacionesEtapaModalProps {
  open: boolean;
  currentOperacionesEtapa: OperacionEtapaModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEtapaChange: (value: number | string) => void;
}

const OperacionesEtapaModal: React.FC<OperacionesEtapaModalProps> = ({
  open,
  modalLoading,
  currentOperacionesEtapa,
  validationError,
  modalErrors,
  onClose,
  onSubmit,
  onChange,
  onEtapaChange
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Asignar un Transportista a la operación'}</DialogTitle>
      <DialogContent>

        <EtapaCombo
          value={((currentOperacionesEtapa.etapa_id) ? currentOperacionesEtapa.etapa_id : '') as string}
          onChange={onEtapaChange}
        />

        <TextField
          autoFocus
          margin="dense"
          label="Orden"
          type="number"
          fullWidth
          required
          value={currentOperacionesEtapa.orden}
          onChange={onChange}
          name="orden"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={currentOperacionesEtapa.notificar}
              onChange={onChange}
              name="notificar"
              color="primary"
            />
          }
          label="Requiere notificaciones?"
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

export default OperacionesEtapaModal;
