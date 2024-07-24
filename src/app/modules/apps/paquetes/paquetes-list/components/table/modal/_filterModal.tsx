import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import TransportistaCombo from '../../../../../../combos/components/TransportistaCombo';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | boolean | number>) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply }) => {
  const [filters, setFilters] = useState<Record<string, string | boolean | number>>({
    id: '',
    operacion_id: '',
    sinTransportista: false,
    sinViaje: false,
    entregado: false,
    lote_equipos_id: '',
    lote_externo: '',
    caja: '',
    pallet: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleSelectChange = (name: string, value: string | boolean | number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filtrar Paquetes</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="ID Paquete"
              name="id"
              fullWidth
              value={filters.id as string}
              onChange={handleInputChange}
            />
            <OperacionCombo
              value={filters.operacion_id}
              onChange={(value) => handleSelectChange('operacion_id', value)}
            />
            <TextField
              margin="dense"
              label="Lote Equipos ID"
              name="lote_equipos_id"
              fullWidth
              value={filters.lote_equipos_id as string}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Lote Externo"
              name="lote_externo"
              fullWidth
              value={filters.lote_externo as string}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Caja"
              name="caja"
              fullWidth
              value={filters.caja as string}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.sinViaje as boolean}
                  onChange={handleCheckboxChange}
                  name="sinViaje"
                  color="primary"
                />
              }
              label="Paquetes sin viaje asignado"
            />
          </Grid>
          <Grid item xs={6}>
            <TransportistaCombo
              value={filters.transportista_id as string}
              onChange={(value) => handleSelectChange('transportista_id', value)}
            />
            <TextField
              margin="dense"
              label="Pallet"
              name="pallet"
              fullWidth
              value={filters.pallet as string}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.sinTransportista as boolean}
                  onChange={handleCheckboxChange}
                  name="sinTransportista"
                  color="primary"
                />
              }
              label="Paquetes sin transportista"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.entregado as boolean}
                  onChange={handleCheckboxChange}
                  name="entregado"
                  color="primary"
                />
              }
              label="Paquetes entregados"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleApply} color="primary">
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
