import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Grid, CircularProgress } from '@mui/material';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import ContactAttemptsTypeCombo from '../../../../../../combos/components/ContactAttemptsTypeCombo';
import OperacionZonaRepartoCombo from '../../../../../../combos/components/OperacionZonaRepartoCombo';
import TransportistaCombo from '../../../../../../combos/components/TransportistaCombo';
import EstadosCombo from '../../../../../../combos/components/EstadosCombo';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | boolean | number | string[]>) => void;
  title?: string;
  buttonTitle?: string;
  filtrosObligatorios?: string[]; // Nueva propiedad para los filtros obligatorios
  loading?: boolean; // Propiedad opcional para controlar el estado de carga
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  onApply,
  title = 'Filtro de Viajes',
  buttonTitle = 'Aplicar',
  filtrosObligatorios = [],
  loading = false, // Por defecto, loading es false
}) => {
  const [filters, setFilters] = useState<Record<string, string | boolean | number | string[]>>({
    id: '',
    operacion_id: '',
    fecha_inicio_desde: '',
    fecha_inicio_hasta: '',
    fecha_fin_desde: '',
    fecha_fin_hasta: '',
    fecha_creacion_desde: '',
    fecha_creacion_hasta: '',
    contact_attempt_id: '',
    zona_reparto_id: [],
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
    id_identificador_cliente_externo: '',
    documento: '',
    conPaquetes: false,
    sinPaquetes: false,
    enOml:false,
    noEnOml: false
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [helperTexts, setHelperTexts] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
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

  const handleApplyFilters = () => {
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

  const handleClearFilters = () => {
    setFilters({
      id: '',
      operacion_id: '',
      fecha_inicio_desde: '',
      fecha_inicio_hasta: '',
      fecha_fin_desde: '',
      fecha_fin_hasta: '',
      fecha_creacion_desde: '',
      fecha_creacion_hasta: '',
      contact_attempt_id: '',
      zona_reparto_id: [],
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
      id_identificador_cliente_externo: '',
      documento: '',
      conPaquetes: false,
      sinPaquetes: false,
      enOml: false,
      noEnOml: false
    });
    setErrors({});
    setHelperTexts({});
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="ID Viaje"
              placeholder='Ej: 2222,3333'
              fullWidth
              name="id"
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Fecha Inicio desde"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="fecha_inicio_desde"
                  value={filters.fecha_inicio_desde as string}
                  onChange={handleInputChange}
                  error={!!errors.fecha_inicio_desde}
                  helperText={helperTexts.fecha_inicio_desde}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Fecha Inicio Hasta"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="fecha_inicio_hasta"
                  value={filters.fecha_inicio_hasta as string}
                  onChange={handleInputChange}
                  error={!!errors.fecha_inicio_hasta}
                  helperText={helperTexts.fecha_inicio_hasta}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Fecha Fin desde"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="fecha_fin_desde"
                  value={filters.fecha_fin_desde as string}
                  onChange={handleInputChange}
                  error={!!errors.fecha_fin_desde}
                  helperText={helperTexts.fecha_fin_desde}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Fecha Fin hasta"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="fecha_fin_hasta"
                  value={filters.fecha_fin_hasta as string}
                  onChange={handleInputChange}
                  error={!!errors.fecha_fin_hasta}
                  helperText={helperTexts.fecha_fin_hasta}
                />
              </Grid>
            </Grid>
            <ContactAttemptsTypeCombo
              value={filters.contact_attempt_id as string}
              onChange={(value) => handleSelectChange('contact_attempt_id', value)}
            />
            <OperacionZonaRepartoCombo
              operacionId={filters.operacion_id as string}
              value={filters.zona_reparto_id as string[]}
              onChange={(value) => handleSelectChange('zona_reparto_id', value)}
            />
            <TransportistaCombo
              value={filters.transportista_id as string}
              onChange={(value) => handleSelectChange('transportista_id', value)}
            />

            <TextField
              margin="dense"
              label="Email"
              fullWidth
              name="email"
              value={filters.email as string}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={helperTexts.email}
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

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.enOml as boolean}
                  onChange={handleCheckboxChange}
                  name="enOml"
                  color="primary"
                />
              }
              label="Tiene Campaña CallCenter"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.noEnOml as boolean}
                  onChange={handleCheckboxChange}
                  name="noEnOml"
                  color="primary"
                />
              }
              label="No tiene campaña CallCenter"
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Fecha Creación desde"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="fecha_creacion_desde"
                  value={filters.fecha_creacion_desde as string}
                  onChange={handleInputChange}
                  error={!!errors.fecha_creacion_desde}
                  helperText={helperTexts.fecha_creacion_desde}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Fecha Creación hasta"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="fecha_creacion_hasta"
                  value={filters.fecha_creacion_hasta as string}
                  onChange={handleInputChange}
                  error={!!errors.fecha_creacion_hasta}
                  helperText={helperTexts.fecha_creacion_hasta}
                />
              </Grid>
            </Grid>
            <EstadosCombo
              value={filters.estado_id as string}
              onChange={(value) => handleSelectChange('estado_id', value)}
              error={!!errors.estado_id}
              helperText={helperTexts.estado_id}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Nombre"
                  fullWidth
                  name="nombre"
                  value={filters.nombre as string}
                  onChange={handleInputChange}
                  error={!!errors.nombre}
                  helperText={helperTexts.nombre}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Apellido"
                  fullWidth
                  name="apellido"
                  value={filters.apellido as string}
                  onChange={handleInputChange}
                  error={!!errors.apellido}
                  helperText={helperTexts.apellido}
                />
              </Grid>

            </Grid>

            <TextField
              margin="dense"
              label="Ubicación (latitud,longitud)"
              fullWidth
              name="location"
              value={filters.location as string}
              onChange={handleInputChange}
              error={!!errors.location}
              helperText={helperTexts.location}
            />
            <TextField
              margin="dense"
              label="Lote Viaje ID"
              fullWidth
              placeholder='Ej: 24,25'
              name="lote_viaje_id"
              value={filters.lote_viaje_id as string}
              onChange={handleInputChange}
              error={!!errors.lote_viaje_id}
              helperText={helperTexts.lote_viaje_id}
            />
            <TextField
              margin="dense"
              label="ID Identificación Externo"
              fullWidth
              name="id_identificacion_externo"
              value={filters.id_identificacion_externo as string}
              onChange={handleInputChange}
              error={!!errors.id_identificacion_externo}
              helperText={helperTexts.id_identificacion_externo}
            />

            <TextField
              margin="dense"
              label="ID Cliente Externo"
              fullWidth
              name="id_identificador_cliente_externo"
              value={filters.id_identificador_cliente_externo as string}
              onChange={handleInputChange}
              error={!!errors.id_identificador_cliente_externo}
              helperText={helperTexts.id_identificador_cliente_externo}
            />

            <TextField
              margin="dense"
              label="Documento"
              fullWidth
              name="documento"
              value={filters.documento as string}
              onChange={handleInputChange}
              error={!!errors.documento}
              helperText={helperTexts.documento}
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

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.sinPaquetes as boolean}
                  onChange={handleCheckboxChange}
                  name="sinPaquetes"
                  color="primary"
                />
              }
              label="Viajes sin paquetes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.conPaquetes as boolean}
                  onChange={handleCheckboxChange}
                  name="conPaquetes"
                  color="primary"
                />
              }
              label="Viajes con paquetes"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearFilters} color="secondary">
          Limpiar
        </Button>
        <Button onClick={handleApplyFilters} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : buttonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
