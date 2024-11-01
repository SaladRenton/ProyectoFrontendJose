import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Grid, CircularProgress } from '@mui/material';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import TransportistaCombo from '../../../../../../combos/components/TransportistaCombo';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | boolean | number | string[]>) => void;
  title?: string;
  buttonTitle?: string;
  filtrosObligatorios?: string[]; // Nueva propiedad para los filtros obligatorios
  loading?: boolean;

}

const FilterModal: React.FC<FilterModalProps> = ({
  open, onClose, onApply, title = 'Filtrar Paquetes',
  buttonTitle = 'Aplicar',
  filtrosObligatorios = [],
  loading = false,

}) => {
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


  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [helperTexts, setHelperTexts] = useState<Record<string, string>>({});


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApply = () => {
    const newErrors: Record<string, boolean> = {};
    const newHelperTexts: Record<string, string> = {};

    filtrosObligatorios.forEach((filtro) => {
      if (!filters[filtro]) {
        newErrors[filtro] = true;
        newHelperTexts[filtro] = 'Este campo es obligatorio';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setHelperTexts(newHelperTexts);
    } else {


      onApply(filters);


      if (!loading) {
        onClose(); // Solo cerrar el modal si no está en estado de carga
      }
    }
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
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>{title}</DialogTitle>
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
              error={!!errors.id}
              helperText={helperTexts.id}
            />
            <OperacionCombo
              value={filters.operacion_id}
              onChange={(value) => handleSelectChange('operacion_id', value)}
              error={!!errors.operacion_id}
              helperText={helperTexts.operacion_id}
            />
            <TextField
              margin="dense"
              label="Lote Equipos ID"
              name="lote_equipos_id"
              fullWidth
              value={filters.lote_equipos_id as string}
              onChange={handleInputChange}
              error={!!errors.lote_equipos_id}
              helperText={helperTexts.lote_equipos_id}
            />
            <TextField
              margin="dense"
              label="Lote Externo"
              name="lote_externo"
              fullWidth
              value={filters.lote_externo as string}
              onChange={handleInputChange}
              error={!!errors.lote_externo}
              helperText={helperTexts.lote_externo}
            />
            <TextField
              margin="dense"
              label="Caja"
              name="caja"
              fullWidth
              value={filters.caja as string}
              onChange={handleInputChange}
              error={!!errors.caja}
              helperText={helperTexts.caja}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.sinViaje as boolean}
                  indeterminate={filters.sinViaje === null} // Si es null, se muestra indeterminado
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
              error={!!errors.pallet}
              helperText={helperTexts.pallet}
              
            />
            <TextField
              margin="dense"
              label="MAC"
              name="mac"
              fullWidth
              value={filters.mac as string}
              onChange={handleInputChange}
              error={!!errors.mac}
              helperText={helperTexts.mac}
            />
            <TextField
              margin="dense"
              label="Nro Serie"
              name="numero_serie"
              fullWidth
              value={filters.numero_serie as string}
              onChange={handleInputChange}
              error={!!errors.numero_serie}
              helperText={helperTexts.numero_serie}
            />



            <TextField
              margin="dense"
              label="Cod Barra"
              name="codigo_barra"
              fullWidth
              value={filters.codigo_barra as string}
              onChange={handleInputChange}
              error={!!errors.codigo_barra}
              helperText={helperTexts.codigo_barra}
            />

            <TextField
              margin="dense"
              label="Viaje"
              name="viaje_id"
              fullWidth
              value={filters.viaje_id as string}
              onChange={handleInputChange}
              error={!!errors.viaje_id}
              helperText={helperTexts.viaje_id}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.sinTransportista as boolean}
                  indeterminate={filters.sinTransportista === null} // Si es null, se muestra indeterminado
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
                  indeterminate={filters.entregado === null} // Si es null, se muestra indeterminado
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
        <Button onClick={handleApply} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : buttonTitle}

        </Button>
      </DialogActions>
    </Dialog >
  );
};

export default FilterModal;
