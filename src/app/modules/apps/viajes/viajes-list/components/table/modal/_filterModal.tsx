import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import ContactAttemptsTypeCombo from '../../../../../../combos/components/ContactAttemptsTypeCombo';
import OperacionZonaRepartoCombo from '../../../../../../combos/components/OperacionZonaRepartoCombo';
import TransportistaCombo from '../../../../../../combos/components/TransportistaCombo';
import EstadosCombo from '../../../../../../combos/components/EstadosCombo';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | boolean | number>) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply }) => {
  const [filters, setFilters] = useState<Record<string, string | boolean | number>>({
    id: '',
    operacion_id: '',
    fecha_inicio: '',
    fecha_fin: '',
    contact_attempt_id: '',
    zona_reparto_id: '',
    transportista_id: '',
    estado_id: '',
    nombre: '',
    apellido: '',
    email: '',
    location: '',
    sinZona: false,
    sinTransportista: false,
    lote_viaje_id: '',
    id_identificacion_externo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
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

  const handleApplyFilters = () => {
    onApply(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({
      id: '',
      operacion_id: '',
      fecha_inicio: '',
      fecha_fin: '',
      contact_attempt_id: '',
      zona_reparto_id: '',
      transportista_id: '',
      estado_id: '',
      nombre: '',
      apellido: '',
      email: '',
      location: '',
      sinZona: false,
      sinTransportista: false,
      lote_viaje_id: '',
      id_identificacion_externo: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filtrar Viajes</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="ID Viaje"
              fullWidth
              name="id"
              value={filters.id as string}
              onChange={handleInputChange}
            />
            <OperacionCombo
              value={filters.operacion_id}
              onChange={(value) => handleSelectChange('operacion_id', value)}
            />
            <TextField
              margin="dense"
              label="Fecha Inicio"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="fecha_inicio"
              value={filters.fecha_inicio as string}
              onChange={handleInputChange}
            />
            <ContactAttemptsTypeCombo
              value={filters.contact_attempt_id as string}
              onChange={(value) => handleSelectChange('contact_attempt_id', value)}
            />
            <OperacionZonaRepartoCombo
              operacionId={filters.operacion_id as string}
              value={filters.zona_reparto_id as string}
              onChange={(value) => handleSelectChange('zona_reparto_id', value)}
            />
            <TransportistaCombo
              value={filters.transportista_id as string}
              onChange={(value) => handleSelectChange('transportista_id', value)}
            />
            <TextField
              margin="dense"
              label="Nombre"
              fullWidth
              name="nombre"
              value={filters.nombre as string}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              name="email"
              value={filters.email as string}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.sinZona as boolean}
                  onChange={handleCheckboxChange}
                  name="sinZona"
                  color="primary"
                />
              }
              label="Viajes sin zona"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Fecha Fin"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="fecha_fin"
              value={filters.fecha_fin as string}
              onChange={handleInputChange}
            />
            <EstadosCombo
              value={filters.estado_id as string}
              onChange={(value) => handleSelectChange('estado_id', value)}
            />
            <TextField
              margin="dense"
              label="Apellido"
              fullWidth
              name="apellido"
              value={filters.apellido as string}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Ubicación (latitud,longitud)"
              fullWidth
              name="location"
              value={filters.location as string}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Lote Viaje ID"
              fullWidth
              name="lote_viaje_id"
              value={filters.lote_viaje_id as string}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="ID Identificación Externo"
              fullWidth
              name="id_identificacion_externo"
              value={filters.id_identificacion_externo as string}
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
              label="Viajes sin transportista"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearFilters} color="secondary">
          Limpiar
        </Button>
        <Button onClick={handleApplyFilters} color="primary">
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;