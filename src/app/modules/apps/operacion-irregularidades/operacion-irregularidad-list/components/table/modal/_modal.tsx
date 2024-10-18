import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import { OperacionIrregularidadModel } from '../../../core/_models';
import EstadosCombo from '../../../../../../combos/components/EstadosCombo';
import IrregularidadCombo from '../../../../../../combos/components/IrregularidadCombo';

interface OperacionIrregularidadModalProps {
  open: boolean;
  currentOperacionIrregularidad: OperacionIrregularidadModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onSubmit: () => void;
  onComboChange: (value: number | string, field: string) => void; // Función genérica para manejar los cambios

}

const OperacionIrregularidadModal: React.FC<OperacionIrregularidadModalProps> = ({
  open,
  modalLoading,
  currentOperacionIrregularidad,
  validationError,
  modalErrors,
  onClose,
  onSubmit,
  onComboChange
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Asignar un Transportista a la operación'}</DialogTitle>
      <DialogContent>


        <IrregularidadCombo
          value={((currentOperacionIrregularidad.irregularidad_id) ? currentOperacionIrregularidad.irregularidad_id : '') as string}

          onChange={(value) => onComboChange(value as string, 'irregularidad_id')} // Enviamos un string cuando es single
        />

        <EstadosCombo
          value={((currentOperacionIrregularidad.estado_id) ? currentOperacionIrregularidad.estado_id : '') as string}

          onChange={(value) => onComboChange(value as string, 'estado_id')} // Enviamos un string cuando es single
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

export default OperacionIrregularidadModal;
