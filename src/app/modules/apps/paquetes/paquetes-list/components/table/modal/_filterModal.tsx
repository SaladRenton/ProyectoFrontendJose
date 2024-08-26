import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import TransportistaCombo from '../../../../../../combos/components/TransportistaCombo';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | boolean | number | string[]>) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply }) => {
  const [filters, setFilters] = useState<Record<string, string | boolean | number | string[]>>({
    id: '',
    operacion_id: '',
    transportista_id: '',
    sinTransportista: false,
    sinViaje: false,
    entregado: false,
    lote_equipos_id: '',
    lote_externo: '',
    caja: '',
    pallet: '',
    mac: '',
    codigo_barra: '',
    numero_serie: '',
    viaje_id: ''
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

  const handleSelectChange = (name: string, value: string | boolean | number | string[]) => {
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

  const handleClearFilters = () => {
    setFilters({
      id: '',
      operacion_id: '',
      transportista_id: '',
      sinTransportista: false,
      sinViaje: false,
      entregado: false,
      lote_equipos_id: '',
      lote_externo: '',
      caja: '',
      pallet: '',
      mac: '',
      codigo_barra: '',
      numero_serie: '',
      viaje_id: ''

    });
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
            <TextField
              margin="dense"
              label="MAC"
              name="mac"
              fullWidth
              value={filters.mac as string}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Nro Serie"
              name="numero_serie"
              fullWidth
              value={filters.numero_serie as string}
              onChange={handleInputChange}
            />

           

            <TextField
              margin="dense"
              label="Cod Barra"
              name="codigo_barra"
              fullWidth
              value={filters.codigo_barra as string}
              onChange={handleInputChange}
            />

             <TextField
              margin="dense"
              label="Viaje"
              name="viaje_id"
              fullWidth
              value={filters.viaje_id as string}
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
        <Button onClick={handleClearFilters} color="secondary">
          Limpiar
        </Button>
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
