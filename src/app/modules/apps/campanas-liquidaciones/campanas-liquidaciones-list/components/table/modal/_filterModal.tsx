import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, CircularProgress } from '@mui/material';
import MediosContactoCombo from '../../../../../../combos/components/MediosContactoCombo';
import CampanaCombo from '../../../../../../combos/components/CampanaCombo';
import ContactAttemptsTypesCombo from '../../../../../../combos/components/ContactAttemptsTypeCombo';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | boolean | number | string[]>) => void;
  title?: string;
  buttonTitle?: string;
  filtrosObligatorios?: string[]; // Nueva propiedad para los filtros obligatorios
  loading?: boolean; // Propiedad opcional para controlar el estado de carga
}

const FilterModal: React.FC<FilterModalProps> = ({ open,
  onClose,
  onApply,
  title = 'Filtro de Viajes',
  buttonTitle = 'Aplicar',
  filtrosObligatorios = [],
  loading = false, // Por defecto, loading es false



}) => {
  const [filters, setFilters] = useState<Record<string, string | boolean | number | string[]>>({
    id: '',
    agent_username: '',
    viaje_id: '',
    medio_contacto_id: '',
    campana_id: '',
    type_id: [],




  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setFilters((prevFilters) => ({
      ...prevFilters,
      calificacion_crm: true,
    }));
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


  const handleClearFilters = () => {
    setFilters({
      id: '',
      agent_username: '',
      viaje_id: '',
      medio_contacto_id: '',
      campana_id: '',
      type_id: [],



    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title ? title : 'Filtrar Calificaciones'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Agente"
              name="agent_username"
              fullWidth
              value={filters.agent_username as string}
              onChange={handleInputChange}
            />

            <TextField
              margin="dense"
              label="Lead/Viaje"
              name="viaje_id"
              placeholder="Ej: 1111,222"
              fullWidth
              value={filters.viaje_id as string}
              onChange={handleInputChange}
            />

            <MediosContactoCombo
              value={filters.medio_contacto_id as string}
              onChange={(value) => handleSelectChange('medio_contacto_id', value)}

            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Fecha Contacto desde"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="fecha_contacto_desde"
                  value={filters.fecha_contacto_desde as string}
                  onChange={handleInputChange}

                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Fecha Contacto Hasta"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="fecha_contacto_hasta"
                  value={filters.fecha_contacto_hasta as string}
                  onChange={handleInputChange}

                />
              </Grid>
            </Grid>

            <CampanaCombo
              value={filters.campana_id as string}
              onChange={(value) => handleSelectChange('campana_id', value)}

            />


            <ContactAttemptsTypesCombo
              value={filters.type_id as string[]}
              onChange={(value) => handleSelectChange('type_id', value)}

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
    </Dialog>
  );
};

export default FilterModal;
