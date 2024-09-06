import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { filterConfig } from '../../../core/_filterConfig';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';


interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});

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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filtrar Campañas</DialogTitle>
      <DialogContent>
        <OperacionCombo
          value={filters.operacion_id}
          onChange={(value) => handleSelectChange('operacion_id', value as string)}

        />
        {filterConfig.filter(config => config.enabled).map(config => (
          <TextField
            key={config.field}
            margin="dense"
            label={config.headerName}
            name={config.field}
            fullWidth
            value={filters[config.field] || ''}
            onChange={handleInputChange}
            placeholder={config.placeholder ? config.placeholder : ''}
          />
        ))}
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
