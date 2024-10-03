import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import { CampanaModel } from '../../../../../campanas/campanas-list/core/_models';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import OperacionZonaRepartoCombo from '../../../../../../combos/components/OperacionZonaRepartoCombo';


interface CampanaModalProps {
  open: boolean;
  currentCampana: CampanaModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onOperacionChange: (value: number) => void;
  onZonasRepartoChange: (value: string[]) => void;
}

const CampanaModal: React.FC<CampanaModalProps> = ({
  open,
  currentCampana,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit,
  onOperacionChange,
  onZonasRepartoChange
}) => {

 
  const [operacionId, setOperacionId] = useState<string>('');
  const [zonaRepartoId, setZonaRepartoId] = useState<string[]>([]);


  const handleOperacionChange = (value: number) => {
    setOperacionId(value.toString());
    onOperacionChange(value);
  };

  const handleZonasRepartoChange = (value: string[]) => {
    setZonaRepartoId(value);
    onZonasRepartoChange(value);
  };




  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{ 'Agregar Nuevo Campana'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          fullWidth
          required
          value={currentCampana.nombre}
          onChange={onChange}
          name="nombre"
        />
        <TextField
          margin="dense"
          label="Descripción"
          fullWidth
          required
          value={currentCampana.descripcion}
          onChange={onChange}
          name="descripcion"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={currentCampana.activa}
              onChange={onChange}
              name="activa"
              color="primary"
            />
          }
          label="Activa"
        />

        <TextField
          label="Lote Viaje ID"
          type="number"
          fullWidth
          name="lote_viaje_id"
          value={currentCampana.lote_viaje_id}
          onChange={onChange}
          margin="dense"
        />

        <OperacionCombo
          value={operacionId as string}
          onChange={(value) => handleOperacionChange(value as number)}
        />

        <OperacionZonaRepartoCombo
          operacionId={operacionId}
          value={zonaRepartoId}
          onChange={(value) => handleZonasRepartoChange(value)}
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
          {modalLoading ? <CircularProgress size={24} /> : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampanaModal;
