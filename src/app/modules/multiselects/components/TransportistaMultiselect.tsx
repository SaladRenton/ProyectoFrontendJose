import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Checkbox, ListItemText, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

interface Transportista {
  id: number;
  razon_social: string;
}

interface TransportistaMultiSelectProps {
  operacionId: number;
  value: number[];
  onChange: (value: number[]) => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const TransportistaMultiSelect: React.FC<TransportistaMultiSelectProps> = ({ operacionId, value, onChange }) => {
  const [transportistas, setTransportistas] = useState<Transportista[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTransportistas = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/operaciones/${operacionId}/transportistas`);
        setTransportistas(response.data || []);
      } catch (error) {
        console.error("Error fetching transportistas", error);
        setTransportistas([]);
      }
      setLoading(false);
    };

    if (operacionId) {
      fetchTransportistas();
    }
  }, [operacionId]);

  const handleSelectChange = (event: SelectChangeEvent<number[]>) => {
    const selectedValues = event.target.value as number[];
    if (selectedValues.includes(-1)) {
      if (selectedValues.length === transportistas.length + 1) {
        onChange([]);
      } else {
        onChange(transportistas.map((t) => t.id));
      }
    } else {
      onChange(selectedValues);
    }
  };

  return (
    <FormControl fullWidth margin="dense">
      <InputLabel>Transportistas</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Select
          multiple
          value={value}
          onChange={handleSelectChange}
          renderValue={(selected) => {
            if ((selected as number[]).includes(-1) && (selected as number[]).length === transportistas.length + 1) {
              return 'Todos';
            }
            return transportistas
              .filter((t) => (selected as number[]).includes(t.id))
              .map((t) => t.razon_social)
              .join(', ');
          }}
        >
          <MenuItem value={-1}>
            <Checkbox checked={value.length === transportistas.length} />
            <ListItemText primary="Todos" />
          </MenuItem>
          {transportistas.map((transportista) => (
            <MenuItem key={transportista.id} value={transportista.id}>
              <Checkbox checked={value.includes(transportista.id)} />
              <ListItemText primary={transportista.razon_social} />
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default TransportistaMultiSelect;
