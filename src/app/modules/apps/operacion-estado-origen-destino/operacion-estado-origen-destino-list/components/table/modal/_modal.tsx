import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import { OperacionEstadoOrigenDestinoModel } from '../../../core/_models';
import EstadosCombo from '../../../../../../combos/components/EstadosCombo';
import ContactAttemptsTypesCombo from '../../../../../../combos/components/ContactAttemptsTypeCombo';

interface OperacionEstadoOrigenDestinoModalProps {
  open: boolean;
  currentOperacionEstadoOrigenDestino: OperacionEstadoOrigenDestinoModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onSubmit: () => void;
  onComboChange: (value: number | string, field: string) => void; // Función genérica para manejar los cambios
}

const OperacionEstadoOrigenDestinoModal: React.FC<OperacionEstadoOrigenDestinoModalProps> = ({
  open,
  modalLoading,
  currentOperacionEstadoOrigenDestino,
  validationError,
  modalErrors,
  onClose,
  onSubmit,
  onComboChange
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Asignar un nuevo estado de origen - estado destino y calificación '}</DialogTitle>
      <DialogContent>
        <EstadosCombo
          value={currentOperacionEstadoOrigenDestino.estado_id_origen?.toString() || ''}
          label='Estado Origen'
          onChange={(value) => onComboChange(value, 'estado_id_origen')} // Usa la función genérica para actualizar
        />
        <EstadosCombo
          value={currentOperacionEstadoOrigenDestino.estado_id_destino?.toString() || ''}
          label='Estado Destino'
          onChange={(value) => onComboChange(value, 'estado_id_destino')} // Usa la función genérica para actualizar
        />
        <ContactAttemptsTypesCombo
          value={currentOperacionEstadoOrigenDestino.contact_attempt_type_id?.toString() || ''}  // Usamos string para single
          multiple={false}
          onChange={(value) => onComboChange(value as string, 'contact_attempt_type_id')} // Enviamos un string cuando es single
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

export default OperacionEstadoOrigenDestinoModal;
