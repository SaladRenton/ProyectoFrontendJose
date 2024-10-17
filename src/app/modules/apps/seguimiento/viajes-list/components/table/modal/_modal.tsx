import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { ViajeModel } from '../../../core/_models';

interface ViajeModalProps {
  open: boolean;
  editMode: boolean;
  currentViaje: ViajeModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const ViajeModal: React.FC<ViajeModalProps> = ({
  open,
  editMode,
  currentViaje,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit
}) => {
  const formatDate = (date: Date | null) => {
    return date ? new Date(date).toISOString().substring(0, 16) : '';
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? 'Editar Viaje' : 'Agregar Nuevo Viaje'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          fullWidth
          required
          value={currentViaje.nombre}
          onChange={onChange}
          name="nombre"
        />
        <TextField
          margin="dense"
          label="Apellido"
          fullWidth
          required
          value={currentViaje.apellido}
          onChange={onChange}
          name="apellido"
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          required
          value={currentViaje.email}
          onChange={onChange}
          name="email"
        />
        <TextField
          margin="dense"
          label="Fecha Inicio"
          type="datetime-local"
          fullWidth
          required
          value={formatDate(currentViaje.fecha_inicio)}
          onChange={onChange}
          name="fecha_inicio"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          label="Fecha Fin"
          type="datetime-local"
          fullWidth
          required
          value={formatDate(currentViaje.fecha_fin)}
          onChange={onChange}
          name="fecha_fin"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* Agregar otros campos de Viaje aquí */}
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

export default ViajeModal;
