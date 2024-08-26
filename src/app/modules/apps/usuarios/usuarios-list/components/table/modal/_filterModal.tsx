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
    name:'',
    email: '',

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
      name:'',
      email:''
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filtrar Usuarios</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Nombre"
              name="name"
              fullWidth
              value={filters.name as string}
              onChange={handleInputChange}
            />
          
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              value={filters.email as string}
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
