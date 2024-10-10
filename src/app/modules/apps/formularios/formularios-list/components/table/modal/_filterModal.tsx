import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | boolean | number | string[] | null>) => void; // Permitimos null en el tipo
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply }) => {
  const [filters, setFilters] = useState<Record<string, string | boolean | number | string[] | null>>({
    name: '',
    operacion_id: '',
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

  // Manejamos el ciclo null -> true -> false
  const handleCheckboxChange = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      activa: prevFilters.activa === null ? true : prevFilters.activa ? false : null,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      nombre: '',
      activa: null,  // Volvemos a null al limpiar
      viajes: '',
      operacion_id: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filtrar Campaña</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <OperacionCombo
              value={filters.operacion_id}
              onChange={(value) => handleSelectChange('operacion_id', value)}
            />
            <TextField
              margin="dense"
              label="Nombre"
              name="name"
              fullWidth
              value={filters.name as string}
              onChange={handleInputChange}
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