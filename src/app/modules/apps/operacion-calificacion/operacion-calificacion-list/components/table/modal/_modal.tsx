import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import { OperacionCalificacionModel } from '../../../core/_models';
import EstadosCombo from '../../../../../../combos/components/EstadosCombo';
import ContactAttemptsTypesCombo from '../../../../../../combos/components/ContactAttemptsTypeCombo';

interface OperacionCalificacionModalProps {
  open: boolean;
  currentOperacionCalificacion: OperacionCalificacionModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onSubmit: () => void;
  onComboChange: (value: number | string, field: string) => void; // Función genérica para manejar los cambios
}

const OperacionCalificacionModal: React.FC<OperacionCalificacionModalProps> = ({
  open,
  modalLoading,
  currentOperacionCalificacion,
  validationError,
  modalErrors,
  onClose,
  onSubmit,
  onComboChange
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Asignar una nueva calificación '}</DialogTitle>
      <DialogContent>
      
      <ContactAttemptsTypesCombo
          value={currentOperacionCalificacion.contact_attempt_type_id?.toString() || ''}  // Usamos string para single
          multiple={false}
          onChange={(value) => onComboChange(value as string, 'contact_attempt_type_id')} // Enviamos un string cuando es single
        />
        <EstadosCombo
          value={currentOperacionCalificacion.estado_id_destino?.toString() || ''}
          label='Estado Destino'
          onChange={(value) => onComboChange(value, 'estado_id_destino')} // Usa la función genérica para actualizar
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
          {modalLoading ? <CircularProgress size={24} /> : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OperacionCalificacionModal;
