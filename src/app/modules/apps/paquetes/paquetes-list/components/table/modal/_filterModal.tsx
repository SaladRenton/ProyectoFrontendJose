import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { filterConfig } from '../../../core/_filterConfig';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import TransportistaCombo from '../../../../../../combos/components/TransportistaCombo';


interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply }) => {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({
    id: '',
    operacion_id: '',
    sinTransportista: false,
    sinViaje: false,
    entregado: false,
    lote_equipos_id: '',
    lote_externo: '',
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

  const handleSelectChange = (name: string, value: string) => {
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
        {filterConfig.filter(config => config.enabled).map(config => (
          <TextField
            key={config.field}
            margin="dense"
            label={config.headerName}
            name={config.field}
            fullWidth
            value={filters[config.field] || ''}
            onChange={handleInputChange}
          />
        ))}

        <OperacionCombo
          value={filters.operacion_id as string}
          onChange={(value) => handleSelectChange('operacion_id', value)}
        />
        <TransportistaCombo
          value={filters.transportista_id as string}
          onChange={(value) => handleSelectChange('transportista_id', value)}
        />

        <Grid container spacing={2}>

          <Grid item xs={6}>
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

          <Grid item xs={6}>
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