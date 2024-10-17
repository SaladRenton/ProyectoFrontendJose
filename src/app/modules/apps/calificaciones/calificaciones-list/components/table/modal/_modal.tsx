import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { CalificacionesModel } from '../../../core/_models';

interface CalificacionModalProps {
  open: boolean;
  editMode: boolean;
  currentCalificacion: CalificacionesModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const CalificacionModal: React.FC<CalificacionModalProps> = ({
  open,
  editMode,
  currentCalificacion,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit
}) => {
  
  // Función para validar que solo se permitan letras de la A a la Z sin espacios
  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = /^[a-zA-Z]*$/; // Solo permite letras sin espacios

    if (regex.test(value)) {
      onChange(e); // Si cumple con la regex, ejecuta el onChange original
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? 'Editar Calificación' : 'Agregar Nueva Calificación'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Descripción"
          fullWidth
          required
          value={currentCalificacion.descripcion}
          onChange={onChange}
          name="descripcion"
        />

        <TextField
          margin="dense"
          label="Código"
          fullWidth
          required
          value={currentCalificacion.codigo}
          onChange={handleAlphaChange}  // Aplica la función que valida solo letras
          name="codigo"
        />

        <TextField
          margin="dense"
          label="Código CRM"
          fullWidth
          required
          value={currentCalificacion.codigo_crm}
          onChange={handleAlphaChange}  // Aplica la función que valida solo letras
          name="codigo_crm"
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

export default CalificacionModal;