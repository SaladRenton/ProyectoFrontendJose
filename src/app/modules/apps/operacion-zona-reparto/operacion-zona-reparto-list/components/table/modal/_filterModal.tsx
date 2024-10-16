import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import ZonaRepartoCombo from '../../../../../../combos/components/ZonaRepartoCombo';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});


  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value

    });

  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filtrar Transportistas</DialogTitle>
      <DialogContent>

        <ZonaRepartoCombo
          value={filters.zona_reparto_id as string}
          onChange={(value) => handleSelectChange('zona_reparto_id', value)}
        />
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
