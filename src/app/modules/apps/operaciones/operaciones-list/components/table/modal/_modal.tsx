import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { TransportistaModel } from '../../../core/_models';

interface TransportistaModalProps {
  open: boolean;
  editMode: boolean;
  currentTransportista: TransportistaModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const TransportistaModal: React.FC<TransportistaModalProps> = ({
  open,
  editMode,
  currentTransportista,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? 'Editar Transportista' : 'Agregar Nuevo Transportista'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Razón Social"
          fullWidth
          required
          value={currentTransportista.razon_social}
          onChange={onChange}
          name="razon_social"
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          required
          value={currentTransportista.email}
          onChange={onChange}
          name="email"
        />
        <TextField
          margin="dense"
          label="Localidad"
          fullWidth
          value={currentTransportista.localidad}
          onChange={onChange}
          name="localidad"
        />
        <TextField
          margin="dense"
          label="Ciudad"
          fullWidth
          value={currentTransportista.ciudad}
          onChange={onChange}
          name="ciudad"
        />
        <TextField
          margin="dense"
          label="Calle"
          fullWidth
          value={currentTransportista.calle}
          onChange={onChange}
          name="calle"
        />
        <TextField
          margin="dense"
          label="Nro. Calle"
          fullWidth
          value={currentTransportista.numero_calle}
          onChange={onChange}
          name="numero_calle"
        />
        <TextField
          margin="dense"
          label="Piso"
          fullWidth
          value={currentTransportista.piso}
          onChange={onChange}
          name="piso"
        />
        <TextField
          margin="dense"
          label="Dpto"
          fullWidth
          value={currentTransportista.dpto}
          onChange={onChange}
          name="dpto"
        />
        <TextField
          margin="dense"
          label="Tel."
          fullWidth
          value={currentTransportista.tel}
          onChange={onChange}
          name="tel"
        />
        <TextField
          margin="dense"
          label="Cuit."
          fullWidth
          required
          value={currentTransportista.cuit}
          onChange={onChange}
          name="cuit"
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

export default TransportistaModal;
